import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, Tabs, Tab, AppBar, CircularProgress } from '@mui/material';
import ClientPieChart from './components/ClientPieChart';
import { patientListStateSelector } from '../../store/selectors/patientSelector';
import { distributionListStateSelector } from '../../store/selectors/distributionSelector';
import { attemptToFetchPatient, resetFetchPatientState } from '../../store/actions/patientAction';
import { attemptToFetchDistribution, resetFetchDistributionState } from '../../store/actions/distributionAction';
import { connect } from 'react-redux';
import { LocalDining } from '@mui/icons-material';
import { useEffect } from 'react';
import { ACTION_STATUSES } from '../../utils/constants';

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

  },
}));

let isDistributionListDone = false;
let isPatientListDone = false;
let patientList = [];
let distributionList = [];
let patientDashboard = [
  {
    name: '',
    totalAmt : 0.0,
    series : []
  }
];

const Dashboard = (props) => {
  const {listPatients,listDistributions,resetListPatients,resetListDistribution,patients,distributions} = props;
  const classes = useStyles();
  const [value, setValue] = React.useState('one');
  const [isPatientCollection, setIsPatientCollection] = useState(true);
  const [isDistributionCollection, setIsDistributionCollection] = useState(true);
  
  useEffect(() => {
    listPatients();
  },[]);

  useEffect(() => {
     if(!isPatientCollection && patients.status === ACTION_STATUSES.SUCCEED) {
       resetListPatients();
       setIsPatientCollection(true);
     }
     if(!isDistributionCollection && distributions.status === ACTION_STATUSES.SUCCEED) {
      resetListDistribution();
      setIsDistributionCollection(true);
     }
  },[isPatientCollection,isDistributionCollection]);
  

  console.log('[Dashboard Patient List]',patients);
  console.log('[Dashboard Distribution List]',distributions);
  if(isPatientCollection && patients && patients.status === ACTION_STATUSES.SUCCEED) {
    setIsPatientCollection(false);
    isDistributionListDone = false;
    isPatientListDone = true;
    patientList = patients.data || [];
    listDistributions();
  }
  if(isDistributionCollection && distributions && distributions.status === ACTION_STATUSES.SUCCEED) {
    isDistributionListDone = true;
    setIsDistributionCollection(false);
    distributionList = distributions.data || [];
    console.log('[Patient Data]',patientList);
    console.log('[Patient Data2]',distributionList);
   
    patientDashboard = [];
    patientList.forEach(patient => {
      let estimatedAmt = 0.0;
      const supplies = distributionList.filter(dist => dist.patient_id === patient.id);
      console.log('[Supplies]',supplies);
      supplies.forEach(supply => {
        estimatedAmt += parseFloat(supply.estimated_total_amt);
      })
      const seriesList = {
        brief : 0,
        underwear: 0,
        underpad : 0,
        lotion: 0,
        other : 0,
  
      };
      const others = supplies.filter(supply => !['Brief','Underwear/Pull-ups','Underpads','Lotion','Cleanser','Ointment','Cream'].includes(supply.category));
      const briefs = supplies.filter(supply => supply.category === 'Brief');
      const underwears = supplies.filter(supply => supply.category === 'Underwear/Pull-ups');
      const underpads = supplies.filter(supply => supply.category === 'Underpads');
      const lotions = supplies.filter(supply => ['Lotion','Cleanser','Ointment','Cream'].includes(supply.category));
      if(others && others.length) {
        others.forEach(item => {
          seriesList.other = parseFloat(parseFloat(seriesList.other) + parseFloat(item.estimated_total_amt)).toFixed(2);
        })
      }
      if(briefs && briefs.length) {
        briefs.forEach(item => {
          seriesList.brief = parseFloat(parseFloat(seriesList.brief) + parseFloat(item.estimated_total_amt)).toFixed(2);
        })
      }
      if(underwears && underwears.length) {
        underwears.forEach(item => {
          seriesList.underwear = parseFloat(parseFloat(seriesList.underwear) + parseFloat(item.estimated_total_amt)).toFixed(2);
        })
      }
      if(underpads && underpads.length) {
        underpads.forEach(item => {
          seriesList.underpad = parseFloat(parseFloat(seriesList.underpad) + parseFloat(item.estimated_total_amt)).toFixed(2);
        })
      }
      if(lotions && lotions.length) {
        lotions.forEach(item => {
          seriesList.lotion = parseFloat(parseFloat(seriesList.lotion) + parseFloat(item.estimated_total_amt)).toFixed(2);
        })
      }
      patientDashboard.push({
        name : patient.name,
        estimatedAmt,
        series : [parseFloat(seriesList.underpad),parseFloat(seriesList.brief),parseFloat(seriesList.underwear),parseFloat(seriesList.lotion), parseFloat(seriesList.other)]

      })
    })
    //make data
    
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log('[series]',patientDashboard);
  return (
    <div className={classes.root}>
      {!isDistributionListDone || !isPatientListDone ?
        <div align="center" style={{ paddingTop: '100px' }}>
          <br />
          <CircularProgress />&nbsp;<span>Loading</span>...
        </div>
        :
        <React.Fragment>
          <Typography variant="h6">DASHBOARD</Typography>
          <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
            <Tab

              value="one"
              label="CLIENT EXPENSES REPORT"
              wrapped
              {...a11yProps('one')}
            />
            <Tab value="two" style={{ fontSize: 14 }} label="TOTAL EXPENSES VS BUDGET" {...a11yProps('two')} />
            <Tab value="three" style={{ fontSize: 14 }} label="OTHER" {...a11yProps('three')} />
          </Tabs>

          <TabPanel value={value} index="one">
            <Grid container style={{ paddingLeft: 10, paddingRight: 10 }} direction="row">
              <Grid container style={{ paddingBottom: 20 }}>
                <Typography variant="h5">Client's Expenses Report</Typography>

              </Grid>
              <Grid container direction="row">
                {patientDashboard.length && patientDashboard.map(map => {
                  return (
                <Grid item xs={4}>
                  <div align="center">
                    <Typography variant="h6">{`${map.name.toUpperCase()} - $${parseFloat(map.estimatedAmt).toFixed(2)}`}</Typography>
                  </div>
                  <div>
                    <ClientPieChart series={map.series}/>
                  </div>
                </Grid>
                )})}
              {/*
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
              */}
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index="two">
          <Typography variant="h1">UNDER CONSTRUCTION!!!</Typography>
          </TabPanel>
          <TabPanel value={value} index="three">
            <Typography variant="h1">UNDER CONSTRUCTION!!!</Typography>
          </TabPanel>
        </React.Fragment>
      }
    </div>
  );
}
const mapStateToProps = store => ({
  patients: patientListStateSelector(store),
  distributions: distributionListStateSelector(store)

});

const mapDispatchToProps = dispatch => ({
  listPatients: (data) => dispatch(attemptToFetchPatient(data)),
  resetListPatients: () => dispatch(resetFetchPatientState()),
  listDistributions: (data) => dispatch(attemptToFetchDistribution(data)),
  resetListDistribution: () => dispatch(resetFetchDistributionState()),


});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);




