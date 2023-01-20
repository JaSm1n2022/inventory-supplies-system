import { Button, Grid } from "@mui/material";
import React, { useRef } from "react";

import ReactToPrint from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";

export default function PrintChart(props) {
    let componentRef = useRef();
  
    return (
      <>
        <div>
          {/* button to trigger printing of target component */}
      <ReactToPrint
            trigger={() => <Button variant="contained" color="primary">Print</Button>}
            content={() => componentRef}
          />
  
          {/* component to be printed */}
          
          <ComponentToPrint ref={(el) => (componentRef = el)} clientExpensesAmt={props.clientExpensesAmt} patientDashboard={props.patientDashboard} numberActive={props.numberActive} numberInactive={props.numberInactive}/>
          
        </div>
      </>
    );
  }