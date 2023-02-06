import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SingleWithClearAutoComplete from "../../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import RegularSelect from "../../../../Common/components/Select/RegularSelect";


import { attemptToFetchDistribution, resetFetchDistributionState } from "../../../../store/actions/distributionAction";
import { attemptToFetchPatient, resetFetchPatientState } from "../../../../store/actions/patientAction";
import { distributionListStateSelector } from "../../../../store/selectors/distributionSelector";
import { patientListStateSelector } from "../../../../store/selectors/patientSelector";
import { ACTION_STATUSES, DCH_YEARS } from "../../../../utils/constants";
let isDoneYear = false;
let numberOfMonth = 0;
let numberOfProcess = 1;
let data = [];
let patientList = [];
let grandTotal = 0.0;
const ClientDistribution = (props) => {

    const [isProcessCollection, setIsProcessCollection] = useState(true);
    const [summary,setSummary] = useState([]);
    useEffect(() => {
        data = [];
        numberOfProcess = 0;
        numberOfMonth = DCH_YEARS.length;
        console.log('Year to call1', numberOfMonth,DCH_YEARS[numberOfProcess]);
        props.listPatients();
        props.listDistributions({ from: DCH_YEARS[numberOfProcess].from, to: DCH_YEARS[numberOfProcess].to });
        //start with 2022

    }, []);
    useEffect(() => {
        if (!isProcessCollection && props.distributions.status === ACTION_STATUSES.SUCCEED) {
            const record = [...props.distributions.data];
            console.log('[record]',record[0],record.length,DCH_YEARS[numberOfProcess])
            
            data.push({ numberOfRecord: record.length, data: [...record],query:DCH_YEARS[numberOfProcess] });
            numberOfProcess += 1;
            props.resetListDistributions();
            
            if (numberOfProcess < numberOfMonth) {
                setIsProcessCollection(true);
                console.log('Year to call2', DCH_YEARS[numberOfProcess]);
                props.listDistributions({ from: DCH_YEARS[numberOfProcess].from, to: DCH_YEARS[numberOfProcess].to });
            } else {
                console.log('[Final Data]',data);
                grandTotal = 0.0;
                const recs = [];
                for(const d of data) {
                    const amts = d.data.map(map => map.estimated_total_amt);
                    let patients = d.data.map(map => map.patient_id);
                    patients =  Array.from(new Set(patients));
                    let grand = 0.0;
                    amts.forEach(a => {
                        grand += parseFloat(a || 0.0);
                    })
                    grandTotal += grand;
                    recs.push({
                        range : `${d.query.from} to ${d.query.to}`,
                        cnt : d.data.length,
                        patientCnt : patients.length,
                        total : parseFloat(grand | 0.0).toFixed(2)
                    })
                }
                setSummary(recs);
            }

        }
    }, [isProcessCollection]);


    if (isProcessCollection && props.distributions && props.distributions.status === ACTION_STATUSES.SUCCEED) {

        setIsProcessCollection(false);



    }

   
     
    console.log('[report data]', data);
    return (
        <React.Fragment>
            <Grid justifyContent="space-between" container style={{padding:10}}>
                <Typography variant="h5">Patients/DCH Staff Distribution Report</Typography>
                <Typography variant="h5" color="primary">{`$${parseFloat(grandTotal).toFixed(2)}`}</Typography>
            </Grid>
            <Grid justifyContent="space-between" container style={{padding:10}}>
            <Typography variant="body1" color="textSecondary">*** This report includes all supplies that were given to patient or DCH staff ***</Typography>
            </Grid>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date Range</TableCell>
                        <TableCell>Number Of Records/Items</TableCell>
                        <TableCell>Number Of Recipients (Patient/DCH Staff)</TableCell>
                        <TableCell>Total Amount</TableCell>
                       
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {summary && summary.length ? 
             summary.map(m => {
                return (
                          <TableRow key={m.range}>
                            <TableCell component="th" scope="row">
                              {m.range}
                            </TableCell>
                            <TableCell>{m.cnt}</TableCell>
                            <TableCell>{m.patientCnt}</TableCell>
                            <TableCell>{`$${m.total}`}</TableCell>
                            
                          </TableRow>
                        )
                      })
                      : null }
                    </TableBody>
                  </Table>
                
                <Grid container>
                    <Typography variant="h6">View Patient History</Typography>

                </Grid>
        
        </React.Fragment>
    )
}
const mapStateToProps = store => ({
    patients: patientListStateSelector(store),
    distributions: distributionListStateSelector(store),


});

const mapDispatchToProps = dispatch => ({
    listDistributions: (data) => dispatch(attemptToFetchDistribution(data)),
    resetListDistributions: () => dispatch(resetFetchDistributionState()),
    listPatients: (data) => dispatch(attemptToFetchPatient(data)),
    resetListPatients: () => dispatch(resetFetchPatientState()),

});

export default connect(mapStateToProps, mapDispatchToProps)(ClientDistribution);

