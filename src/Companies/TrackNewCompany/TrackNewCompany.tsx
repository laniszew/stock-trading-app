import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Select, Button } from 'antd';
import { Spin } from 'antd';
import { SelectValue } from 'antd/lib/select';
import debounce from 'lodash/debounce';
import AlphaVantageService from '../../api/services/AlphaVantageService';
import CONSTANTS from '../../global/constants/constants';

const SelectContainer = styled.div`
    min-width: 200px;
`;

const StyledSelect = styled(Select)`
    min-width: 200px;
`;

const { Option } = Select;

const debounceTimeout = 5000;

const TrackNewCompany: FC = () => {
    const [value, setValue] = useState<string | undefined>(undefined);
    const [options, setOptions] = useState<JSX.Element[]>([]);

    const handleChange = (value: SelectValue): void => {
        setValue(value as string);
    }
    // API is limited to 5 calls per minute, so typing might result in infinite spinner when limit is reached, even with debouncing
    const handleSearch = async (value: string): Promise<void> => {
        // don't do API call for empty value
        if (!value) {
            return
        }
        try {
            // const searchResult = await debouncedSearchSymbol(value);
            const searchResult = await AlphaVantageService.searchSymbol(value);
            if (searchResult) {
                const selectOptions = searchResult.map(result => (
                    <Option key={result} value={result}>{result}</Option>
                ));
                setOptions(selectOptions);
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    const handleSubmit = (): void => {
        if (!value) {
            return;
        }
        // Using local storage cause there is no BE to save user data
        // For a bigger scale for example cookies or indexedDB could be used for client side data if server side can't hold it
        const currentSymbols = JSON.parse(localStorage.getItem(CONSTANTS.LOCAL_STORAGE.STOCK_SYMBOLS) || '[]');
        localStorage.setItem(CONSTANTS.LOCAL_STORAGE.STOCK_SYMBOLS, JSON.stringify([...currentSymbols, value]))
    }

    return (
        <div>
            <h2>Track new company</h2>
            <span>Company symbol</span>
            <SelectContainer>
                <StyledSelect
                    showSearch
                    value={value}
                    onSearch={debounce(handleSearch, debounceTimeout)}
                    onChange={handleChange}
                    placeholder="Search for stock company symbol..."
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    notFoundContent={<Spin />}
                >
                    {options}
                </StyledSelect>
            </SelectContainer>
            <div>Select the stock exchange symbol of a company you want to track</div>
            <div>
                <Button onClick={handleSubmit}>TRACK</Button>
            </div>
        </div>
    )
}

export default TrackNewCompany;
