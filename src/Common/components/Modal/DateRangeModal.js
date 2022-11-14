import React, { useState } from 'react';
import { makeStyles, withStyles } from '@mui/styles';
import { Button, Grid, Paper, Typography } from '@mui/material';
import {
  Modal,
} from '@mui/material';
import RegularDatePicker from '../Date/RegularDatePicker';




function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    margin: 'auto',
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    minWidth: 600,

    backgroundColor: 'white',
    border: '2px solid #000',
    
    overflowX: 'auto'
  },

}));


/*** 
 * Author 
 * Nargel Velasco - Tech Team
 * @param {Object} data - header and rows data
 * @param {Function} exportHandler - handle export function
 * @param {Function} closeModal - close modal 
 * @param {Function} isOpen - open modal if true
 * 
*/

export default function DateRangeModal(props) {
  const {
    noHandler,
    yesHandler,
    description,
    isOpen,
    dateFrom,
    dateTo,
    shipmentNbr,
    category,
  } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [to, setTo] = useState(dateTo ? new Date(`${dateTo} 00:00`) : new Date());
  const [from, setFrom] = useState(dateFrom ? new Date(`${dateFrom} 00:00`) : new Date());
  const dateInputHandler = (name,value) => {
    switch (name) {
      case "to":
        setTo(value);
        return;
      case "from":
        setFrom(value);
        return;
      default:
        return;
    }
  }
  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
       <Paper elevation={2} style={{paddingLeft:10,paddingRight:10,paddingTop:10}}> 
        <Typography>{shipmentNbr || ''}</Typography>
        <label htmlFor="">{category || ''} {description}</label>
        <br />
        <Grid spacing={1} container xs={12} direction="row" style={{paddingTop:10}}>
          <Grid xs={5} item style={{alignItems:'center'}}>
            <RegularDatePicker name={'from'} value={from || dateFrom} onChange={dateInputHandler} label={'Start'}/>
          </Grid>
          <Grid xs={1} item style={{alignItems:'center'}}>
            to
          </Grid>
          <Grid xs={5} item style={{alignItems:'center'}}>
            <RegularDatePicker name={'to'} value={to || dateTo} onChange={dateInputHandler} label={'End'}/>
          </Grid>
        </Grid>
        <br />
        <div className="form-field">
          <Button variant="contained" color="secondary" onClick={() => noHandler()}> Cancel</Button>
          <span>&nbsp;&nbsp;</span>
          <Button variant="contained" color="primary" onClick={() => yesHandler(from,to)}>Apply</Button>
        </div>
        <br />
      </Paper>
    </div>
  );
console.log('[Date]',dateTo,dateFrom);
  return (
    <div>
      <Modal
        fullWidth={true}
        maxWidth={'600px'}
        maxHeight={'200px'}
        open={isOpen ? true : false}
        onClose={handleClose}
        aria-labelledby="yn-modal"
        aria-describedby="yes-or-no"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {body}
      </Modal>
    </div>
  );
}