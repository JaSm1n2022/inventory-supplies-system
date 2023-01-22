
import {  Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";

import GeneralChart from "./GeneralChart";
import ProviderChart from "./ProviderChart";



class SupplyExpensesReport extends React.Component {

  render() {
    const { transactionDashboard, providerDashboard, dateFrom, dateTo } = this.props;



    return (
      <React.Fragment>
        <Grid container  style={{ width: '1200px', height: '800px', paddingLeft: 20 }}>
          <Grid item xs={12} align="center" style={{ paddingTop: 40, paddingBottom: 40 }}>
            <Typography variant="h5">Supplies Expenses Report</Typography>
            <Typography variant="body">{`(${dateFrom} To ${dateTo})`}</Typography>
            <Typography variant="h6" style={{ color: 'blue', fontWeight: 'bold' }}>{`Grand Total: $${parseFloat(providerDashboard.expenses).toFixed(2)}`}</Typography>
          </Grid>

          <Grid item xs={12}  style={{ paddingTop: 20 }} >
            <Grid container   direction="row" spacing={3}>
              
              <Grid item xs={4} style={{ paddingTop: 10,paddingLeft:80 }}>
              <Typography>Distribution by Category</Typography>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>

                      <TableCell style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">CATEGORY</TableCell>
                      <TableCell style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">AMOUNT</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">OFFICE EXPENSES</TableCell>
                      <TableCell style={{ height: 'auto !important', border: 'solid 1px black' ,fontWeight:'bold'}} component="th" scope="row">{`$${parseFloat(transactionDashboard.office).toFixed(2)}`}</TableCell>

                    </TableRow>
                    <TableRow>
                      <TableCell style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">PATIENT EXPENSES</TableCell>

                      <TableCell style={{ height: 'auto !important', border: 'solid 1px black' ,fontWeight:'bold' }} component="th" scope="row">{`$${parseFloat(transactionDashboard.client).toFixed(2)}`}</TableCell>
                    </TableRow>

                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={5} style={{ paddingTop: 0 }}>
                <GeneralChart labels={['OFFICE', 'PATIENTS']} series={transactionDashboard.series} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} style={{ paddingTop: 20 }}>
            <Grid container direction="row" spacing={3}>
          
              <Grid item xs={4} style={{ paddingTop: 10,paddingLeft:80 }}>
              <Typography>Distribution by Provider</Typography>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>

                      <TableCell style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">PROVIDER</TableCell>
                      <TableCell style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">AMOUNT</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">MEDLINE</TableCell>
                      <TableCell style={{ height: 'auto !important', border: 'solid 1px black' ,fontWeight:'bold' }} component="th" scope="row">{`$${parseFloat(providerDashboard.medline).toFixed(2)}`}</TableCell>

                    </TableRow>
                    <TableRow>
                      <TableCell style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">MCKEESON</TableCell>

                      <TableCell style={{ height: 'auto !important', border: 'solid 1px black' ,fontWeight:'bold' }} component="th" scope="row">{`$${parseFloat(providerDashboard.mckesson).toFixed(2)}`}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">AMAZON</TableCell>

                      <TableCell style={{ height: 'auto !important', border: 'solid 1px black' ,fontWeight:'bold' }} component="th" scope="row">{`$${parseFloat(providerDashboard.amazon).toFixed(2)}`}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">OTHERS</TableCell>

                      <TableCell style={{ height: 'auto !important', border: 'solid 1px black' ,fontWeight:'bold' }} component="th" scope="row">{`$${parseFloat(providerDashboard.other).toFixed(2)}`}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={5} style={{ paddingTop: 0 }}>
              <ProviderChart   height={500} labels={['AMAZON', 'MEDLINE', 'MCKESSON', 'OTHER']} series={providerDashboard.series} />
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>





      </React.Fragment>

    )
  }
}
export default SupplyExpensesReport;