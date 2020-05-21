import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import isNil from 'lodash/isNil';
import AlphaVantageService, { NewestValues } from '../../api/services/AlphaVantageService';
import CONSTANTS from '../../global/constants/constants';
import AutoCompleteService, { AutoCompleteResponse }from '../../api/services/AutoCompleteService';

type CompanyData = AutoCompleteResponse & NewestValues

const CompaniesView: FC = () => {
    const [companiesData, setCompaniesData] = useState<CompanyData[] | null>(null);

    useEffect(() => {
        const symbols = JSON.parse(localStorage.getItem(CONSTANTS.LOCAL_STORAGE.STOCK_SYMBOLS) || '[]');

        const fetchAndTransform = async () => {
            const valuesForSymbols = await AlphaVantageService.getNewestValuesBulk(symbols);
            // just in case API returned nulls for item not found or anything else. I could skip all possible nulls in case of known API
            const filteredValues = valuesForSymbols.filter(element => !isNil(element));
            const transformedValues = await Promise.all(filteredValues.map(async (stockData) => {
                 const suggestions = await AutoCompleteService.getSuggestion(stockData!["01. symbol"]);
                 if (!suggestions) {
                     console.warn('no suggestions found for symbol: ', stockData!["01. symbol"])
                 }
                 // assuming that providing code results in correct suggestion as first element
                 // didn't check APIs before coding, better way would be to store both code and name returned by SYMBOL_SEARCH, then filter AutoComplete results by name
                 return { ...suggestions![0], ...stockData }
            }));
            setCompaniesData(transformedValues as CompanyData[]);
        }

        fetchAndTransform();
    }, []);

    return (
        <div>
            {
                !companiesData || companiesData.length === 0 ? (
                    <div>
                        There are no companies yet.
                        <Link to="/track-new">Track your first company.</Link>
                    </div>
                ) : (
                    <div>
                        {companiesData.map(company => (
                            <div>

                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default CompaniesView;
