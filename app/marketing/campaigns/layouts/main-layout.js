import React, { Component, PropTypes } from 'react';
import CustomAlert from '../custom-alert';
import {browserHistory} from 'react-router';
class MainLayout extends Component {
    constructor(props) {
        super(props);
        // default state data to pass on all the child component
        this.state = {
            campaignData : {},
            configData : {},
            validateData : {},
            alertTimeOut : null,
            showAlert: false
        };
        this.handelSubmit = this.handelSubmit.bind(this);
    }

    componentWillMount() {
        let res = {};
        // To redirect setup in case of other steps without ID
        if(this.props.step.type != "setup" && typeof this.props.params.id == 'undefined') {
            browserHistory.push(SITE_BASE_URL+'camp/'+this.props.params.campType+'/setup');
        }
        $.ajax({
            url : SITE_BASE_URL+'camp/campaigns-data',
            type: 'POST',
            data : {'id' : this.props.params.id, 'type' : this.props.params.campType},
            dataType: 'json',
            async: false,
            success: function(response) {
                let {campaignData} = response;
                if(this.props.params.campType == 'sms' && typeof campaignData.message != 'undefined') {
                    let smsResult = this.smsCount(campaignData.message);
                    Object.assign(campaignData, smsResult);
                    Object.assign(response, campaignData);
                }
                res = response;
            }.bind(this)
        });
        let campPropsObj = {};
        if(res.campaignData.type == "classic") {
            campPropsObj = { 
                'preheaderCheck': res.campaignData.preheader ? 1 : 0,
                'reply': res.campaignData.replyto ? 1 : 0,
                'checkboxTo': res.campaignData.tofield ? 1 : 0,
                'utm': res.campaignData.utm_campaign ? 1 : 0,
                'checkboxTags': res.campaignData.category ? 1 : 0,
                'checkboxUnsubscribe': res.campaignData.form_name ? 1 : 0,
                'headerCheck': res.campaignData.header ? 1 : 0,
                'footerCheck': res.campaignData.footer ? 1 : 0,
                //'sucformname': this.props.campaignData.suc_form_name ? 1 : 0,
                'inline_images' : res.campaignData.inline_images != "undefined" ? res.campaignData.inline_images : 0,
                'mirror_active' : typeof res.campaignData.mirror_active != "undefined" ? res.campaignData.mirror_active : 0,
                'has_attach' : typeof res.campaignData.attachmentfile != "undefined" && res.campaignData.attachmentfile != '' ? 1 : 0,
                'initial_quota': (typeof res.campaignData.initial_quota != 'undefined' && res.campaignData.initial_quota != 0) ? res.campaignData.initial_quota : '',
                'increase_rate': (typeof res.campaignData.increase_rate != 'undefined') ? res.campaignData.increase_rate : '',
                'warmup_enable': (typeof res.campaignData.initial_quota != 'undefined' && res.campaignData.initial_quota != '') ? 1 : 0,
                'type': (typeof res.campaignData.type != 'undefined') ? res.campaignData.type : this.props.params.campType,
            };
            Object.assign(res.campaignData, campPropsObj);
        }
        if(res.campaignData.type && this.props.params.id != '' && this.props.params.campType != res.campaignData.type){
            this.setState({campaignData:res.campaignData, configData:res.configData, validateData:res.validateData, showAlert:true, alertTimeOut:2000});
        } else {
            this.setState({campaignData:res.campaignData, configData:res.configData, validateData:res.validateData});
        }
    }

