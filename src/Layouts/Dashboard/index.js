import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, Tabs, Tab, AppBar, CircularProgress, Divider } from '@mui/material';
import ClientPieChart from './components/ClientPieChart';
import { patientListStateSelector } from '../../store/selectors/patientSelector';
import { distributionListStateSelector } from '../../store/selectors/distributionSelector';
import { attemptToFetchPatient, resetFetchPatientState } from '../../store/actions/patientAction';
import { attemptToFetchDistribution, resetFetchDistributionState } from '../../store/actions/distributionAction';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { ACTION_STATUSES, DATE_TYPE_SELECTION, DEFAULT_ITEM } from '../../utils/constants';
import SingleWithClearAutoComplete from '../../Common/components/AutoComplete/SingleWithClearAutoComplete';
import { transactionListStateSelector } from '../../store/selectors/transactionSelector';
import { attemptToFetchTransaction, resetFetchTransactionState } from '../../store/actions/transactionAction';
import GeneralChart from './components/GeneralChart';
import Helper from '../../utils/helper';
import DateTypeAutoComplete from '../../Common/components/AutoComplete/DateTypeAutoComplete';
import DateRangeModal from '../../Common/components/Modal/DateRangeModal';
import moment from 'moment';
import { v4 as uuidv4 } from "uuid";
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
let isTransactionDone = false;
let patientList = [];
let patientOptions = [];
let distributionList = [];
let transactionDashboard =
{
  name: 'Invoice',
  expenses: 0,
  series: [0, 0],
  client: 0,
  office: 0
}
let patientGrandTotal = 0.0;
let patientDashboard = [
  {
    name: '',
    totalAmt: 0.0,
    series: []
  }
];
let providerDashboard = [
  {
    name: 'Provider',
    expenses: 0,
    series: [0, 0, 0],
    amazon: 0,
    medline: 0,
   
  }
]
let dateOptions = [];
  let lastDateType = '';
  DATE_TYPE_SELECTION.forEach(c => { dateOptions.push({ ...c, category: 'date' }) });
  
  const dates = Helper.formatDateRangeByCriteriaV2('thisMonth');
