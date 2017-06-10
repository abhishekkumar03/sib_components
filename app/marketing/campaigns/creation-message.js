/*
// Campaign creation - Message
// ------------------------------
// @author             Abhishek <abhishek@sendinblue.com>
// @description        Message of the campaign
// @version            3.0
// ------------------------------
// @last edit          15/11/2016
// @by                 Laure <laure@sendinblue.com>
*/
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import CreationMessageEditOptions from './creation-message-edit-options';
import CreationMessagePreview from './creation-message-preview';
import CreationMessageLoadingPage from './creation-message-loading-page';
import GlobalEvents from './event-system.js';

class CreationMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: false};
        GlobalEvents.subscribe(this, 'click');
    }

    handleToggleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }
	

    openEditBlock() {
        let link = location.pathname;
        let { pageType } = this.props.params;
        if (!pageType || pageType != 'edit') {
            if (link.endsWith("/")) {
               link = link+'edit'; 
            }
            else {
                link = link+'/edit';
            }
            browserHistory.push(link);
        }
    }

    openPreviewBlock() {
        let link = location.pathname;
        let { pageType } = this.props.params;
        if (pageType && pageType == 'edit') {
            link = link.replace('/edit', '');
            browserHistory.push(link);
        }
    }
    componentWillUnmount(){
        GlobalEvents.unsubscribe(this, 'click');
    }
    onGlobalClick(e, link) {
        if(link.match(/listing/i)) {
            if(this.props.params.campType == "classic") {
                link = link + '#draft_c';
            } else if(this.props.params.campType == "sms") {
                link = link + '#draft_s';
            }
            window.location = link;
        } else {
            browserHistory.push(SITE_BASE_URL+'camp/'+this.props.params.campType+'/'+this.props.params.id+'/'+link);
        }
    }

    render() {
        let { pageType } = this.props.params;
        let campaignData = this.props.campaignData;
        let { message, camp_name } = campaignData;
        let configData = this.props.configData;
        let messagePageData;
        let previewBlock = '';
        if (!camp_name) {
            previewBlock = 'hidden ';
            messagePageData = (
                <CreationMessageLoadingPage />
            );
        }
        else if ((!message || message == '') || (pageType && pageType == 'edit')) {
            previewBlock = 'hidden ';
            messagePageData = (
                <CreationMessageEditOptions configData={configData} campaignData={campaignData} translate={this.props.translate} handelSubmit={this.props.handelSubmit} openPreviewBlock={this.openPreviewBlock.bind(this)} updateCampaignData={this.props.updateCampaignData} updateConfigData={this.props.updateConfigData}/>
            );
        }
        else {
            messagePageData = (
                <CreationMessagePreview campaignData={campaignData} configData={configData} translate={this.props.translate} handelSubmit={this.props.handelSubmit} openPreviewBlock={this.openPreviewBlock.bind(this)} updateCampaignData={this.props.updateCampaignData} isToggleOn={this.state.isToggleOn}/>
            );
        }
        return (
            <div className="well p-l-lg p-r-lg m-b-md">

                <h5 className="m-b-0 m-t-xs pull-left"><b>{this.props.translate("message_index_1_title")} </b></h5>
				<div className={previewBlock+"switch-fake pull-right"}>
					<span className="fa fa-desktop"></span> <label>
						<input type="checkbox" id="switch-camp-preview" onChange={this.handleToggleClick.bind(this)}/>
						<span className="check-indicator"></span>
					</label> <span className="fa fa-mobile"></span>
				</div>
				<div className="clearfix"></div>
                <hr />

                {messagePageData}
				
                <div className={previewBlock+"spacer-bottom m-t-lg"}>

                    <p className="m-b-xs"><b>{this.props.translate('message_index_2_message')}</b></p>

                    <p className="text-muted small">
                        {this.props.translate('message_index_3_message')} <a href="javascript:void(0);" onClick={this.openEditBlock.bind(this)}>{this.props.translate('message_index_4_action')}</a>.
                    </p>

                </div>

            </div>
        );
    }
}

CreationMessage.propTypes = {
    translate: PropTypes.func,
    handelSubmit: PropTypes.func,
    configData: PropTypes.object,
    campaignData: PropTypes.object,
    openPreviewBlock: PropTypes.func,
    updateCampaignData: PropTypes.func,
    updateConfigData: PropTypes.func,
    params: PropTypes.object
};

export default CreationMessage;