    // Function used for sms count
    smsCount(message) {
        let new_sms_length = sms_length;
        let msgLength = message.length||0;
        let specialChars = ['~', '^', '|'];
        let count = 0;
        let defaultLength = 0;
        let msgObject = {};
        for (var i = specialChars.length - 1; i >= 0; i--) {
            let textS = specialChars[i];
            let m = message.match(new RegExp(textS.toString().replace(/(?=[.\\+*?[^\]$(){}\|])/g, "\\"), "g"));
            count +=  m ? m.length:0;
        };

        msgLength += count;
        if (parseInt(msgLength) > parseInt(new_sms_length)) {
            new_sms_length = parseInt(sms_length) - parseInt(ch_sms_length);
        }

        let smsCount = parseInt(Math.floor((parseInt(msgLength) - 1) / parseInt(new_sms_length))) + 1;
        if (msgLength >= 765) {
            smsCount = 5;
        }
        if(smsCount < 2) {
            defaultLength = parseInt(sms_length);
        } else {
            defaultLength = parseInt(new_sms_length) * parseInt(smsCount)
        }
        Object.assign(msgObject, {msgLength, smsCount, defaultLength, new_sms_length});
        return msgObject;
    }
    /**
     * @description : common Function is used to save campaign steps data
     * 
     * @param : stepsDataToSubmit json object of steps data, type, stepName params are required to save steps data
     *          and campaign id is required in case of edit campaign.
     */
    handelSubmit(stepsDataToSubmit) {
        let result;
        let {type, step} = stepsDataToSubmit;
        $.ajax({
            url : SITE_BASE_URL+'camp/save-campaign',
            type: 'POST',
            data : stepsDataToSubmit,
            async: false,
            contentType: 'application/x-www-form-urlencoded',
            success: function(response) {
                if(response.validateData.status == "ok") {
                    let oldCampData = this.state.campaignData;
                    let oldConfigData = this.state.configData;
                    let oldValidateData = JSON.parse(JSON.stringify(this.state.validateData));
                    //response
                    let excludeList = (typeof response.campaignData.exclude_list !="undefined") ?response.campaignData.exclude_list:oldCampData.exclude_list;
                    let listMessage = (typeof response.campaignData.list_message !="undefined") ?response.campaignData.list_message:oldCampData.list_message;
                    let stillToProcess = (typeof response.campaignData.stilltoprocess !="undefined") ?response.campaignData.stilltoprocess:oldCampData.stilltoprocess;
                    let filterData = (typeof response.campaignData.filter !="undefined") ?response.campaignData.filter:oldCampData.filter;
                    Object.assign(oldCampData, stepsDataToSubmit);
                    if (!oldCampData.id && response.id) {
                        Object.assign(oldCampData, {id: response.id});
                    }
                    Object.assign(oldConfigData, {isCampImg: response.isCampImg, pictureData: response.pictureData});
                    let plainText = response.campaignData.plain_text||'';
                    Object.assign(oldCampData, {plain_text:plainText});
                    if (response.campaignData.process) {
                        Object.assign(oldCampData, {process:response.campaignData.process});
                    }

                    if(response.type == 'sms' && response.campaignData.message) {
                        let smsResult = this.smsCount(response.campaignData.message);
                        Object.assign(oldCampData, smsResult);
                    }
                    Object.assign(oldCampData, {id: response.id, type: response.type, exclude_list:excludeList, list_message:listMessage, stilltoprocess:stillToProcess,'filter':filterData});
                    if(!response.validateData[response.type+'-'+step]) {
                        delete (oldValidateData[response.type+'-'+step]);
                    }
                    Object.assign(oldValidateData, response.validateData);
                    this.setState({campaignData: oldCampData, validateData: oldValidateData, configData: oldConfigData});
                }
                result = response;
            }.bind(this)
        });
        return result;
    }

    translate(transVariable, options) {
        options = options||[];
        let innerHtmlFlag = (options[0]== 'innerhtml') ? 1 : 0;
        if(innerHtmlFlag) {
            options.splice(0, 1);
        }
        if (typeof($.t) == 'function') {
            transVariable = $.t(transVariable, options);
            return  innerHtmlFlag ? transVariable : <span dangerouslySetInnerHTML={{__html: transVariable}} />;
        }
        return '';
    }

    updateCampaignData(dataObject) {
        let campData = this.state.campaignData;
        let oldValidateData = this.state.validateData;
        if(oldValidateData[campData.type+'-message']) {
            delete(oldValidateData[campData.type+'-message']);
        }
        Object.assign(campData, dataObject, validateData: oldValidateData);
        this.setState({campaignData: campData});
    }

