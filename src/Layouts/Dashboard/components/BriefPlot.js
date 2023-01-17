import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import React from "react"

const BriefPlot = (props) => {

return (
    <React.Fragment>
    <Grid container direction="row">
              <Typography variant="h5">BRIEF PLOT</Typography>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Patient Name</TableCell>
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
                  {props.patientPlot && props.patientPlot.length && props.patientPlot.map(map => {
                    return (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {map.patientName}
                        </TableCell>
                        <TableCell>{map.briefProduct}</TableCell>
                        <TableCell>{map.briefVendor}</TableCell>
                        <TableCell>{map.briefSize}</TableCell>
                        <TableCell>{map.briefQty}</TableCell>
                        <TableCell>{map.briefThreshold}</TableCell>
                        <TableCell>{map.briefCurrentStock}</TableCell>
                        <TableCell>{map.briefBalance}</TableCell>
                        <TableCell>{map.briefOrder || 0}</TableCell>

                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Grid>
            < br />
            <Grid container direction="row">
              <Typography variant="h5">BRIEF SUMMARY</Typography>
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
                  {props.briefSummary && props.briefSummary.length && props.briefSummary.map(map => {
                    return (
                      <TableRow>
                        <TableCell>{map.briefProduct}</TableCell>
                        <TableCell>{map.briefVendor}</TableCell>
                        <TableCell>{map.briefSize}</TableCell>
                        <TableCell>{map.total}</TableCell>
                        <TableCell>{map.carton}</TableCell>
                        <TableCell>{`$${map.amt}`}</TableCell>

                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Grid>
            <Typography variant="h5">Estimated Grand Amt (no tax/shipping) : {`$${props.estimatedBriefGrandTotal || ''}`}</Typography>
            < br />
            <Grid container direction="row">
              <Typography variant="h5">UNUSED SIMILAR BRIEF ITEMS</Typography>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Vendor</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Qty On Hand</TableCell>


                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.unusedBriefSummary && props.unusedBriefSummary.length && props.unusedBriefSummary.map(map => {
                    return (
                      <TableRow>
                        <TableCell>{map.product}</TableCell>
                        <TableCell>{map.vendor}</TableCell>
                        <TableCell>{map.size}</TableCell>
                        <TableCell>{map.qty}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Grid>
            
            </React.Fragment>

)
}
export default BriefPlot;