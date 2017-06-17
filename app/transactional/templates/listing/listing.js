import React, { Component } from 'react';

class Listing extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
            
                {/* begin .col */}
                <div className="col-md-12">

                    <div className="pane pane-default"> 
                        
                        {/* begin .row */}
                        <div className="row">

                            {/* begin .col */}
                            <div className="col-md-12">
                        
                                <div className="pull-left campselecteall checkbox camp-list-select-btn" style={{marginleft: '5px', display: 'block'}}>
                                    <label>
                                        <input type="checkbox" id="inlineCheckbox1" value="option1" />
                                        <small><b>Select All</b></small>
                                    </label>
                                </div>
                            
                                <div className="pull-left" id="checkaction" style={{display:'none', marginLeft:'10px', marginTop:'8px'}}>
                                    <div className="btn-group">
                                        <a href="#" className="archive_all btn btn-default btn-xs" data-type="classic">
                                            <i className="fa fa-file-archive-o"></i> Archive
                                        </a>
                                    </div> 
                                </div>
                            </div>
                            {/* end .col */}
                            
                        </div>
                        {/* end .row */}

                        <div id="campaign-list">
                            <div id="tab_inn">
                                <div className="camp-list-dash aide_content_wrapper no_tpadding table-responsive">
                                    <table className="table table-hover camp-list table-middle" id="listingTable">
                                        <thead>
                                            <tr>
                                                <th className="td-w-xxxs"></th>
                                                <th className="td-w-xs">id</th>
                                                <th>name</th>
                                                <th></th>
                                                <th className="td-w-lg">Creation Date</th>
                                                <th className="td-w-lg listing-th2">actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="rowdetails">
                                                <td>
                                                    <div className="customfields">
                                                        <input type="checkbox" value="65" name="selectall[]" className="checkbox pull-left rowcheckbox fieldcheckbox check_65"/>
                                                    </div>
                                                </td>
                                                <td className="text-muted">#65</td>
                                                <td>La famille du Grizzly sest agrandi p...</td>
                                                <td></td>
                                                <td className="text-light text-left">
                                                    <span data-original-title="Creation date" data-toggle="tooltip" data-placement="top" className="tooltip-help">24 Oct, 2016 06:53 AM</span>
                                                </td>
                                                <td className="text-right">
                                                    <a className="btn btn-primary btn-sm spacer-right-xxs camp_action" href="javascript:void(0);"><span className="fa fa-pencil"></span> Edit</a>
                                                    <div className="btn-group">
                                                        <a className="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" href="#">Actions <span className="caret"></span> </a>
                                                        <ul className="dropdown-menu text-left pull-right" id="messsage_65">
                                                            <li>
                                                                <a href="templates/preview/id/65" target="_blank" className="camp_action"><i className="fa fa-eye"></i> Preview</a>
                                                            </li>
                                                            <li className="divider" role="presentation"></li>
                                                            <li className="tested_wrapper" id="65">
                                                                <a href="javascript:void(0)" id="tested_65" className="camp_action"><i className="fa fa-share-square-o"></i> Send a test <span className="label label-default"><i className="fa fa-unchecked"></i> Not sent</span></a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className="camp_action replicate_class" data-type="classic"><i className="fa fa-asterisk"></i> Replicate</a>
                                                            </li>
                                                            <li>
                                                                <a className="replicate_class camp_action" href="#" data-type="template">
                                                                    <span className="glyphicon glyphicon-asterisk"></span> Replicate
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="deleteDraft del_template camp_action" href="#" id="deleteDraft_91"><span className="glyphicon glyphicon-trash"></span> Delete</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                </div>
                {/* end .col */}
                
            </div>
        );
    }
}

export default Listing;