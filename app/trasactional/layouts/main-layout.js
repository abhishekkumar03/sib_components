import React, { Component } from 'react';
import {browserHistory} from 'react-router';
class MainLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templatesData: []
        }
    }

    componentWillMount() {
        // TODO : set initial data here
    }

    // TODO : function to save data
    handelSubmit(dataToSave) {
    }

    // TODO : function to localize content
    translate(transVariable, options) {
        options = options||[];
        if (typeof($.t) == 'function') {
            transVariable = $.t(transVariable, options);
            return <span dangerouslySetInnerHTML={{__html: transVariable}} />;
        }
        return '';
    }
    
    render() {
        let contentData = content && React.cloneElement(content, {
            templatesData: this.state.templatesData,
            translate: this.translate,
            handelSubmit: this.handelSubmit,
        });

        return (
            <div className="container-fluid fade in fade-load" id="main-container">                
                {/* begin #main-content */}
                {alertDisplay}
                
                <div id="main-content">
                    
                    {/* begin #header */}
                    {this.props.header}
                    {/* end #header */}
                        
                    {/* begin #content */}
                    <div id="content">
                        {/* begin .row */}
                        <div className="row">
                            {/* begin .col */}
                            <div className="col-md-12">
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

export default MainLayout;
