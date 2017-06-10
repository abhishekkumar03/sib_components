import React, { Component, PropTypes } from 'react';
import ComponentFolderListRender from './component-folder-list-render';
import ComponentRecipientsAdvancedSearch from './component-recipients-advanced-search';
import ComponentRecipientsTrigger from './component-recipients-trigger';

import GlobalEvents from './event-system.js';
import {browserHistory} from 'react-router';
var serialize = require('form-serialize');

class CreationRecipients extends Component {
    constructor(props) {
        super(props);
        // default state data to pass on all the child component
        this.state = {
            listData : {},
            isExeListVisible:0,
            isAdvancedSearchVisible:0,
            selectedContactObj:{},
            excludedContactObj:{},
            htmlData : "",
            recurringChecked : "",
        }
        this.searchForm = this.searchForm.bind(this);
        this.updateReoccuring = this.updateReoccuring.bind(this);
    }
    componentWillMount() {

        let messageData = this.props.campaignData;
        let messageID = messageData.id;
        if(messageData.list_message)
        {
            for(var index = 0;index<messageData.list_message.length;index++)
            {
                var listID  = messageData.list_message[index].listid;
                this.state.selectedContactObj[listID] = listID;
            }
        }
        if(messageData.exclude_list)
        {
            for(var index = 0;index<messageData.exclude_list.length;index++)
            {
                var listID  = messageData.exclude_list[index].listid;
                this.state.excludedContactObj[listID] = listID;
            }
        }

        
        fetch(SITE_BASE_URL+'camp/step-folder-list/', {
            credentials: 'same-origin',
            method: 'POST',
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            let listData =  data['result'];
            this.setState({
                listData : listData,
            });
        }.bind(this))

    fetch(SITE_BASE_URL+'camp/advanced-recipients-filter/type/classic/id/'+messageID, {
            credentials: 'same-origin',
            method: 'POST',
        })
        .then(function(response) {
            return response.text();
        })
        .then(function(body) {
            // document.searchWrapper.innerHTML = body
            let htmlData =  body;
            this.setState({
                htmlData : htmlData,
            });
        }.bind(this))

        GlobalEvents.subscribe(this, 'click');
    }
    componentDidMount (){

        let messageData = this.props.campaignData;

        if(messageData.filter[0].segment_data&&messageData.filter[0].segment_data.length>0)
        {
            this.refs.advancecheckbox.checked = true;
            this.setState({
                isAdvancedSearchVisible : 1,
            });

        }

        if(messageData.filter)
        {
            setTimeout(function(){ loadSegmentSearch(messageData.filter[0].new, messageData.filter[0].segment_data, messageData.filter[0].match) }, 2000);
        }
        let messagetype = messageData.type;
        if (messagetype == 'trigger')
        {
            if(messageData.recurring==1)
            {
                // this.refs.recurring_yes.checked=true;
                this.setState({
                    recurringChecked : messageData.recurring,
                });
            }else{
                // this.refs.recurring_yes.checked=false;
                this.setState({
                    recurringChecked : messageData.recurring,
                });
            }
            
        }else{
            messageData.recurring=="";
        }
        

    }
    componentWillUnmount() {
        GlobalEvents.unsubscribe(this, 'click');
    }
    toggleExcList(e){
        this.setState((prevState,props)=>({
            isExeListVisible:!prevState.isExeListVisible,
        }))
    }
    toggleAdvanBlock(e){
        this.setState((prevState,props)=>({
            isAdvancedSearchVisible:!prevState.isAdvancedSearchVisible,
        }))
        setTimeout(function(){
            var blockDiv = document.getElementById("search_blocks_all");
            if(blockDiv)
            {
                var theElements = blockDiv.getElementsByClassName("blk-or-main");
                if(theElements.length==0)
                {
                    add_or_block();
                }
            }
        }, 500);
    }
    updateReoccuring(change)
    {
        // this.setState({
        //     recurringChecked:!prevState.recurringChecked,
        // }))
        console.log("change= "+change);
        // console.log("from parent updateReoccuring = "+change);
        // this.state.recurringCheked
        // console.log("current form parent = "+this.state.recurringCheked);
        // let nextChange =  change;
            this.setState({
                recurringChecked : change,
            });
            console.log("recurringChecked = "+this.state.recurringChecked);

    }


