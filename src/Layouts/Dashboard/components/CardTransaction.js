import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";


import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    tableRow: {
        height: 32
    },
    tableRow2: {
        height: 42
    },
    tableCell: {
        padding: "0px 16px"
    }
});
const CardTransaction = (props) => {
    const [details, setDetails] = useState(undefined);

    const classes = useStyles();
    useEffect(() => {

        setDetails(props.details);
    }, [props]);


    return (
        <React.Fragment>
            {details && details.length &&
                <Grid container style={{ width: '800px', height: '1000px', paddingLeft: 20 }}>
                    <Grid item xs={12} align="center">
                        <div>
                            <div style={{ paddingTop: 100 }} >
                                <Typography variant="h6">CARD PAYMENT HISTORY REPORT</Typography>
                            </div>
                            <div style={{paddingBottom:40}}>
                                <Typography variant="bold" style={{color:'gray'}}>{`${props.dateFrom} to ${props.dateTo}`}</Typography>
                            </div>
                        </div>
                        <div  style={{ width: '800px', height: '1000px' }}>
                        
                            <div style={{ paddingLeft: 10, paddingRight: 50, paddingBottom: 20 }}>

                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow className={classes.tableRow}>

                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">CARD</TableCell>
                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">AMAZON</TableCell>
                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">MEDLINE</TableCell>
                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">MCKEESON</TableCell>
                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">WALMART</TableCell>
                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">OTHERS</TableCell>
                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">GRAND TOTAL</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {details && details.length && details.map(map => {
                                            return (
                                                <TableRow className={classes.tableRow}>

                                                    <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">{map.info}</TableCell>
                                                    <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">{`$${parseFloat(map.amazon || 0.00).toFixed(2)}`}</TableCell>
                                                    <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">{`$${parseFloat(map.medline || 0.00).toFixed(2)}`}</TableCell>
                                                    <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">{`$${parseFloat(map.mckesson || 0.00).toFixed(2)}`}</TableCell>
                                                    <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">{`$${parseFloat(map.walmart || 0.00).toFixed(2)}`}</TableCell>
                                                    <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">{`$${parseFloat(map.others || 0.00).toFixed(2)}`}</TableCell>
                                                    <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black',color:'blue',fontWeight:'bold' }} component="th" scope="row">{`$${parseFloat(map.grand || 0.00).toFixed(2)}`}</TableCell>
                                                </TableRow>
                                            )
                                        })}

                                    </TableBody>
                                </Table>
                            </div>

                        </div>

                    </Grid>

                </Grid>
            }
        </React.Fragment>
    )
}
export default CardTransaction;
