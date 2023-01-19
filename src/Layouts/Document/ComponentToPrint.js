
import React from "react";
import TemplateMultiplePrint from "./TemplateMultiplePrint";

 
class ComponentToPrint extends React.Component {
  
    render() {
        const {details,general,multiPatients} = this.props;
        
        
        console.log('[Details]',details,general);
        return (
            <React.Fragment>
                {multiPatients && multiPatients.length ?  
                        <TemplateMultiplePrint multiPatients={multiPatients}/>         
                :
                <TemplateMultiplePrint multiPatients={[{general,details}]} />
            }
                </React.Fragment>
        )
    }
}
export default ComponentToPrint;