import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import MainLayout from './layouts/main-layout';
import TemplatesHeader from './layouts/header';

// Pages
import Listing from './templates/listing/listing';


ReactDOM.render((
    <Router history={browserHistory}>
        <Route component={MainLayout}>
            <Route path="templates">
                <IndexRoute components={{content: Listing, header: TemplatesHeader}} />
                <Route path="listing" components={{content: Listing, header: TemplatesHeader}} />
            </Route>
        </Route>
    </Router>
), document.getElementById('content'));
