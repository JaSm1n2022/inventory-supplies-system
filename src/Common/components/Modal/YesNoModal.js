import React, { useState} from 'react';
import { makeStyles} from '@mui/styles';
import { Button } from '@mui/material';
import {
  Modal,
  } from '@mui/material';



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
    minWidth: 300,

    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    
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

export default function YesNoModal(props) {
  const {
   noHandler,
   yesHandler,
   description,
   isOpen
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
        <div className="form-field">
                                    <label htmlFor="">{description}</label>
                                    <br />
                                    <div className="form-field">
                                      <Button variant="contained" color="secondary" onClick={() => noHandler()}> No</Button>
                                      <span>&nbsp;&nbsp;</span>
                                      <Button variant="contained" color="primary" onClick={() => yesHandler()}>Yes</Button>
                                    </div>
                                    <br />
                                  </div>

    </div>
  );

  return (
    <div>
      <Modal
        fullWidth={true}
        maxWidth={'300px'}
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