    updateConfigData(dataObject) {
        let confData = this.state.configData;
        Object.assign(confData, dataObject);
        this.setState({configData: confData});
    }

    /**
     * @description: Function to close send test model
     *
     * @modified by: Saurav
     */
    removeAlert() {
        this.setState({showAlert:false});
    }

    render() {
        let {content, header, sidebarSetup, sidebarMessage, sidebarRecipients, sidebarConfirmation, params} = this.props;
        let {campType, id} = params;
        let alertDisplay;
        /* Use to display alert in case of Campaign Type not match with saved campaign type */
        if(this.state.showAlert == true) {
            alertDisplay = (<CustomAlert message={this.translate("layout_index_1_label")} className="error" closeAlert={this.removeAlert.bind(this)} />);
        }
        /* Use to redirect camp listing in case of Campaign Type not match with saved campaign type */
        if(this.state.alertTimeOut != null) {
            setInterval(function(){ location.href= SITE_BASE_URL+"camp/listing"}, this.state.alertTimeOut);
        }
        
        let contentData = content && React.cloneElement(content, {
            campaignData: this.state.campaignData,
            configData: this.state.configData,
            validateData: this.state.validateData,
            translate: this.translate,
            smsCount: this.smsCount,
            handelSubmit: this.handelSubmit,
            updateCampaignData : this.updateCampaignData.bind(this),
            updateConfigData: this.updateConfigData.bind(this)
        });

        let sidebarSetupData = sidebarSetup && React.cloneElement(sidebarSetup, {
            campaignData: this.state.campaignData,
            validateData: this.state.validateData,
            translate: this.translate,
            configData: this.state.configData
        });

        let sidebarMessageData = sidebarMessage && campType != 'sms' && React.cloneElement(sidebarMessage, {
            campaignData: this.state.campaignData,
            validateData: this.state.validateData,
            translate:this.translate
        });

        let sidebarRecipientsData = sidebarRecipients && campType != 'template' && React.cloneElement(sidebarRecipients, {
            campaignData:this.state.campaignData,
            validateData: this.state.validateData,
            translate:this.translate
        });

        let sidebarConfirmationData = sidebarConfirmation && campType != 'template' && React.cloneElement(sidebarConfirmation, {
            campaignData:this.state.campaignData,
            validateData: this.state.validateData,
            translate:this.translate
        });

        let headerData = header && React.cloneElement(header, {translate: this.translate});
        
        return (
            <div className="container-fluid fade in fade-load" id="main-container">                
                {/* begin #main-content */}
                {alertDisplay}
                
                <div id="main-content">
                    
                    {/* begin #header */}
                    {headerData}
                    {/* end #header */}
                        
                    {/* begin #content */}
                    <div id="content">
                        {/* begin .row */}
                        <div className="row">
                            {/* begin .col */}
                            <div className="col-md-4">
                                <ul className="progress-vertical">
                                    {sidebarSetupData}
                                    {sidebarMessageData}
                                    {sidebarRecipientsData}
                                    {sidebarConfirmationData}
                                </ul>
                             </div>
                            {/* end .col */}

                            {/* begin .col */}
                            <div className="col-md-8">
                                {contentData}
                            </div>
                            {/* end .col */}

                        </div>
                        {/* end .row */}

                    </div>
                    {/* end #content */}

                    {/* begin #footer */}
                    <div id="footer"></div>
                    {/* end #footer */}

                </div>
                {/* end #main-content */}

            </div>
        );
    }
}

MainLayout.propTypes = {
    params: PropTypes.object,
    step: PropTypes.object,
    content: PropTypes.element,
    header: PropTypes.element,
    sidebarSetup: PropTypes.element,
    sidebarMessage: PropTypes.element,
    sidebarRecipients: PropTypes.element,
    sidebarConfirmation: PropTypes.element
};

export default MainLayout;
