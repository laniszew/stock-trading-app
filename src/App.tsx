import React, { FC } from 'react';
import styled from 'styled-components';
import { BrowserRouter  } from 'react-router-dom';
import AppRouter from './global/AppRouter/AppRouter';
import Navbar from './global/Navbar/Navbar';
import 'antd/dist/antd.css';

const AppWrapper = styled.div`
  padding: 30px;
`;

const App: FC = () => {
/*   useEffect(() => {
    const test = AlphaVantageService.getNewestValues('IBM');
    const testtBulk = AlphaVantageService.getNewestValuesBulk(['IBM', 'GOOG']);
    console.warn(testtBulk);
  }, []) */
  return (
      <BrowserRouter>
        <Navbar />
        <AppWrapper>
          <AppRouter />
        </AppWrapper>
      </BrowserRouter>
  );
}

export default App;
