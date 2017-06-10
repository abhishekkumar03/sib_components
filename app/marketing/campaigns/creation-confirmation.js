/*
// Campaign creation - Confirmation
// ------------------------------
// @author             Abhishek <abhishek@sendinblue.com>
// @description        Confirm the campaign creation
// @version            3.0
// ------------------------------
// @last edit          15/11/2016
// @by                 Laure <laure@sendinblue.com>
*/
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import PreviewBrowseModal from './preview-browse-modal'
import { Button } from 'react-bootstrap';
import SendTestEmailModal from './send-test-email-modal';
import SendScheduleCampaignModal from './send-schedule-campaign-modal';
import CreationEditCampaignModal from './creation-edit-campaign-modal';
import SendSmsTestModal from "./send-sms-test-modal";
import GlobalEvents from './event-system.js';
import {browserHistory} from 'react-router';
import CustomAlert from './custom-alert';
import {listenFor} from './event-system.js';

/**
 * @description : Class is created for client preview popup
 * 
 * @author : Joni <joni@sendinblue.com>
 * @created : 14-11-2016
 * @modified: 22-11-2016
 * @modified by: Joni <joni@sendinblue.com>
 */
class CreationConfirmation extends Component{
    // Constructor
    constructor(props) {
        super(props);
        let {isValid} = this.props.validateData;

        this.state = {
            showBrowsePreviewModal: false,
            showSendTestModal: false,
            showScheduleModal: false,
            openEditorModal: false,
            showSendSmsTestModal: false,
            errorMessage: '',
            isValid : isValid
        }
        this.openSendTestModal.bind(this);
        GlobalEvents.subscribe(this, 'click');
    }
    
    componentDidMount() {
        var sendTestModelAction = document.getElementById("send-test-modal-button");

        if (sendTestModelAction) {
            sendTestModelAction.onclick = function(e){
                this.openSendTestModal();
            }.bind(this);
        }
    }

    componentWillUnmount(){
        GlobalEvents.unsubscribe(this, 'click');
    }

    componentWillReceiveProps(nextProps) {
        let {isValid} = nextProps.validateData;
        this.setState({isValid: isValid});
    }

    onGlobalClick(e, link) {
        if (link.match(/schedule/i)) {
             this.openScheduleModal(this.state.isValid);
        } else if(link.match(/listing/i)) {
            if(this.props.params.campType == 'sms'){
               link = link + '#draft_s'; 
            } else if(this.props.params.campType == 'classic'){
                link = link + '#draft_c';
            } else if(this.props.params.campType == 'trigger'){
                link = link + '#draft_t';
            } /*else {
                link = link + '#';
            }*/
            window.location = link;
        } else {
            browserHistory.push(SITE_BASE_URL+'camp/'+this.props.params.campType+'/'+this.props.params.id+'/'+link);
        }
    }

    /**
     * @description : Function to open model for browse preview
     * 
     * @modified by: Joni <joni@sendinblue.com>
     */
    openBrowsePreviewModal() {
        this.setState({showBrowsePreviewModal: true});
    }

    /**
     * @description : Function is used to close model for browse preview
     * 
     * @modified by: Joni <joni@sendinblue.com>
     */
    closeBrowsePreviewModal() {
        this.setState({showBrowsePreviewModal: false});
    }
    
    /**
     * @description : Function used to open test popup for sending email
     * 
     * @modified by: Joni <joni@sendinblue.com>
     */
    openSendTestModal() {
        this.setState({showSendTestModal: true});
    }
   
    /**
     * @description :  Function used to close test popup for sending email
     * 
     * @modified by: Joni <joni@sendinblue.com>
     */
    closeSendTestModal() {
        this.setState({showSendTestModal: false});
    }

    /**
     * @description : Function used to open send test sms popup 
     * 
     * @modified by: Joni <joni@sendinblue.com>
     */
    openSendSmsTestModal() {
        this.setState({showSendSmsTestModal: true});
    }
    /**
     * @description : Function used to close send test sms popup 
     * 
     * @modified by: Joni <joni@sendinblue.com>
     */
    closeSendSmsTestModal() {
        this.setState({showSendSmsTestModal: false});
    }

    /**
     * @description : Function used to open test popup for schedule campaign
     * 
     * @modified by: Joni <joni@sendinblue.com>
     */
    openScheduleModal(isValid) {
        if (isValid) {
            this.setState({showScheduleModal: true});
        } else {
            this.setState({errorMessage: this.props.translate("confirmation_index_15_error")});
        }
    }

    /**
     * @description : Function used to close test popup for schedule campaign
     * 
     * @modified by: Joni <joni@sendinblue.com>
     */
    closeScheduleModal() {
        this.setState({showScheduleModal: false});
    }

    closeEditorModal() {
        this.setState({openEditorModal:false});
    }

    /**
     * @description: Function to remove error message
     * @modified by: Joni <joni@sendinblue.com>
     */
    removeAlert() {
        this.setState({ errorMessage: ''});
    }

