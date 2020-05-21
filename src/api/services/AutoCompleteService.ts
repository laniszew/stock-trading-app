import buildUrl from '../buildUrl';

export type AutoCompleteResponse = {
    name: string;
    domain: string;
    logo: string;
}

interface IAutoCompleteService {
    API_CONSTS: {
        URL: string
        END_POINTS: {
            SUGGEST: string,
        }
    },
    getSuggestion: (value: string) => Promise<AutoCompleteResponse[] | null>,
    getSuggestionsBulk: (values: string[]) => Promise<AutoCompleteResponse[] | null>,
    getExactDataByName: (value: string, name: string) => Promise<AutoCompleteResponse | null>
};

// Prefer keeping API layer as classes while everything else is written as functions, just personal thing
export class AutoCompleteService implements IAutoCompleteService {
    API_CONSTS = {
        URL: 'https://autocomplete.clearbit.com/v1/companies/suggest',
        END_POINTS: {
            SUGGEST: 'suggest'
        }
    };

    getSuggestion = async (value: string): Promise<AutoCompleteResponse[] | null> => {
        const url = buildUrl(this.API_CONSTS.URL, this.API_CONSTS.END_POINTS.SUGGEST, { query: value });
        const response = await (await fetch(url)).json();
        return response;
    }

    getSuggestionsBulk = async(values: string[]): Promise<AutoCompleteResponse[] | null> => {
        const response = await Promise.all(values.map(value => (
            this.getSuggestion(value)
        )));
        const uniqueSuggestions = new Set(response.flat());
        return Array.from(uniqueSuggestions);
    }

    // this could be useful, cause usually we would store symbols and other company data in DB, so FE could get only matching value
    getExactDataByName = async (symbol: string, name: string): Promise<AutoCompleteResponse | null> => {
        const allSuggestions = await this.getSuggestion(symbol);
        return allSuggestions?.find(suggestion => suggestion.name === name) || null;
    }
};

export default new AutoCompleteService();