    onGlobalClick(e,link) {
        // data: 'list_id='+listids+'&recurring='+recurring+'&messagetype='+messagetype+'&type='+messagetype+'&id='+messageid+exclude_lists+'&step=step1',
        let campaignData = this.props.campaignData;
        let messagetype = campaignData.type;
        var recurring = '';
        var unique_count = 9999; //high count number so search array doesn't get overwritten
        var step = 'step1'

        // var recurringCheked = (document.getElementById("recurring_yes")&&document.getElementById("recurring_yes").checked)?true:false;
        // if (messagetype == 'trigger' && recurringCheked){ recurring = 1;}
        var messageID = campaignData.id;
        var listids = new Array();
        var excludeLists = new Array();

        $('#searchActivated').val('true');
        if(document.getElementById('searchActivated') !=null)
        {
            document.getElementById("searchActivated").value = 'true';
        }


        for (var i = 0; i < Object.keys(this.state.selectedContactObj).length; i++)
        {
            var listId =  Object.keys(this.state.selectedContactObj)[i];
            var contact  = this.state.selectedContactObj[listId];

                listids.push(listId);
                var listid = listId;
                var list_type = 'equal_list';

                var listIntInput = document.createElement("input");
                listIntInput.setAttribute("type", "hidden");
                listIntInput.setAttribute("name", "attributes[" + unique_count + "][]");
                listIntInput.setAttribute("value", "list_int");

                var listTypeInput = document.createElement("input");
                listTypeInput.setAttribute("type", "hidden");
                listTypeInput.setAttribute("name", "conditions[" + unique_count + "][]");
                listTypeInput.setAttribute("value", list_type);

                var listSearchInput = document.createElement("input");
                listSearchInput.setAttribute("type", "hidden");
                listSearchInput.setAttribute("name", "search[" + (unique_count++) + "][]");
                listSearchInput.setAttribute("value", listid);

                var div = document.createElement("div");
                div.setAttribute("class", "hiddenfields");
                div.setAttribute("id", "list_int_" + listid);
                div.style.cssText = 'display:none';
                div.appendChild(listIntInput);
                div.appendChild(listTypeInput);
                div.appendChild(listSearchInput);

                var searchForm = document.getElementById("search_form");
                if(searchForm !=null)
                {
                    searchForm.appendChild(div);
                }
        }

        for (var i = 0; i < Object.keys(this.state.excludedContactObj).length; i++)
        {
            var listId =  Object.keys(this.state.excludedContactObj)[i];
            var contact  = this.state.excludedContactObj[listId];

            var list_type = 'exclude_list';
            excludeLists.push(listId);
            var listIntInput = document.createElement("input");
            listIntInput.setAttribute("type", "hidden");
            listIntInput.setAttribute("name", "attributes[" + unique_count + "][]");
            listIntInput.setAttribute("value", "list_int");


            var listTypeInput = document.createElement("input");
                listTypeInput.setAttribute("type", "hidden");
                listTypeInput.setAttribute("name", "conditions[" + unique_count + "][]");
                listTypeInput.setAttribute("value", list_type);

            var listSearchInput = document.createElement("input");
                listSearchInput.setAttribute("type", "hidden");
                listSearchInput.setAttribute("name", "search[" + (unique_count++) + "][]");
                listSearchInput.setAttribute("value", listId);


                var div = document.createElement("div");
                div.setAttribute("class", "hiddenfields");
                div.setAttribute("id", "list_int_" + listId);
                div.style.cssText = 'display:none';
                div.appendChild(listIntInput);
                div.appendChild(listTypeInput);
                div.appendChild(listSearchInput);

                var searchForm = document.getElementById("search_form");
                if(searchForm)
                {
                    searchForm.appendChild(div);
                }

        }

        listids = listids.join("|");
        excludeLists = excludeLists.join("|");


        prepare_query_string();
        var  extraData = '&messageid=' + messageID + '&selection=all&task=SAVE_SEGMENT&search_segment_query=true';
        var match = 'all';
        var form = document.querySelector('#search_form');
        var searchFormData  = serialize(form);
        var  data = '&list_message='+listids+'&recurring='+recurring+'&messagetype='+messagetype+'&type='+messagetype+'&id='+messageID+'&exclude_lists='+excludeLists+'&step=recipients';
        searchFormData += extraData;
        searchFormData += data;
        var search_data = searchFormData.trim();
            // this.searchForm(, 'task', 'segment', step);

        var  data = {'list_message':listids,'list_id':listids,'recurring':recurring,'messagetype':messagetype,'type':messagetype,'id':messageID,'step':'recipients','exclude_lists':excludeLists,'search_data':search_data};
        let succUpdated = this.props.handelSubmit(search_data);
        if(link.match(/listing/i))
        {
            if(messagetype == "classic") {
                link = link + '#draft_c';
            } else if(messagetype == "sms") {
                link = link + '#draft_s';
            }
            window.location = link;
        }else {
            browserHistory.push(SITE_BASE_URL+'camp/'+messagetype+'/'+messageID+'/'+link);
        }

    }
    searchForm(extraData, type, task_name, step)
    {
        fetch(SITE_BASE_URL+'users/find', {
            method: 'POST',
            body: search_data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
              if(data) {
                    if(typeof data.result!="undefined" && data.result.status=='KO'){
                        // $scope.pageloaded = true;
                        // showFlashError('camp_step3_91_error');
                        return false;
                    }
                    else if (step) {
                        if (step == 'listing') {
                            var $url_hash = '#sent_c';
                            switch (TYPE) {
                                case 'sms':
                                    $url_hash = '#sent_s';
                                    break;

                                case 'template':
                                    $url_hash = '#temp_active_m';
                                    break;

                                case 'trigger':
                                    $url_hash = '#sent_t';
                                    break;

                                default:
                                    $url_hash = '#sent_c';
                                    break;
                            }
                            // window.location = SITE_BASE_URL + "camp/"+step+ACCESS_TOKEN_URL+$url_hash;
                        }
                        else {
                            // window.location = SITE_BASE_URL + "camp/"+step+'/type/'+TYPE+'/id/'+ID+ACCESS_TOKEN_URL;
                        }
                    }
                }
        }.bind(this))


    }
  render() {
    let campaignData = this.props.campaignData;
    var excludeListBlock  = this.state.isExeListVisible ? <ComponentFolderListRender translate={this.props.translate} listData={this.state.listData} listType="exclude" campaignData = {this.props.campaignData}  />:"";
    // var advanceSearchBlock  = this.state.isAdvancedSearchVisible ?<ComponentRecipientsAdvancedSearch  htmlData ={this.state.htmlData} />:"";
    var advanceSearchBlock  = <ComponentRecipientsAdvancedSearch  htmlData ={this.state.htmlData} />;
    var triggerHtml  = (campaignData.type=="trigger"?<ComponentRecipientsTrigger updateReoccuring = {this.updateReoccuring} />:"") ;

    var displayClass = "";
    if(!this.state.isAdvancedSearchVisible)
    {
        displayClass = "hidden";
    }
    let translate = this.props.translate;
    return (
        <div className="well p-l-lg p-r-lg m-b-md">
            <div className="spacer-bottom">

                <p className="m-b-xs"><b>{translate('recipient_index_1_label')}</b></p>

                <p className="text-muted small">{translate('recipient_index_2_label')}</p>

            </div>

            <div className="spacer-bottom">

                <ComponentFolderListRender translate={this.props.translate} listData={this.state.listData} listType="include" campaignData = {this.props.campaignData} selectedContactObj={this.state.selectedContactObj} excludedContactObj={this.state.excludedContactObj} updateSelectedContact = {this.updateSelectedContact} />

            </div>


            <div className="checkbox m-b-rg">
                <label>
                    <input type="checkbox" ref="advancecheckbox" onClick={this.toggleAdvanBlock.bind(this)}/>
                    <span className="check-indicator"></span>
                    <b>{translate('recipient_index_3_label')}</b>
                </label>
            </div>
            <div ref="search_container" className={displayClass}>
                {advanceSearchBlock}
                </div>
            <hr />
            <div className="spacer-bottom">

                {triggerHtml}

            </div>

             <div className="clearfix"></div>

        </div>
    );
  }
}

CreationRecipients.propTypes = {
    campaignData: PropTypes.object,
    selectedContactObj: PropTypes.object,
    excludedContactObj: PropTypes.object,
    updateSelectedContact: PropTypes.object,
    translate: PropTypes.func,
    handelSubmit: PropTypes.func
};

export default CreationRecipients;