    openPreviewBlock() {
        let link = location.pathname;
        let { pageType } = this.props.params;
        if (pageType && pageType == 'edit') {
            link = link.replace('/edit', '');
            browserHistory.push(link);
        }
    }

    /**
     * @description : Render 
     * 
     * @modified by: Joni <joni@sendinblue.com>
     */
    render() {
        
        let {test_emails} = this.props.configData;
        let {id, stilltoprocess, fromfield, editor_type, default_header, fromname, fromemail, subject, smsCount, msgLength, new_sms_length, message, sms_sender} = this.props.campaignData;
        let iframeUrl = SITE_BASE_URL + "camp/showpreview/id/" + this.props.params.id;

        let recipientUrl = SITE_BASE_URL + "camp/recipients/" + this.props.params.id;
        let editCampaignAction, actionButtons, campContent;
        let type = this.props.params.campType;
        let disabledFlag = message ? false : true;
        let iframeData;
        if (disabledFlag) {
            iframeData = (
                <div className="empty-msg-box">
                    <div className="campaign-icon"></div>
                    <h2>{this.props.translate("confirmation_index_1_label")}</h2>
                    <p>{this.props.translate("confirmation_index_2_message")}</p>
                </div>
            );
        }
        else {
           iframeData = (
                <iframe id="previewContentIframe" frameBorder="0" src={iframeUrl} style={{width: '100%', height:'400px'}} ref="finalIframe"></iframe>
           ); 
        }

        switch(editor_type) {
            case 1:
            case '1':
                editCampaignAction = (
                    <a className="pull-right btn btn-ghost" href={"/nb/index/id/"+id}>
                        {this.props.translate("confirmation_index_3_action")}
                    </a>
                );
                break;

            case 5:
            case '5':
                editCampaignAction = (
                    <a className="pull-right btn btn-ghost" href={"/rnb/index/id/"+id}>
                        {this.props.translate("confirmation_index_3_action")}
                    </a>
                );
                break;

            default:
                // for editor_type 2,3,4
                if (disabledFlag) {
                    editCampaignAction = (
                        <a href="javascript:void(0)" {...listenFor('click', `${'/message-setup'}`)} className="pull-right btn btn-ghost">
                            {this.props.translate("confirmation_index_3_action")}
                        </a>
                    );
                } else {
                    editCampaignAction = (
                        <a className="pull-right btn btn-ghost" onClick={() => this.setState({ openEditorModal: true})}>
                            {this.props.translate("confirmation_index_3_action")}
                        </a>
                    );
                }
            break;
        }
        
        let sendTestModalComponent, browsePreviewModalComponent, scheduleModalComponent, sendSmsTestModalComponent, alertMessage;
        // When click for show send test modal
        if (this.state.showSendTestModal) {
            sendTestModalComponent = (<SendTestEmailModal showTestModal={this.state.showSendTestModal} closeTestModal={this.closeSendTestModal.bind(this)} 
                    testEmails={test_emails} campType={type} campId={id} translate={this.props.translate}/>);
        }

        // When click for show browse preview modal
        if (this.state.showBrowsePreviewModal) {
            browsePreviewModalComponent = (<PreviewBrowseModal translate={this.props.translate} campId={id} showModal={this.state.showBrowsePreviewModal} closeModal={this.closeBrowsePreviewModal.bind(this)}/>);
        }
        // When click for show schedule modal
        if (this.state.showScheduleModal) {
            scheduleModalComponent = (<SendScheduleCampaignModal translate={this.props.translate} showScheduleModal={this.state.showScheduleModal} closeScheduleModal={this.closeScheduleModal.bind(this)} campaignData={this.props.campaignData} handelSubmit={this.props.handelSubmit}/>);
        }
        // When click for sending test sms
        if (this.state.showSendSmsTestModal) {
            sendSmsTestModalComponent = (<SendSmsTestModal showSendSmsTestModal={this.state.showSendSmsTestModal} translate={this.props.translate} closeSendSmsTestModal={this.closeSendSmsTestModal.bind(this)} sms_sender={sms_sender} message={message}/>);
        }

        if (this.state.errorMessage) {
            alertMessage = (<CustomAlert message={this.state.errorMessage} className="error" closeAlert={this.removeAlert.bind(this)} />);
        }
        // When sms campaign
        if (type == 'sms') {
            let count = 1;
            let smsMessage = [];
            for (let i = 0; i < msgLength; i += parseInt(new_sms_length)) {
                let contentData = message.substring(i, eval(i + parseInt(new_sms_length)));
                let contentLength = contentData.length;
                let subcount = 0;
                let specialChars = ['~', '^', '|'];

                for (let k = specialChars.length - 1; k >= 0; k--) {
                    let textS = specialChars[k];
                    let m = contentData.match(new RegExp(textS.toString().replace(/(?=[.\\+*?[^\]$(){}\|])/g, "\\"), "g"));
                    subcount +=  m ? m.length:0;
                }

                contentLength += subcount;
                let newMessage = message.substring(i, eval(i + parseInt(new_sms_length)));

                smsMessage.push(
                    <div className="col-md-6 spacer-bottom-md m-b-sm" key={count}>
                        <div>
                            <label className="pull-left">{this.props.translate("confirmation_index_4_label", [count])}</label>
                            <span className="pull-right small">{this.props.translate("confirmation_index_5_label", [contentLength])}</span>
                        </div>
                        <div className="clearfix"></div>
                        <div>
                            <textarea className="form-control" rows="6" disabled style={{backgroundColor:"#fff"}} defaultValue={newMessage}></textarea>
                        </div>
                    </div>
                );
                count++;
            }

            actionButtons = (
                <div>
                    <Button disabled={disabledFlag} onClick={this.openSendSmsTestModal.bind(this)} bsStyle="primary">{this.props.translate("confirmation_index_6_action")}</Button>
                </div>
            );

            if (disabledFlag) {
                campContent = (
                    <div>
                        <div className="pull-right m-b-xs">
                            {actionButtons}
                        </div>
                        <div className="clearfix"></div>
                        <div className="empty-msg-box" style={{background:"#e7f5f8"}}>
                            <div className="campaign-icon"></div>
                            <h2>{this.props.translate("confirmation_index_1_label")}</h2>
                            <p>{this.props.translate("confirmation_index_2_message")}</p>
                        </div>
                    </div>
                );
            } else {
                campContent = (
                    <div>
                        <div className="pull-right m-b-xs">
                            {actionButtons}
                        </div>

                        <div className="clearfix"></div>
                        <div className="row">{smsMessage}</div>
                        <div className="clearfix"></div>
                        <p>{this.props.translate("confirmation_index_7_message")} <br/>
                            {this.props.translate("confirmation_index_8_message")}
                        </p><br/>
                    
                        <div className="row">
                            <div className="col-md-12">
                                <div className="alert alert-info" role="alert">
                                    <span className="fa fa-info-circle"></span> 
                                    {this.props.translate('confirmation_index_9_message')}
                                </div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                );
            }
        } else {
            actionButtons = (
   
                <div className="camp-preview-header">
                    <span></span>
                    <Button onClick={this.openBrowsePreviewModal.bind(this)} disabled={disabledFlag} className="btn btn-ghost m-r-xs">{this.props.translate("confirmation_index_10_action")}</Button>
                    <Button onClick={this.openSendTestModal.bind(this)} disabled={disabledFlag} className="btn btn-primary m-r-xs">{this.props.translate("confirmation_index_6_action")}</Button>
                    {editCampaignAction}
                </div>
            );
            let sentMessage;
            if (disabledFlag) {
                sentMessage = (<label>{this.props.translate("confirmation_index_17_message")}</label>);
            } else {
                sentMessage = (<label>{this.props.translate("confirmation_index_16_message", [stilltoprocess ? stilltoprocess : 0])}</label>);
            }

            campContent = (
                <div>
                    <div>
                        {sentMessage}
                    </div>
                    <div className="clearfix"></div>
                    <div className="camp-preview spacer-top spacer-bottom">

                        {actionButtons}
                        <div className="p-sm">
                            <ul className="list-unstyled font-size-small">
                                <li><b>{this.props.translate("confirmation_index_11_label")}:</b> {fromfield} - {fromemail}</li>
                                <li><b>{this.props.translate("confirmation_index_12_label")}: </b> {subject}</li>
                                <li><b>{this.props.translate("confirmation_index_13_label")}:</b>{default_header}</li>
                            </ul>
                    </div>
                        <div className="desk-preview-content" style={{background: '#e7f5f8', height: '400px'}}>
                            <CreationEditCampaignModal campaignData={this.props.campaignData} openEditorModal={this.state.openEditorModal} closeEditorModal={this.closeEditorModal.bind(this)} translate={this.props.translate}  handelSubmit={this.props.handelSubmit} openPreviewBlock={() => { let iframeDom = this.refs.finalIframe; iframeDom.src = iframeDom.src; }}/>
                            {iframeData}
                        </div>

                    </div>
                </div>
            );
        }

        return (
            <div className="well p-l-lg p-r-lg m-b-md">
                <h5 className="m-b-0 m-t-xs"><b>{this.props.translate("confirmation_index_14_title")}</b></h5>
                <hr />
                {alertMessage}
                {campContent}
                {browsePreviewModalComponent}
                {sendTestModalComponent}
                {scheduleModalComponent}
                {sendSmsTestModalComponent}
            </div>
        );
    }
}

CreationConfirmation.propTypes = {
    validateData: PropTypes.object,
    handelSubmit: PropTypes.func,
    campaignData: PropTypes.object,
    translate: PropTypes.func
};

export default CreationConfirmation;
