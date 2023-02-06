import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import TOAST from '../modules/toastManager';
import { Button, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';
import Hospice from '../assets/images/logo/logo.png';



function Header({
  history
}) {
  const { addToast } = useToasts();
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const open = Boolean(anchorEl);
  //    inboxCnt = Object.keys(messageState.data).length;


  useEffect(() => {
    TOAST.setToastManager(addToast);


  }, []);
  const redirectLink = (link) => {
    history.push(`/${link}`);
  }

  const handleClick = (event) => {
    
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const vendorSettingHandler = () => {
    setAnchorEl(null);
    redirectLink('vendor');

  }
  const facilitySettingHandler = () => {
    setAnchorEl(null);
    redirectLink('location');

  }
  const patientSettingHandler = () => {
    setAnchorEl(null);
    redirectLink('patient');

  }
  const employeeSettingHandler = () => {
    setAnchorEl(null);
    redirectLink('employee');

  }
  const productSettingHandler = () => {
    setAnchorEl(null);
    redirectLink('product');
  }
  const medExpensesHandler = () => {
    setAnchorEl(null);
    redirectLink('clientexpense');
  }
  const officeExpensesHandler = () => {
    
  }

  const suppliesExpensesHandler = () => {
    
  }

  return (
    <React.Fragment>
      <Grid container justifyContent="space-between">
     
          <Grid container justifyContent="space-between">
              <img src={Hospice} alt="" style={{ height: '50px', width: '400px' }}/>
              <div style={{paddingRight:'25px'}}>
              <Typography variant="h5"><strong>SUPPLIES INVENTORY SYSTEM</strong></Typography>
              </div>
          </Grid>
          <Grid>
            <div style={{
              display: 'flex',
              align: 'right',
              gap: '10px',
              paddingBottom: 10,
              paddingTop:4
            }}>
              <Button variant="contained" color="primary" onClick={() => redirectLink('transaction')}>Supply Order Transaction</Button>
              <Button variant="contained" color="primary" onClick={() => redirectLink('stockroom')}>Stock Room Inventory</Button>
              <Button variant="contained" color="primary" onClick={() => redirectLink('distribution')}>Supplies Delivery Record</Button>
              <Button variant="contained" color="primary" onClick={() => redirectLink('invoice')}>Invoice Statement</Button>
              <Button variant="contained" color="primary" onClick={() => redirectLink('dashboard')}>Dashboard</Button>
              <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        endIcon={<SettingsIcon />}
        onClick={handleClick}>
          

                Settings
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={patientSettingHandler}>Patients</MenuItem>
                <MenuItem onClick={facilitySettingHandler}>Location</MenuItem>
                <MenuItem onClick={employeeSettingHandler}>Employees</MenuItem>
                <MenuItem onClick={vendorSettingHandler}>Vendors</MenuItem>
                <MenuItem onClick={productSettingHandler}>Products</MenuItem>

              </Menu>
              <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        endIcon={<SettingsIcon />}
        onClick={handleClick}>
          

                Reports
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={medExpensesHandler}>Medical/Incontinence Expenses</MenuItem>
                <MenuItem onClick={officeExpensesHandler}>Office Expenses</MenuItem>
                <MenuItem onClick={suppliesExpensesHandler}>Supplies Transactions</MenuItem>
             
              </Menu>

            </div>
         
        </Grid>
        <Grid item xs={12}>
          <Divider variant="fullWidth" style={{
            height: '.02em',
            border: 'solid 1px rgba(0, 0, 0, 0.12)'
          }} orientation="horizontal" flexItem />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}


export default withRouter(Header);
