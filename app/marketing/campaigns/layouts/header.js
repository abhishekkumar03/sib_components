/*
// Header of campaign creation
// ------------------------------
// @author             Abhishek <abhishek@sendinblue.com>
// @description        Header containing title and navigation buttons
// @version            3.0
// ------------------------------
// @last edit          15/11/2016
// @by                 Laure <laure@sendinblue.com>
*/
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {listenFor} from '../event-system.js';

class Header extends Component {
    constructor(props) {
        super(props);
        //this.quitToListing = this.quitToListing.bind(this);
    }
    quitToListing(e) {
        let listType = '#draft_c';
        if(this.props.params.campType) {
            if(this.props.params.campType == 'sms') {
                listType = '#draft_s';
            }
            if(this.props.params.campType == 'trigger') {
                listType = '#draft_t';
            }
            if(this.props.params.campType == 'template') {
                listType = '#temp_inactive_m';
            }
        }
        window.location = '/camp/listing'+listType;
        e.preventDefault();
    }
    render() {
        let nextLink;
        let backLink;
        let saveAndExit = '/camp/listing';
        let saveTemplateLink;
        let stepName;
        let scheduleLink;
        let translate = this.props.translate;

        if (this.props.route.path.match(/setup/i)) {
            if(this.props.params.campType == 'sms') {
                nextLink = 'recipients';
            } else {
                nextLink = 'message-setup';
            }
            stepName = 'Setup';
        }
        if (this.props.route.path.match(/message-setup/i)) {
            nextLink = 'recipients';
            backLink = 'setup';
            stepName = 'Message Setup';
        }

        if (this.props.route.path.match(/recipients/i)) {
            nextLink = 'confirmation';
            if(this.props.params.campType == 'sms') {
                backLink = 'setup';
            } else {
                backLink = 'message-setup';
            }
            stepName = 'Recipients';
        }

        if (this.props.route.path.match(/confirmation/i)) {
            backLink = 'recipients';
            stepName = 'Confirmation';
            scheduleLink = 'schedule';
        }

        if(nextLink) {
            if (this.props.params.campType == "template" && this.props.route.path.match(/message-setup/i)) {
                nextLink = (
                    <a className="btn btn-ghost m-l-sm" {...listenFor('click', `${nextLink}`)}><i className="fa fa-power-off"></i>{translate('layout_header_1_action')}</a>
                );
            }
            else {
                nextLink = (
                    <a className="btn btn-success m-l-xs" {...listenFor('click', `${nextLink}`)}>{translate('layout_header_2_action')} <i className="fa fa-arrow-right"></i></a>
                );
            }
        }
        saveAndExit = (
            <div className="btn-group">
                <button type="button" className="btn btn-ghost" {...listenFor('click', `${saveAndExit}`)}>{translate('layout_header_3_action')}</button>
                <button type="button" className="btn btn-ghost dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="caret"></span><span className="sr-only">{translate('layout_header_4_action')}</span>
                </button>
                <ul className="dropdown-menu">
                    <li><a href="javascript:void(0);" {...listenFor('click', `${saveAndExit}`)}>{translate('layout_header_3_action')}</a></li>
                    <li><a href="javascript:void(0);" onClick={this.quitToListing.bind(this)}>{translate('layout_header_5_action')}</a></li>
                </ul>
            </div>
        );
        
        if(backLink) {
            backLink = (
                <a className="btn btn-ghost m-l-xs" {...listenFor('click', `${backLink}`)}><i className="fa fa-arrow-left"></i> {translate('layout_header_6_action')}</a>
            );
        }

        if (scheduleLink) {
            scheduleLink = (
                <a className="btn btn-success m-l-xs" {...listenFor('click', `${scheduleLink}`)} className="btn btn-secondary m-l-xs">{translate('layout_header_7_action')}</a>
            );
        }

        let actionButtons = (
            <div className="pull-right">
                {saveAndExit}
                {scheduleLink}
                {backLink}
                {nextLink}

            </div>
        );

        return (
            <div id="header">

                {/* begin .row */}
                <div className="row">

                    {/* begin .col */}
                    <div className="col-md-12 clearfix">
						<div className="">
							{actionButtons}
							<h2>
								<span className="sib-logo-symbol logo-primary m-r-xs"></span>
								<b>Campaign Creation</b> › <small>{stepName}</small>
							</h2>
						</div>
                    </div>
                    {/* end .col */}

                </div>
                {/* end .row */}

            </div>
        );
    }
    
}

Header.propTypes = {
    params: PropTypes.object,
    route: PropTypes.object,
    translate: PropTypes.func,
};

export default Header;
