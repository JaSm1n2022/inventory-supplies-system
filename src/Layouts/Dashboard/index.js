import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Grid, Box,Typography,Tabs,Tab,AppBar } from '@mui/material';
import ClientPieChart from './components/ClientPieChart';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        <Typography variant="h3">DASHBOARD</Typography>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
          <Tab
            style={{fontSize:14}}
            value="one"
            label="CLIENT EXPENSES REPORT"
            wrapped
            {...a11yProps('one')}
          />
          <Tab value="two" style={{fontSize:14}} label="TOTAL EXPENSES VS BUDGET" {...a11yProps('two')} />
          <Tab value="three" style={{fontSize:14}} label="OTHER" {...a11yProps('three')} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
      <Grid container style={{ paddingLeft: 10, paddingRight: 10 }} direction="row">
                <Grid container style={{ paddingBottom: 20 }}>
                    <Typography variant="h3">Client's Expenses Report (09/20/2020 - 09/30/2020)</Typography>

                </Grid>
                <Grid container direction="row">

                    <Grid item xs={4}>
                        <div align="center">
                            <Typography variant="h6">JOHN DOE - $1500.00</Typography>
                        </div>
                        <div>
                            <ClientPieChart />
                        </div>
                    </Grid>

                    <Grid item xs={4}>
                        <div align="center">
                            <Typography variant="h6">JOHN DOE 2 - $500.00</Typography>
                        </div>
                        <div>
                            <ClientPieChart />
                        </div>
                    </Grid>

                    <Grid item xs={4}>
                        <div align="center">
                            <Typography variant="h6">JOHN DOE 3 - $600.00</Typography>
                        </div>
                        <div>
                            <ClientPieChart />
                        </div>

                    </Grid>
                    <Grid item xs={4}>
                        <div align="center">
                            <Typography variant="h6">JOHN DOE 4 - $600.00</Typography>
                        </div>
                        <div>
                            <ClientPieChart />
                        </div>

                    </Grid>
                    <Grid item xs={4}>
                        <div align="center">
                            <Typography variant="h6">JOHN DOE 5 - $600.00</Typography>
                        </div>
                        <div>
                            <ClientPieChart />
                        </div>

                    </Grid>
                    <Grid item xs={4}>
                        <div align="center">
                            <Typography variant="h6">JOHN DOE 6 - $600.00</Typography>
                        </div>
                        <div>
                            <ClientPieChart />
                        </div>

                    </Grid>
                </Grid>
            </Grid>
      </TabPanel>
      <TabPanel value={value} index="two">
        Item Two
      </TabPanel>
      <TabPanel value={value} index="three">
        Item Three
      </TabPanel>
    </div>
  );
}




