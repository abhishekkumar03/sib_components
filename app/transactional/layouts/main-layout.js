import React, { Component } from 'react';
import TemplatesHeader from './header';
// Pages
import Listing from '../templates/listing/listing';

class MainLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid fade in fade-load" id="main-container">                
                {/* begin #main-content */}
                <div id="main-content">
                    
                    {/* begin #header */}
                    <TemplatesHeader />
                    {/* end #header */}
                        
                    {/* begin #content */}
                    <div id="content">
                        {/* begin .row */}
                        <div className="row">
                            {/* begin .col */}
                            <div className="col-md-12">
                                <Listing />
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

export default MainLayout;
