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
const TemplatePrint = (props) => {
    const [general, setGeneral] = useState(undefined);
    const [details, setDetails] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        setGeneral(props.general);
        setDetails(props.details);
    }, [props]);
    const trimValue = (val) => {
        if (val.length > 100) {
            return val.substring(0, 100);
        }
        return val;

    }
    return (
        <React.Fragment>
            {general &&
                <Grid container style={{ width: '800px', height: '1000px',paddingLeft:20}}>
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
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">Items Description</TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">Pcs</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow sx={{
                                            "& th": {
                                                fontSize: "10px",

                                                height: 10
                                            }
                                        }}>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                1
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <small>{details && details.length && details.length > 0 ? trimValue(`${details[0].category}/${details[0].search.description}`) : ''}</small>
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <Typography variant="bold1">{details && details.length && details.length > 0 ? details[0].orderQty : ''}</Typography>
                                            </TableCell>

                                        </TableRow>
                                        <TableRow sx={{
                                            "& th": {
                                                fontSize: "10px",

                                                height: 10
                                            }
                                        }}>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                2
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <small>{details && details.length && details.length > 1 ? trimValue(`${details[1].category || ''}/${details[1].search.description}`) : ''}</small>
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <Typography variant="bold1">{details && details.length && details.length > 1 ? details[1].orderQty : ''}</Typography>
                                            </TableCell>

                                        </TableRow>
                                        <TableRow sx={{
                                            "& th": {
                                                fontSize: "10px",

                                                height: 10
                                            }
                                        }}>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                3
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <Typography variant="bold1">{details && details.length && details.length > 2 ? trimValue(`${details[2].category}/${details[2].search.description}`) : ''}</Typography>
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <Typography variant="bold1">{details && details.length && details.length > 2 ? details[2].orderQty : ''}</Typography>
                                            </TableCell>

                                        </TableRow>
                                        <TableRow sx={{
                                            "& th": {
                                                fontSize: "10px",

                                                height: 10
                                            }
                                        }}>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                4
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <Typography variant="bold1">{details && details.length && details.length > 3 ? trimValue(`${details[3].category}/${details[3].search.description}`) : ''}</Typography>
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <Typography variant="bold1">{details && details.length && details.length > 3 ? details[3].orderQty : ''}</Typography>
                                            </TableCell>

                                        </TableRow>
                                        <TableRow sx={{
                                            "& th": {
                                                fontSize: "10px",

                                                height: 10
                                            }
                                        }}>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                5
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <Typography variant="bold1">{details && details.length && details.length > 4 ? trimValue(`${details[4].category}/${details[4].search.description}`) : ''}</Typography>
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <Typography variant="bold1">{details && details.length && details.length > 4 ? details[4].orderQty : ''}</Typography>
                                            </TableCell>

                                        </TableRow>
                                        <TableRow sx={{
                                            "& th": {
                                                fontSize: "10px",

                                                height: 10
                                            }
                                        }}>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                6
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <Typography variant="bold1">{details && details.length && details.length > 5 ? trimValue(`${details[5].category}/${details[5].search.description}`) : ''}</Typography>
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <Typography variant="bold1">{details && details.length && details.length > 5 ? details[5].orderQty : ''}</Typography>
                                            </TableCell>

                                        </TableRow>
                                        <TableRow sx={{
                                            "& th": {
                                                fontSize: "10px",

                                                height: 10
                                            }
                                        }}>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                7
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <Typography variant="bold1">{details && details.length && details.length > 6 ? trimValue(`${details[6].category}/${details[6].search.description}`) : ''}</Typography>
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <Typography variant="bold1">{details && details.length && details.length > 6 ? details[6].orderQty : ''}</Typography>
                                            </TableCell>

                                        </TableRow>
                                        <TableRow sx={{
                                            "& th": {
                                                fontSize: "10px",

                                                height: 10
                                            }
                                        }}>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                8
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <Typography variant="bold1">{details && details.length && details.length > 7 ? trimValue(`${details[7].category}/${details[7].search.description}`) : ''}</Typography>
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <Typography variant="bold1">{details && details.length && details.length > 7 ? details[7].orderQty : ''}</Typography>
                                            </TableCell>

                                        </TableRow>
                                        <TableRow sx={{
                                            "& th": {
                                                fontSize: "10px",

                                                height: 10
                                            }
                                        }}>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                9
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <Typography variant="bold1">{details && details.length && details.length > 8 ? trimValue(`${details[8].category}/${details[8].search.description}`) : ''}</Typography>
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <Typography variant="bold1">{details && details.length && details.length > 8 ? details[8].orderQty : ''}</Typography>
                                            </TableCell>

                                        </TableRow>
                                        <TableRow sx={{
                                            "& th": {
                                                fontSize: "10px",

                                                height: 10
                                            }
                                        }}>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                10
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <Typography variant="bold1">{details && details.length && details.length > 9 ? trimValue(`${details[9].category}/${details[8].search.description}`) : ''}</Typography>
                                            </TableCell>
                                            <TableCell style={{ border: 'solid 1px black' }} component="th" scope="row">
                                                <Typography variant="bold1">{details && details.length && details.length > 9 ? details[9].orderQty : ''}</Typography>
                                            </TableCell>

                                        </TableRow>

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
