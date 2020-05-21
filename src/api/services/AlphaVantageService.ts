import buildUrl from '../buildUrl';

const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_SECRET_KEY || 'fallbackKey'

export type NewestValues = {
    "01. symbol": string;
    "02. open": string;
    "03. high": string;
    "04. low": string;
    "05. price": string;
    "06. volume": string;
    "07. latest trading day": string;
    "08. previous close": string;
    "09. change": string;
    "10. change percent": string;
}

type Interval = '1min' | '5min' | '15min' | '30min' | '60min';

// This API returns second object as "Time Series ({interval})".
// API response interface shouldn't have dynamic keys like this one in my opinion, didn't bother to type it properly, it can be done by for example union of strings
type InterdayValues = {
    "Meta Data": Record<string, string>;
    [key: string]: any;
}


interface IAlphaVantageSerivce {
    API_CONSTS: {
        URL: string,
        END_POINTS: Record<string, string>,
    },
    getInterdayValues: (symbol: string, interval?: Interval) =>  Promise<InterdayValues | null>,
    getNewestValues: (symbol: string) =>  Promise<NewestValues | null>
    getNewestValuesBulk: (symbols: string[]) => Promise<(NewestValues | null)[]>
    searchSymbol: (value: string) => Promise<string[] | null>
};

// Prefer keeping API layer as classes while everything else is written as functions, just personal thing
export class AlphaVantageService implements IAlphaVantageSerivce {
    API_CONSTS = {
        URL: 'https://www.alphavantage.co/',
        END_POINTS: {
            TIME_SERIES_INTRADAY: 'TIME_SERIES_INTRADAY',
            GLOBAL_QUOTE: 'GLOBAL_QUOTE',
            SYMBOL_SEARCH: 'SYMBOL_SEARCH',
        }
    };

    getInterdayValues = async (symbol: string, interval: Interval = '5min'): Promise<InterdayValues | null> => {
        const queryParams = {
            function: this.API_CONSTS.END_POINTS.TIME_SERIES_INTRADAY,
            symbol,
            interval,
            apikey: apiKey
        }
        const url = buildUrl(this.API_CONSTS.URL, 'query', queryParams)
        const response = await (await fetch(url)).json();
        if (response) {
            return response;
        }
        return null;
    }

    getNewestValues = async (symbol: string): Promise<NewestValues | null> => {
        const queryParams = {
            function: this.API_CONSTS.END_POINTS.GLOBAL_QUOTE,
            symbol,
            apikey: apiKey
        }
        const url = buildUrl(this.API_CONSTS.URL, 'query', queryParams)
        const response = await (await fetch(url)).json();
        if (response) {
            return response["Global Quote"];
        }
        return null;
    }

    getNewestValuesBulk = async (symbols: string[]): Promise<(NewestValues | null)[]> => {
        const response = await Promise.all(symbols.map(symbol => (
            this.getNewestValues(symbol)
        )));
        return response;
    }

    searchSymbol = async(value: string): Promise<string[] | null> => {
        const queryParams = {
            function: this.API_CONSTS.END_POINTS.SYMBOL_SEARCH,
            keywords: value,
            apikey: apiKey
        }
        const url = buildUrl(this.API_CONSTS.URL, 'query', queryParams);
        const response = await (await fetch(url)).json();
        if (response) {
            return response.bestMatches?.map((match: Record<string, string>) => match['1. symbol']);
        }
        return null;
    }
}

export default new AlphaVantageService();
