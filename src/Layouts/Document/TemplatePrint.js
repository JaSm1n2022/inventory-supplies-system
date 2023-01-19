import { Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";

import Hospice from '../../assets/images/logo/logo2.png';
import styles from "./distribution.module.css";
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
const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const TemplatePrint = (props) => {
    const [general, setGeneral] = useState(undefined);
    const [details, setDetails] = useState([]);
    const [prepared, setPrepared] = useState('');
    const [pickup, setPickup] = useState('');
    const classes = useStyles();
    useEffect(() => {
        console.log('[Template Print[', props);
        setGeneral(props.general);
        setDetails(props.details);
    }, [props]);
    const unitDistributionHandler = (qty, unit) => {
        if (unit && unit === 'Pcs' && qty < 2) {
            return `${qty} Pc`;
        }
        return `${qty} ${unit}`;

    }
    const makeCategoryShortHandler = (item) => {
        if(item && item.toLowerCase().startsWith('underwear')) {
            return 'Underwear';
        } else if(item && item.toLowerCase() === 'perineal cleanser') {
            return 'Cleanser';
        } else if (item && item.toLowerCase() === 'condom catheter') {
            return 'Catheter';
        
        } else {
            return item;
        }
    }
    const inputHandler = ({ target }) => {
        if (target.name === 'prepared') {
            setPrepared(target.value)
        } else if (target.name === 'pickup') {
            setPickup(target.value);
        }
    }
    return (
        <React.Fragment>
            {general && details && details.length &&
                <Grid container style={{ width: '800px', height: '1000px', paddingLeft: 20 }}>
                    <Grid item xs={12}>
                        <div style={{ display: 'inline-flex', gap: 10 }}>
                            <img src={Hospice} alt="" style={{ height: '80px', width: '80px' }} />
                            <div style={{ paddingTop: 20 }}>
                                <Typography variant="h5">DIVINE COMPASSION HOSPICE</Typography>
                            </div>
                        </div>
                        <div align="center" style={{ width: '800px', height: '1000px' }}>
                            <Typography variant="h6">SUPPLIES DELIVERY RECORDS</Typography>

                            <div style={{ paddingLeft: 10, paddingRight: 50, paddingBottom: 20 }}>

                                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                                    <TableBody>

                                        <TableRow className={classes.tableRow2}>
                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black', width: '50%' }} component="th" scope="row" >
                                                Patient Name : {general.patientName || ''}
                                            </TableCell>
                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row"><div style={{ display: 'inline-flex' }}><Typography variant="bold1">{`Date Prepared : `}</Typography><TextField variant="standard" inputProps={{
                                                style: {
                                                    height: 16,
                                                    padding: '0 14px',
                                                },
                                            }} value={prepared} name="prepared" onChange={inputHandler} /></div></TableCell>

                                        </TableRow>
                                        <TableRow className={classes.tableRow2}>


                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">
                                                Facility/POS : {general.facility || ''}
                                            </TableCell>
                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row"><div style={{ display: 'inline-flex' }}><Typography variant="bold1">Date Pickup : </Typography><TextField variant="standard" inputProps={{
                                                style: {
                                                    height: 16,
                                                    padding: '0 14px',
                                                },
                                            }} value={pickup} name="pickup" onChange={inputHandler} /></div></TableCell>

                                        </TableRow>
                                    </TableBody>
                                </Table>

                            </div>
                            <div style={{ paddingLeft: 10, paddingRight: 50, paddingBottom: 20 }}>

                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow className={classes.tableRow}>

                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">#</TableCell>
                                            <TableCell className={classes.tableCell} style={{ width: '75%', height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">Description</TableCell>
                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">Units</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {items.map(map => {
                                            return (



                                                <TableRow className={classes.tableRow}>
                                                    <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">
                                                        {map + 1}
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">
                                                        {details && details.length && details.length > map ? details[map].search.shortDescription || details[map].search.short_description : ''}
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">
                                                        {details && details.length && details.length > map ? unitDistributionHandler(details[map].orderQty, details[map].search.unitDistribution || details[map].search.unit_distribution || details[map].unit_distribution) : ''}
                                                    </TableCell>

                                                </TableRow>
                                            )
                                        })}

                                    </TableBody>
                                </Table>
                            </div>

                            <div>
                                <div style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 20 }}>

                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">

                                        <TableBody>

                                            <TableRow style={{ border: 0 }}

                                            >
                                                <TableCell style={{ border: 0 }}>
                                                    <div>{general.requestorName} {general.position ? `(${general.position})` : ''}</div>
                                                    <div>_________________________________________</div>
                                                    <div>Name and Title (DCH)</div>
                                                </TableCell>
                                                <TableCell align="right" style={{ border: 0 }}>
                                                    <div>_________________________________________</div>
                                                    <div>Name of Patient/Caregiver</div></TableCell>

                                            </TableRow>
                                            <TableRow style={{ border: 0 }}

                                            >
                                                <TableCell style={{ border: 0 }}>
                                                    <div>_________________________________________</div>
                                                    <div>Signature</div>
                                                </TableCell>
                                                <TableCell align="right" style={{ border: 0 }}>
                                                    <div>_________________________________________</div>
                                                    <div>Signature</div></TableCell>

                                            </TableRow>

                                        </TableBody>
                                    </Table>
                                    <div align="right">
                                        <Typography variant="body2">CNA/Facility copy</Typography>
                                    </div>

                                </div>


                                {/* second page */}
                                <div style={{ display: 'inline-flex', gap: 10 }}>
                                    <div style={{ paddingTop: 80 }}>
                                        <Typography variant="h5">DIVINE COMPASSION HOSPICE</Typography>
                                    </div>
                                </div>
                                <Typography variant="h6">SUPPLIES DELIVERY RECORDS</Typography>

                                <div style={{ paddingLeft: 10, paddingRight: 50, paddingBottom: 20 }}>

                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">

                                        <TableBody>

                                            <TableRow className={classes.tableRow2}>
                                                <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black', width: '50%' }} component="th" scope="row" >
                                                    Patient Name : {general.patientName || ''}
                                                </TableCell>
                                                <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row"><div style={{ display: 'inline-flex' }}><Typography variant="bold1">{`Date Prepared : `}</Typography><TextField variant="standard" inputProps={{
                                                    style: {
                                                        height: 16,
                                                        padding: '0 14px',
                                                    },
                                                }} value={prepared} name="prepared" onChange={inputHandler} /></div></TableCell>

                                            </TableRow>
                                            <TableRow className={classes.tableRow2}>


                                                <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">
                                                    Facility/POS : {general.facility || ''}
                                                </TableCell>
                                                <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row"><div style={{ display: 'inline-flex' }}><Typography variant="bold1">Date Pickup : </Typography><TextField variant="standard" inputProps={{
                                                    style: {
                                                        height: 16,
                                                        padding: '0 14px',
                                                    },
                                                }} value={pickup} name="pickup" onChange={inputHandler} /></div></TableCell>

                                            </TableRow>
                                        </TableBody>
                                    </Table>

                                </div>

                                <div style={{ paddingLeft: 10, paddingRight: 50, paddingBottom: 20 }}>

                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow className={classes.tableRow}>
                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">#</TableCell>
                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">Category</TableCell>
                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">Description</TableCell>

                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">Units</TableCell>
                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">Size</TableCell>
                                            <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">Vendor</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {items.map(map => {
                                                return (



                                                    <TableRow className={classes.tableRow}>
                                                        <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">
                                                        <small>{map + 1}</small>
                                                        </TableCell>
                                                        <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">
                                                        <small>{details && details.length && details.length > map ? makeCategoryShortHandler(details[map].search.category) : ''}</small>
                                                        </TableCell>
                                                        <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">
                                                           <small>{details && details.length && details.length > map ? details[map].search.shortDescription || details[map].search.short_description : ''}</small> 
                                                        </TableCell>
                                                        <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">
                                                        <small>{details && details.length && details.length > map ? unitDistributionHandler(details[map].orderQty, details[map].search.unitDistribution || '') : ''}</small>
                                                        </TableCell>
                                                        <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">
                                                        <small>{details && details.length && details.length > map ? details[map].search.size || '' : ''}</small>
                                                        </TableCell>

                                                        <TableCell className={classes.tableCell} style={{ height: 'auto !important', border: 'solid 1px black' }} component="th" scope="row">
                                                        <small>{details && details.length && details.length > map ? details[map].search.vendor : ''}</small>
                                                        </TableCell>

                                                    </TableRow>
                                                )
                                            })}

                                        </TableBody>
                                    </Table>
                                </div>

                            </div>
                            <div style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 20 }}>

                                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                                    <TableBody>

                                        <TableRow style={{ border: 0 }}

                                        >
                                            <TableCell style={{ border: 0 }}>
                                                <div>{general.requestorName} {general.position ? `(${general.position})` : ''}</div>
                                                <div>_________________________________________</div>
                                                <div>Name and Title (DCH)</div>
                                            </TableCell>
                                            <TableCell align="right" style={{ border: 0 }}>
                                                <div>_________________________________________</div>
                                                <div>Name of Patient/Caregiver</div></TableCell>

                                        </TableRow>
                                        <TableRow style={{ border: 0 }}

                                        >
                                            <TableCell style={{ border: 0 }}>
                                                <div>_________________________________________</div>
                                                <div>Signature</div>
                                            </TableCell>
                                            <TableCell align="right" style={{ border: 0 }}>
                                                <div>_________________________________________</div>
                                                <div>Signature</div></TableCell>

                                        </TableRow>

                                    </TableBody>
                                </Table>
                                <div align="right">
                                    <Typography variant="body2">Admin copy</Typography>
                                </div>
                            </div>


                        </div>

                    </Grid>

                </Grid>
            }
        </React.Fragment>
    )
}
export default TemplatePrint;
