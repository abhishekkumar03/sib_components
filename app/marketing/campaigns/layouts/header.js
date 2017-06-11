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
                            <div className="btn-group">
                                <button type="button" className="btn btn-ghost" >test</button>
                                <button type="button" className="btn btn-ghost dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="caret"></span><span className="sr-only">s</span>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a href="javascript:void(0);" >Save</a></li>
                                    <li><a href="javascript:void(0);" >Exit</a></li>
                                </ul>
                            </div>
                            <h2>
                                <span className="sib-logo-symbol logo-primary m-r-xs"></span>
                                <b>Campaign Creation</b> › <small>Setup</small>
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
