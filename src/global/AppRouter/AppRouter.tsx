import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import CompaniesView from '../../Companies/CompaniesView/CompaniesView';
import TrackNewCompany from '../../Companies/TrackNewCompany/TrackNewCompany';

const AppRouter: FC = () => (
    <Switch>
        <Route exact path='/' component={CompaniesView} />
        <Route exact path='/track-new' component={TrackNewCompany} />
    </Switch>
)

export default AppRouter;
