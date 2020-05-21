import React, { FC } from 'react';
import styled from 'styled-components';

const CompanyItemWrapper = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const CompanyInfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

const Logo = styled.img`
    width: 64px;
    height: 64px;
`;

const Row = styled.div`
    display: flex;
    & > div {
        padding-right: 10px;
    }
`;

type Props = {
    symbol: string;
    name: string;
    domain: string;
    logo: string;
    price: string;
    change: string;
    changePercent: string;
    latestDay: string;
}

const CompanyItem: FC<Props> = ({
    symbol,
    name,
    domain,
    logo,
    price,
    change,
    changePercent,
    latestDay
}) => (
    <CompanyItemWrapper>
        <Logo src={logo} />
        <CompanyInfoWrapper>
            <Row>
                <div>
                    {symbol}
                </div>
                <div>
                    {name}
                </div>
                <div>
                    {domain}
                </div>
            </Row>
            <Row>
                <div>
                    {price}
                </div>
                <div>
                    {change}({changePercent})
                </div>
                <div>
                    {latestDay}
                </div>
            </Row>
        </CompanyInfoWrapper>
    </CompanyItemWrapper>
)

export default CompanyItem;
