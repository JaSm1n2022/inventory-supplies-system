import { Button, Grid } from "@mui/material";
import React, { useRef } from "react";

import ReactToPrint from "react-to-print";
import CardHistoryReport from "./CardHistoryReport";
import CardTransaction from "./CardTransaction";
import ClientExpensesReport from "./ClientExpensesReport";
import SupplyExpensesReport from "./SupplyExpensesReport";


export default function PrintReport(props) {
    let componentRef = useRef();
  
    return (
      <>
        <div>
          {/* button to trigger printing of target component */}
      <ReactToPrint
            trigger={() => <Button variant="contained" color="primary">Print/Download Report</Button>}
            content={() => componentRef}
          />
  
          {/* component to be printed */}
          {props.source === 'clientExpensesReport' ? 
          <ClientExpensesReport ref={(el) => (componentRef = el)} clientExpensesAmt={props.clientExpensesAmt} patientDashboard={props.patientDashboard} numberActive={props.numberActive} numberInactive={props.numberInactive} dateFrom={props.dateFrom} dateTo={props.dateTo}/>
          : props.source === 'supplyExpensesReport' ?
          <SupplyExpensesReport ref={(el) => (componentRef = el)} transactionDashboard={props.transactionDashboard}  providerDashboard={props.providerDashboard} dateFrom={props.dateFrom} dateTo={props.dateTo}/>
          : props.source === 'cardHistoryReport' ?
          <CardHistoryReport ref={(el) => (componentRef = el)}  details={props.details} dateFrom={props.dateFrom} dateTo={props.dateTo}/>
        : null}
          </div>
      </>
    );
  }