const Dashboard = (props) => {
  const { listTransactions, resetlistTransactions, transactions, listPatients, listDistributions, resetListPatients, resetListDistribution, patients, distributions } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState('one');
  const [isPatientCollection, setIsPatientCollection] = useState(true);
  const [isDistributionCollection, setIsDistributionCollection] = useState(true);
  const [isTransactionCollection, setIsTransactionCollection] = useState(true);
  const [patient, setPatient] = useState(DEFAULT_ITEM);
  const [dateFrom, setDateFrom] = useState(dates.from);
  const [dateTo, setDateTo] = useState(dates.to);
  const [dateSelected,setDateSelected] = useState(dateOptions.find(d => d.value === 'thisMonth'));
  const [isDateCustom, setIsDateCustom] = useState(false);

  

  useEffect(() => {
    listPatients();
    
  }, []);

  useEffect(() => {
    if (!isPatientCollection && patients.status === ACTION_STATUSES.SUCCEED) {
      resetListPatients();
      setIsPatientCollection(true);
    }
    if (!isDistributionCollection && distributions.status === ACTION_STATUSES.SUCCEED) {
      resetListDistribution();
      setIsDistributionCollection(true);
    }
    if (!isTransactionCollection && transactions.status === ACTION_STATUSES.SUCCEED) {
      resetlistTransactions();
      setIsTransactionCollection(true);
    }
  }, [isPatientCollection, isDistributionCollection, isTransactionCollection]);


  const autoCompleteInputHander = (item) => {
    if (item.category === 'date') {
        let data = {
            from: '',
            to: ''
        };
        if (item.value !== 'custom') {
            data = Helper.formatDateRangeByCriteriaV2(item.value);
            console.log('[item data]', data);
            setDateFrom(data.from);
            setDateTo(data.to);
          }
     
        setIsDateCustom(item.value === 'custom' || item.dateRange ? true : false);
        setDateSelected(item);
       console.log('[List me]',data,isDistributionCollection);
          isDistributionListDone = false;
        if(data.from) {
        listDistributions({from : data.from || dateFrom,to:data.to||dateTo});
        }
    }

}
const onClearHandler = (name) => {

  if (name === 'dateType') {
      lastDateType = '';
      setDateSelected(DEFAULT_ITEM);
      setDateFrom('');
      setDateTo('');

  }

}
const closeDateModalHandler = () => {

  setIsDateCustom(false);
  setDateSelected(dateOptions.find(e => e.value === lastDateType));

}

const sortByPatientStatus =  (items) => {
  console.log('[items to sort]',items);
  items.sort((a, b) => {
    const tempA = !a.status ? 'ACTIVE' : a.status.toUpperCase();
    const tempB = !b.status ? 'ACTIVE' : b.status.toUpperCase();
    if (tempA < tempB) {
      return -1;
    } if (tempA > tempB) {
      return 1;
    }
    return 0;
  });
  console.log('[return me]',items);
  return items;
};
const addDateHandler = (from, to) => {

  const dt = `${moment(from || new Date()).format('YYYY-MM-DD')} - ${moment(to || new Date()).format('YYYY-MM-DD')}`;

  const options = dateOptions.filter(f => !f.dateRange);
  const etaValue = {

      name: dt,
      value: dt,
      dateRange: dt,
      from,
      to,
      id: uuidv4(),
      label: dt,
      category: 'etdDateType',
      disabled: true
  };
  options.push(etaValue);
  dateOptions = options;
  setIsDateCustom(false);
  setDateSelected(etaValue);
  const _sfrom = from ? moment(new Date(from)).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD');
  const _sTo = to ? moment(new Date(to)).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD');
  setDateFrom(_sfrom);
  setDateTo(_sTo);
  listDistributions({from: _sfrom, to: _sTo });
  
}

  console.log('[Dashboard Patient List]', patients);
  console.log('[Dashboard Distribution List]', distributions,isDistributionCollection);
  if (isPatientCollection && patients && patients.status === ACTION_STATUSES.SUCCEED) {
    setIsPatientCollection(false);
    isDistributionListDone = false;
    isPatientListDone = true;
    patientList = patients.data || [];
    patientList = sortByPatientStatus(patientList);
   // patientList = patientList.filter(f => f.status !== 'Inactive');
   setIsPatientCollection(false);
    listDistributions({from : dateFrom,to:dateTo});
  }
  if (isDistributionCollection && distributions && distributions.status === ACTION_STATUSES.SUCCEED) {
    isDistributionListDone = true;
    patientGrandTotal = 0.0;
    isTransactionDone = false;
    
    distributionList = distributions.data || [];
    console.log('[Patient Data]', patientList);
    console.log('[Patient Data2]', distributionList);

    patientDashboard = [];
    patientList.forEach(patient => {
      let estimatedAmt = 0.0;
      patient.label = patient.name;
      patient.value = patient.name;
      patient.category = 'patient';

      const supplies = distributionList.filter(dist => dist.patient_id === patient.id);
      console.log('[Supplies]', supplies);
      supplies.forEach(supply => {
        estimatedAmt += parseFloat(supply.estimated_total_amt);
      })
      const seriesList = {
        brief: 0,
        underwear: 0,
        underpad: 0,
        lotion: 0,
        other: 0,

      };
      const others = supplies.filter(supply => !['Brief', 'Underwear/Pull-ups', 'Underpads', 'Lotion', 'Cleanser', 'Ointment', 'Cream'].includes(supply.category));
      const briefs = supplies.filter(supply => supply.category === 'Brief');
      const underwears = supplies.filter(supply => supply.category === 'Underwear/Pull-ups');
      const underpads = supplies.filter(supply => supply.category === 'Underpads');
      const lotions = supplies.filter(supply => ['Lotion', 'Cleanser', 'Ointment', 'Cream'].includes(supply.category));
      if (others && others.length) {
        others.forEach(item => {
          seriesList.other = parseFloat(parseFloat(seriesList.other) + parseFloat(item.estimated_total_amt)).toFixed(2);
        })
      }
      if (briefs && briefs.length) {
        briefs.forEach(item => {
          seriesList.brief = parseFloat(parseFloat(seriesList.brief) + parseFloat(item.estimated_total_amt)).toFixed(2);
        })
      }
      if (underwears && underwears.length) {
        underwears.forEach(item => {
          seriesList.underwear = parseFloat(parseFloat(seriesList.underwear) + parseFloat(item.estimated_total_amt)).toFixed(2);
        })
      }
      if (underpads && underpads.length) {
        underpads.forEach(item => {
          seriesList.underpad = parseFloat(parseFloat(seriesList.underpad) + parseFloat(item.estimated_total_amt)).toFixed(2);
        })
      }
      if (lotions && lotions.length) {
        lotions.forEach(item => {
          seriesList.lotion = parseFloat(parseFloat(seriesList.lotion) + parseFloat(item.estimated_total_amt)).toFixed(2);
        })
      }
      patientGrandTotal += estimatedAmt;
      patientDashboard.push({
        status :patient.status,
        name: patient.name,
        label: patient.name,
        value: patient.name,
        cateogry: 'patient',
        estimatedAmt,
        series: [parseFloat(seriesList.underpad), parseFloat(seriesList.brief), parseFloat(seriesList.underwear), parseFloat(seriesList.lotion), parseFloat(seriesList.other)]

      })

    })
    //make data
    patientOptions = [...patientDashboard];
    
    setIsDistributionCollection(false);
    listTransactions({from : dateFrom,to:dateTo});
    
    //listTransactions();
  }
  if (isTransactionCollection && transactions.status === ACTION_STATUSES.SUCCEED) {
    console.log('[Transactions]', transactions);
    const transactionData = transactions.data;
    let grandTotal = 0.0;
    let officeAmount = 0.0;
    let amazonAmount = 0.0;
    let medlineAmount = 0.0;
    let mckessonAmount = 0.0;
    
    transactionData.forEach(transact => {
      grandTotal += parseFloat(transact.grand_total);
      if (transact.category === 'Office') {
        officeAmount += parseFloat(transact.grand_total);
      }
      if (transact.vendor === 'Amazon') {
        amazonAmount += parseFloat(transact.grand_total);
      } else if (transact.vendor === 'Medline') {
        medlineAmount += parseFloat(transact.grand_total);
      } else if (transact.vendor === 'Mckesson') {
        mckessonAmount += parseFloat(transact.grand_total);
      
      } 
    })
    grandTotal = parseFloat(grandTotal).toFixed(2);
    officeAmount = parseFloat(officeAmount).toFixed(2);
    const clientAmount = parseFloat(grandTotal - officeAmount).toFixed(2);
    transactionDashboard.expenses = grandTotal;
    transactionDashboard.client = clientAmount;
    transactionDashboard.office = officeAmount;
    transactionDashboard.series = [parseFloat(officeAmount), parseFloat(clientAmount)];
    providerDashboard.expenses = grandTotal;
    providerDashboard.amazon = amazonAmount;
    providerDashboard.medline = medlineAmount;
    providerDashboard.mckesson = mckessonAmount;
    
    providerDashboard.series = [parseFloat(amazonAmount), parseFloat(medlineAmount),parseFloat(mckessonAmount)];
    isTransactionDone = true;
    setIsTransactionCollection(false);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const inputGeneralHandler = ({ target }) => {
    if (target.name === 'patient' && !target.value) {
      patientDashboard = [...patientOptions];
      patientDashboard.forEach(e => {
        patientGrandTotal += e.estimatedAmt;
      })
      setPatient(DEFAULT_ITEM);
    }


  };
  const autoCompleteGeneralInputHander = (item) => {
    if (item.category === 'patient') {

      const temp = [...patientOptions];
      const found = temp.filter(t => t.name === item.name);
      console.log('[temp]', temp, found, item);
      patientDashboard = found;
      patientGrandTotal = 0;
      patientDashboard.forEach(e => {
        patientGrandTotal += e.estimatedAmt;
      })
      setPatient(item);
    }

  }
  console.log('[series]', patientDashboard);
  return (
    <div className={classes.root}>
      {!isDistributionListDone || !isPatientListDone || !isTransactionDone ?
        <div align="center" style={{ paddingTop: '100px' }}>
          <br />
          <CircularProgress />&nbsp;<span>Loading</span>...
        </div>
        :
        <React.Fragment>
          <Typography variant="h6">DASHBOARD</Typography>
          <div style={{width:500,paddingTop:20}}>
            <DateTypeAutoComplete
					value={dateSelected || DEFAULT_ITEM}
					name="dateType"

					placeholder={dateSelected.name ? `Date : ${dateFrom} to ${dateTo}` : 'Date'}
					onSelectHandler={autoCompleteInputHander}
					onClearHandler={onClearHandler}
					options={dateOptions || [DEFAULT_ITEM]}>

				</DateTypeAutoComplete>
                {isDateCustom &&
					<DateRangeModal description={`Created`} dateFrom={dateFrom} dateTo={dateTo} isOpen={isDateCustom} noHandler={closeDateModalHandler} yesHandler={addDateHandler} />
				}
           </div>
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
                <Typography variant="h5">Client's Estimated Expenses Report</Typography>
                &nbsp;
                <div style={{ paddingTop: 4 }}>
                  <Typography variant="body1">(excluding tax & shipping)</Typography>
                </div>

              </Grid>
              <Grid container justifyContent="space-between" style={{paddingBottom:20}}>
              <div style={{ display: 'flex', gap: 10 }}>
          

                <div style={{width:300}}>
                  
                    <SingleWithClearAutoComplete
                      id='patient'
                      placeholder='Select Patient'
                      label='Select Patient'
                      name='patient'
                      options={patientList}
                      value={patient}
                      onSelectHandler={autoCompleteGeneralInputHander}
                      onChangeHandler={inputGeneralHandler}
                    />
                    </div>
                    </div>
                  <Typography variant="h5" style={{border:'1px solid blue'}}>{`Total : $${parseFloat(patientGrandTotal||0.0).toFixed(2)} `}</Typography>
              </Grid>
              <Grid item xs={12} style={{ paddingBottom: 10 }}>
                <Divider variant="fullWidth" style={{

                  height: '.02em',
                  border: 'solid 1px rgba(0, 0, 0, 0.12)'
                }} orientation="horizontal" flexItem />
              </Grid>
              <Grid container direction="row">
                {patientDashboard.length && patientDashboard.map(map => {
                  return (
                    <Grid item xs={4}>
                      <div align="center">
                        <Typography variant="h6">{`${map.name.toUpperCase()} - $${parseFloat(map.estimatedAmt).toFixed(2)}`}</Typography>
                        <Typography variant="body1">{!map.status ? '(ACTIVE)' : `(${map.status.toUpperCase()})`}</Typography>
                      </div>
                      <div>
                        <ClientPieChart series={map.series} />
                      </div>
                    </Grid>
                  )
                })}
               
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index="two">
            <Grid container direction="row">
              <Grid item xs={12}>
                <Typography variant="h4">{`Total Expenses : $${parseFloat(providerDashboard.expenses).toFixed(2)}`}</Typography>

              </Grid>
              <Grid item xs={6} style={{ paddingTop: 20 }}>
                <div>
                  <Typography variant="h5">Distribution By Category</Typography>

                  <Typography variant="h6">{`Office Supply Expenses - $${parseFloat(transactionDashboard.office).toFixed(2)}`}</Typography>
                  <Typography variant="h6">{`Client Supply Expenses - $${parseFloat(transactionDashboard.client).toFixed(2)}`}</Typography>

                </div>
                <div>
                  <GeneralChart labels={['OFFICE','PATIENTS']}  series={transactionDashboard.series} />
                </div>
              </Grid>
              <Grid item xs={6} style={{ paddingTop: 20 }}>
                <div>
                  <Typography variant="h5">Distribution By Provider/Seller</Typography>

                  <Typography variant="h6">{`Amazon Expenses - $${parseFloat(providerDashboard.amazon).toFixed(2)}`}</Typography>
                  <Typography variant="h6">{`Medline Expenses - $${parseFloat(providerDashboard.medline).toFixed(2)}`}</Typography>
                  <Typography variant="h6">{`Mckesson Expenses - $${parseFloat(providerDashboard.mckesson).toFixed(2)}`}</Typography>
                </div>
                <div>
                  <GeneralChart labels={['AMAZON','MEDLINE','MCKESSON']} series={providerDashboard.series} />
                </div>
              </Grid>
            </Grid>
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
  distributions: distributionListStateSelector(store),
  transactions: transactionListStateSelector(store)
});

const mapDispatchToProps = dispatch => ({
  listPatients: (data) => dispatch(attemptToFetchPatient(data)),
  resetListPatients: () => dispatch(resetFetchPatientState()),
  listDistributions: (data) => dispatch(attemptToFetchDistribution(data)),
  resetListDistribution: () => dispatch(resetFetchDistributionState()),
  listTransactions: (data) => dispatch(attemptToFetchTransaction(data)),
  resetlistTransactions: () => dispatch(resetFetchTransactionState()),


});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);




