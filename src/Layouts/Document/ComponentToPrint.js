
import React from "react";
import TemplateMultiplePrint from "./TemplateMultiplePrint";

import TemplatePrint from "./TemplatePrint";

 
class ComponentToPrint extends React.Component {
  
    render() {
        const {details,general,multiPatients} = this.props;
        
        
        console.log('[Details]',details,general);
        return (
            <React.Fragment>
                {multiPatients && multiPatients.length ?  
                        <TemplateMultiplePrint multiPatients={multiPatients}/>         
                :
                <TemplatePrint general={general} details={details} />
            }
                </React.Fragment>
        )
    }
}
export default ComponentToPrint;