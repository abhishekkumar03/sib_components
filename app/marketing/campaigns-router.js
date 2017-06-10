import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import MainLayout from './campaigns/layouts/main-layout';
import CampaignCreationHeader from './campaigns/layouts/header';

// Sidebars
import SetupData from './campaigns/layouts/sidebar-setup';
import MessageData from './campaigns/layouts/sidebar-message';
import RecipientsData from './campaigns/layouts/sidebar-recipients';
import ConfirmationData from './campaigns/layouts/sidebar-confirmation';

// Pages
import Setup from './campaigns/creation-setup';
import Message from './campaigns/creation-message';
import Recipients from './campaigns/creation-recipients';
import Confirmation from './campaigns/creation-confirmation';


ReactDOM.render((
    <Router history={browserHistory}>
        <Route component={MainLayout}>
            <Route path="camp">
                <IndexRoute components={{content: Setup, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader}} />
                <Route path=":campType/setup" components={{content: Setup, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader, step: 'setup'}} />
                <Route path=":campType/:id/setup" components={{content: Setup, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader, step: 'setup'}} />

                <Route path=":campType/message-setup" components={{content: Message, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader, step: 'message-setup'}} />
                <Route path=":campType/:id/message-setup" components={{content: Message, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader, step: 'message-setup'}} />
                <Route path=":campType/:id/message-setup/:pageType" components={{content: Message, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader, step: 'message-setup'}} />

                <Route path=":campType/recipients" components={{content: Recipients, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader, step: 'recipients'}} />
                <Route path=":campType/:id/recipients" components={{content: Recipients, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader, step: 'recipients'}} />

                <Route path=":campType/confirmation" components={{content: Confirmation, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader, step: 'confirmation'}} />
                <Route path=":campType/:id/confirmation" components={{content: Confirmation, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader, step: 'confirmation'}} />
            </Route>
            <Route path="mailin_zend">
                <Route path="camp">
                    <IndexRoute components={{content: Setup, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader}} />
                    <Route path=":campType/setup" components={{content: Setup, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader, step: 'setup'}} />
                    <Route path=":campType/:id/setup" components={{content: Setup, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader, step: 'setup'}} />

                    <Route path=":campType/message-setup" components={{content: Message, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader, step: 'message-setup'}} />
                    <Route path=":campType/:id/message-setup" components={{content: Message, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader, step: 'message-setup'}} />
                    <Route path=":campType/:id/message-setup/:pageType" components={{content: Message, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader, step: 'message-setup'}} />

                    <Route path=":campType/recipients" components={{content: Recipients, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader, step: 'recipients'}} />
                    <Route path=":campType/:id/recipients" components={{content: Recipients, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader, step: 'recipients'}} />

                    <Route path=":campType/confirmation" components={{content: Confirmation, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader, step: 'confirmation'}} />
                    <Route path=":campType/:id/confirmation" components={{content: Confirmation, sidebarSetup: SetupData, sidebarMessage: MessageData, sidebarRecipients: RecipientsData, sidebarConfirmation: ConfirmationData, header: CampaignCreationHeader, step: 'confirmation'}} />
                </Route>
            </Route>
        </Route>
    </Router>
), document.getElementById('page-container'));
