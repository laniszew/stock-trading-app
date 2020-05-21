import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    position: sticky;
    top: 0;
    display: flex;
    border: 1px solid grey;
    border-radius: 2px;
    background-color: #f2f2f2;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 18px;
    color: #666666;
`;

const StyledLink = styled(Link)`
    padding: 10px;
    text-decoration: none;
    color: black;
`;

const Navbar: FC = () => (
    <Container>
        <Title>Stock Tracker</Title>
        <StyledLink to='/'>Companies</StyledLink>
        <StyledLink to='/track-new'>Track New Company</StyledLink>
    </Container>
)

export default Navbar;
