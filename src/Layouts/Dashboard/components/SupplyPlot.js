import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import React from "react"

const SupplyPlot = (props) => {

    return (
        <React.Fragment>
        <Grid container direction="row">
                  <Typography variant="h5">{`${props.title.toUpperCase()} PLOT`}</Typography>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Patient Name</TableCell>
                        <TableCell>Requestor</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Vendor</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Last Order</TableCell>
                        <TableCell>Threshold</TableCell>
                        <TableCell>Current Stock</TableCell>
                        <TableCell>Balance</TableCell>
                        <TableCell>Order</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.patientPlot && props.patientPlot.length && props.patientPlot.map((map,indx) => {
                        return (
                          <TableRow key={`patient${indx}`}>
                            <TableCell component="th" scope="row">
                              {map.patientName}
                            </TableCell>
                            <TableCell>{map.requestor}</TableCell>
                            <TableCell>{map.product}</TableCell>
                            <TableCell>{map.vendor}</TableCell>
                            <TableCell>{map.size}</TableCell>
                            <TableCell>{map.qty}</TableCell>
                            <TableCell>{map.threshold}</TableCell>
                            <TableCell>{map.currentStock}</TableCell>
                            <TableCell>{map.balance}</TableCell>
                            <TableCell>{map.order || 0}</TableCell>
    
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </Grid>
                < br />
                <Grid container direction="row">
                  <Typography variant="h5">{`${props.title.toUpperCase()} SUMMARY`}</Typography>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Vendor</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Total Order</TableCell>
                        <TableCell>Number of Carton</TableCell>
                        <TableCell>Estimated Amt</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.summary && props.summary.length && props.summary.map((map,indx) => {
                        return (
                          <TableRow key={`sumary${indx}`}>
                            <TableCell>{map.product}</TableCell>
                            <TableCell>{map.vendor}</TableCell>
                            <TableCell>{map.size}</TableCell>
                            <TableCell>{map.total}</TableCell>
                            <TableCell>{map.carton}</TableCell>
                            <TableCell>{`$${parseFloat(map.amt ||0.00).toFixed(2)}`}</TableCell>
    
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </Grid>
                <Typography variant="h5">Estimated Grand Amt (no tax/shipping) : {`$${parseFloat(props.estimatedGrandTotal || 0.0).toFixed(2)}`}</Typography>
                < br />
                <Grid container direction="row">
                  <Typography variant="h5">{`UNUSED ${props.title.toUpperCase()} SIMILAR ITEMS`}</Typography>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Vendor</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell style={{width:'200px'}}>Qty On Hand</TableCell>
    
    
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.unusedSummary && props.unusedSummary.length ? 
                       props.unusedSummary.map(map => {
                        return (
                          <TableRow>
                            <TableCell>{map.product}</TableCell>
                            <TableCell>{map.vendor}</TableCell>
                            <TableCell>{map.size}</TableCell>
                            <TableCell style={{width:'200px'}}>{map.qty}</TableCell>
                          </TableRow>
                        )
                      }):null}
                    </TableBody>
                  </Table>
                </Grid>
                
                </React.Fragment>
    
    )
    }
export default SupplyPlot;