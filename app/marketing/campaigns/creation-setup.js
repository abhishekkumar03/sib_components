import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ComponentEmailCampaignForm from './component-email-campaign-form';
import ComponentSmsCampaignForm from './component-sms-campaign-form';

class CreationSetup extends Component {
    constructor(props) {
        super(props);
        return true;
    }
    
    componentWillMount() {
        //do nothing
    }
    
    render() {
        var type = (typeof this.props.campaignData != 'undefined' && typeof this.props.campaignData.type != 'undefined') ? this.props.campaignData.type : this.props.params.campType;
        return (
            type == 'sms' ? <ComponentSmsCampaignForm campaignData={this.props.campaignData} configData={this.props.configData} validateData={this.props.validateData} updateData={this.props.handelSubmit} type={type} smsCount={this.props.smsCount} translate={this.props.translate}/> : <ComponentEmailCampaignForm campaignData={this.props.campaignData} configData={this.props.configData} validateData={this.props.validateData} updateData={this.props.handelSubmit} type={type} translate={this.props.translate}/>
        )
    }    
     
};

CreationSetup.propTypes = {
    campaignData: PropTypes.object,
    configData: PropTypes.object,
    validateData: PropTypes.object,
    handelSubmit: PropTypes.func,
    params: PropTypes.object,
    translate: PropTypes.func,
    smsCount: PropTypes.func
};

export default CreationSetup;