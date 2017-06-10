import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import MainLayout from './campaigns/layouts/main-layout';
import CampaignCreationHeader from './campaigns/layouts/header';

// Pages
import Setup from './campaigns/creation-setup';
import Message from './campaigns/creation-message';
import Recipients from './campaigns/creation-recipients';
import Confirmation from './campaigns/creation-confirmation';


ReactDOM.render((
    <Router history={browserHistory}>
        <Route component={MainLayout}>
            <Route path="camp">
                <IndexRoute components={{content: Setup, header: CampaignCreationHeader}} />
                <Route path=":campType/setup" components={{content: Setup, header: CampaignCreationHeader}} />
                <Route path=":campType/:id/setup" components={{content: Setup, header: CampaignCreationHeader}} />

                <Route path=":campType/message-setup" components={{content: Message, header: CampaignCreationHeader}} />
                <Route path=":campType/:id/message-setup" components={{content: Message, header: CampaignCreationHeader}} />
                <Route path=":campType/:id/message-setup/:pageType" components={{content: Message, header: CampaignCreationHeader}} />

                <Route path=":campType/recipients" components={{content: Recipients, header: CampaignCreationHeader}} />
                <Route path=":campType/:id/recipients" components={{content: Recipients, header: CampaignCreationHeader}} />

                <Route path=":campType/confirmation" components={{content: Confirmation, header: CampaignCreationHeader}} />
                <Route path=":campType/:id/confirmation" components={{content: Confirmation, header: CampaignCreationHeader}} />
            </Route>
            <Route path="mailin_zend">
                <Route path="camp">
                    <IndexRoute components={{content: Setup, header: CampaignCreationHeader}} />
                    <Route path=":campType/setup" components={{content: Setup, header: CampaignCreationHeader}} />
                    <Route path=":campType/:id/setup" components={{content: Setup, header: CampaignCreationHeader}} />

                    <Route path=":campType/message-setup" components={{content: Message, header: CampaignCreationHeader}} />
                    <Route path=":campType/:id/message-setup" components={{content: Message, header: CampaignCreationHeader}} />
                    <Route path=":campType/:id/message-setup/:pageType" components={{content: Message, header: CampaignCreationHeader}} />

                    <Route path=":campType/recipients" components={{content: Recipients, header: CampaignCreationHeader}} />
                    <Route path=":campType/:id/recipients" components={{content: Recipients, header: CampaignCreationHeader}} />

                    <Route path=":campType/confirmation" components={{content: Confirmation, header: CampaignCreationHeader}} />
                    <Route path=":campType/:id/confirmation" components={{content: Confirmation, header: CampaignCreationHeader}} />
                </Route>
            </Route>
        </Route>
    </Router>
), document.getElementById('page-container'));
