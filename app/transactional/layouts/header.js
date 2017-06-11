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
import React, { Component } from 'react';
class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="header">

                {/* begin .row */}
                <div className="row">

                    {/* begin .col */}
                    <div className="col-md-12 clearfix">
                        <div className="">
                            <div className="pull-right">
                                <a className="btn btn-ghost m-l-sm" href="javascript:void(0);"><i className="fa fa-power-off"></i> Create Template</a>
                            </div>
                            <h2>
                                <span className="sib-logo-symbol logo-primary m-r-xs"></span>
                                <b>Transactional Templates</b> › <small>Listing</small>
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

export default Header;
