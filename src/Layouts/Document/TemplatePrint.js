import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";

import Hospice from '../../assets/images/logo/logo2.png';
import styles from "./distribution.module.css";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    tableRow: {
        height: 20
    }

});
const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const TemplatePrint = (props) => {
    const [general, setGeneral] = useState(undefined);
    const [details, setDetails] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        setGeneral(props.general);
        setDetails(props.details);
    }, [props]);
    const unitDistributionHandler = (qty,unit) => {
        if (unit && unit === 'Pcs' && qty < 2) {
            return `${qty} Pc`;
        } 
            return `${qty} ${unit}`;
       
    }
    return (
        <React.Fragment>
            {general &&
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

                                        <TableRow sx={{

                                            "& th": {
                                                fontSize: "10px",

                                                height: 10
                                            }
                                        }}>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                Patient Name : {general.patientName || ''}
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">Date prepared: </TableCell>

                                        </TableRow>
                                        <TableRow sx={{

                                            "& th": {
                                                fontSize: "10px",

                                                height: 10
                                            }
                                        }}>


                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                Facility/POS : N/A
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">Date pick-up:</TableCell>

                                        </TableRow>
                                    </TableBody>
                                </Table>

                            </div>
                            <div style={{ paddingLeft: 10, paddingRight: 50, paddingBottom: 20 }}>

                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow sx={{

                                            "& th": {
                                                fontSize: "10px",

                                                height: 10
                                            }
                                        }}>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">#</TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">Description</TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">Units</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {items.map(map => {
                                            return (



                                                <TableRow sx={{
                                                    "& th": {
                                                        fontSize: "12px",

                                                        height: 10
                                                    }
                                                }}>
                                                    <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                        {map + 1}
                                                    </TableCell>
                                                    <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                        <small>{details && details.length && details.length > map ? details[map].search.shortDescription : ''}</small>
                                                    </TableCell>
                                                    <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                        <Typography variant="bold1">{details && details.length && details.length > map ? unitDistributionHandler(details[map].orderQty,details[map].search.unitDistribution||'') : ''}</Typography>
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

                                            <TableRow sx={{

                                                "& th": {
                                                    fontSize: "10px",

                                                    height: 10
                                                }
                                            }}>
                                                <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                    Patient Name : {general.patientName || ''}
                                                </TableCell>
                                                <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">Date prepared: </TableCell>

                                            </TableRow>
                                            <TableRow sx={{

                                                "& th": {
                                                    fontSize: "10px",

                                                    height: 10
                                                }
                                            }}>


                                                <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                    Facility/POS : N/A
                                                </TableCell>
                                                <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">Date pick-up:</TableCell>

                                            </TableRow>
                                        </TableBody>
                                    </Table>

                                </div>

                                <div style={{ paddingLeft: 10, paddingRight: 50, paddingBottom: 20 }}>

                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow sx={{

                                                "& th": {
                                                    fontSize: "10px",

                                                    height: 10
                                                }
                                            }}>
                                                <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">#</TableCell>
                                                <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">Category</TableCell>
                                                <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">Description</TableCell>
                                                
                                                <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">Units</TableCell>
                                                <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">Size</TableCell>
                                                <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">Vendor</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {items.map(map => {
                                            return (



                                                <TableRow sx={{
                                                    "& th": {
                                                        fontSize: "12px",

                                                        height: 10
                                                    }
                                                }}>
                                                    <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                        {map + 1}
                                                    </TableCell>
                                                    <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                        <small>{details && details.length && details.length > map ? details[map].search.category : ''}</small>
                                                    </TableCell>
                                                    <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                        <small>{details && details.length && details.length > map ? details[map].search.shortDescription : ''}</small>
                                                    </TableCell>
                                                    <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                        <Typography variant="bold1">{details && details.length && details.length > map ? unitDistributionHandler(details[map].orderQty,details[map].search.unitDistribution||'') : ''}</Typography>
                                                    </TableCell>
                                                    <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                        <Typography variant="bold1">{details && details.length && details.length > map ? details[map].search.size || '' : ''}</Typography>
                                                    </TableCell>
                                                    
                                                    <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                        <Typography variant="bold1">{details && details.length && details.length > map ? details[map].search.vendor : ''}</Typography>
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
