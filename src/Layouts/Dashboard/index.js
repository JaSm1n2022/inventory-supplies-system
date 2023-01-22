import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, Tabs, Tab,  CircularProgress, Divider,   FormControl, FormLabel,Radio, } from '@mui/material';

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
import { productListStateSelector } from '../../store/selectors/productSelector';
import { attemptToFetchProduct, resetFetchProductState } from '../../store/actions/productAction';
import { attemptToFetchStock, resetFetchStockState } from '../../store/actions/stockAction';
import { stockListStateSelector } from '../../store/selectors/stockSelector';

import SupplyPlot from './components/SupplyPlot';
import CardTransaction from './components/CardTransaction';
import PrintReport from './components/PrintReport';



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
  small: {
   
    color: 'black',
    backgroundColor: 'white',
    border: '1px solid black',
  },
}));

let isDistributionListDone = false;
let isPatientListDone = false;
let isTransactionDone = false;
let isProductListDone = false;
let isStockListDone = false;
let patientList = [];
let stockList = [];
let patientOptions = [];
let distributionList = [];
let numberActive = 0;
let numberInactive = 0;
let patientCnaList = [];



let transactionDashboard =
{
  name: 'Invoice',
  expenses: 0,
  series: [0, 0],
  client: 0,
  office: 0
}
let patientGrandTotal = 0.0;
let patientSupplyPlot = {};
let supplyPlot = [];
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
    mckesson: 0,
    other: 0

  }
]
let productList = [];
let dateOptions = [];
let lastDateType = '';
let estimatedSupplyGrandTotal = {
  brief: parseFloat(0.0),
  underpad: parseFloat(0.0),
  underwear: parseFloat(0.0),
  glove: parseFloat(0.0),
  wipe: parseFloat(0.0),
  ensure : parseFloat(0.0),
};

let plotSummary = {
  brief: [],
  underpad: [],
  underwear: [],
  glove: [],
  wipe: [],
  ensure: []
};


let unusedPlotSummary = {
  brief: [],
  underpad: [],
  underwear: [],
  glove: [],
  wipe: [],
  ensure: []
};
let transactionType = {

  amazon: 0,
  medline: 0,
  mckesson: 0,
  walmart: 0,
  others: 0
}
let cardTransaction = [
  { "4344": { ...transactionType } },
  { "1937": { ...transactionType } }
];
let requestorDaily = ['jesus arela', 'shiela roa', 'silva doody'];
DATE_TYPE_SELECTION.forEach(c => { dateOptions.push({ ...c, category: 'date' }) });

const dates = Helper.formatDateRangeByCriteriaV2('thisMonth');
const Dashboard = (props) => {
  const { listStocks, resetListStocks, stocks, listTransactions, listProducts, resetListProducts, products, resetlistTransactions, transactions, listPatients, listDistributions, resetListPatients, resetListDistribution, patients, distributions } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState('one');
  const [isPatientCollection, setIsPatientCollection] = useState(true);
  const [isDistributionCollection, setIsDistributionCollection] = useState(true);
  const [isTransactionCollection, setIsTransactionCollection] = useState(true);
  const [patient, setPatient] = useState(DEFAULT_ITEM);
  const [dateFrom, setDateFrom] = useState(dates.from);
  const [dateTo, setDateTo] = useState(dates.to);
  const [dateSelected, setDateSelected] = useState(dateOptions.find(d => d.value === 'thisMonth'));
  const [isDateCustom, setIsDateCustom] = useState(false);
  const [plotView, setPlotView] = React.useState('brief');



  useEffect(() => {
    listStocks();
    listProducts();
    listPatients();
    listDistributions({ from: dates.from, to: dates.to });
    listTransactions({ from: dates.from, to: dates.to });



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
      console.log('[List me]', data, isDistributionCollection);

      if (data.from) {
        isDistributionListDone = false;
        isTransactionDone = false;
        listTransactions({ from: data.from || dateFrom, to: data.to || dateTo });
        listDistributions({ from: data.from || dateFrom, to: data.to || dateTo });
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
  const sortByProductId = (data, attr) => {
    console.log('[data]', data);
    data.sort((a, b) => {
      const _a = a[attr] ? parseInt(a[attr]) : 0;
      const _b = b[attr] ? parseInt(b[attr]) : 0;
      if (_a < _b) {
        return -1;
      } else if (_a > _b) {
        return 1;
      } else {
        return 0;
      }
    });
    console.log('[new Data]', data);
    return data;
  }
  const sortByName = (items) => {
    console.log('[items to sort]', items);
    items.sort((a, b) => {
      const tempA = a.name ? a.name.toUpperCase() : '';
      const tempB = b.name ? b.name.toUpperCase() : '';
      if (tempA < tempB) {
        return -1;
      } if (tempA > tempB) {
        return 1;
      }
      return 0;
    });
    console.log('[return me]', items);
    return items;
  };
  const sortByPatientStatus = (items) => {
    console.log('[items to sort]', items);
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
    console.log('[return me]', items);
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

    isDistributionListDone = false;
    isTransactionDone = false;
    listDistributions({ from: _sfrom, to: _sTo });
    listTransactions({ from: _sfrom, to: _sTo });

  }
  const setPatientProductHandler = (patient, briefs, underpads, underwears, wipes, gloves,ensures) => {
    console.log('[Ensures]',ensures);
    const temp = {
      patientName: patient.name,
      brief: {
        patientName: patient.name,
        productId: briefs && briefs.length ? briefs[0].productId : '',
        product: briefs && briefs.length ? briefs[0].description : '',
        qty: briefs && briefs.length ? briefs[0].order_qty : 0,
        vendor: '',
        size: ''
      },
      underpad: {
        patientName: patient.name,
        productId: underpads && underpads.length ? underpads[0].productId : '',
        product: underpads && underpads.length ? underpads[0].description : '',
        qty: underpads && underpads.length ? underpads[0].order_qty : 0,
        vendor: '',
        size: ''
      },
      underwear: {
        patientName: patient.name,
        productId: underwears && underwears.length ? underwears[0].productId : '',
        product: underwears && underwears.length ? underwears[0].description : '',
        qty: underwears && underwears.length ? underwears[0].order_qty : 0,
        vendor: '',
        size: ''
      },
      wipe: {
        patientName: patient.name,
        productId: wipes && wipes.length ? wipes[0].productId : '',
        product: wipes && wipes.length ? wipes[0].description : '',
        qty: wipes && wipes.length ? wipes[0].order_qty : 0,
        vendor: '',
        size: ''
      },
      glove: {
        patientName: patient.name,
        productId: gloves && gloves.length ? gloves[0].productId : '',
        product: gloves && gloves.length ? gloves[0].description : '',
        qty: gloves && gloves.length ? gloves[0].order_qty : 0,
        vendor: '',
        size: ''
      },
      ensure: {
        patientName: patient.name,
        productId: ensures && ensures.length ? ensures[0].productId : '',
        product: ensures && ensures.length ? ensures[0].description : '',
        qty: ensures && ensures.length ? ensures[0].order_qty : 0,
        vendor: '',
        size: ''
      }

    };
    if (temp.brief.productId && productList.find(p => p.id === temp.brief.productId)) {
      const item = productList.find(p => p.id === temp.brief.productId);
      temp.brief.vendor = item.vendor;
      temp.brief.size = item.size;
      temp.brief.unitPrice = item.unit_price;
      temp.brief.cnt = item.count;
      temp.brief.unitDist = item.unit_distribution;
      temp.brief.threshold = 40;
      const cna = briefs && briefs.length ? briefs[0] : {};
      temp.brief.requestor = cna.requestor;
      console.log('[cna]', cna);

      if (cna && cna.requestor && requestorDaily.includes(cna.requestor.toLowerCase())) {
        temp.brief.threshold = 60;
      }
    }

    if (temp.underpad.productId && productList.find(p => p.id === temp.underpad.productId)) {
      const item = productList.find(p => p.id === temp.underpad.productId);
      temp.underpad.vendor = item.vendor;
      temp.underpad.size = item.size;
      temp.underpad.unitPrice = item.unit_price;
      temp.underpad.cnt = item.count;
      temp.underpad.unitDist = item.unit_distribution;
      temp.underpad.threshold = 20;//item.count;
      const cna = underpads && underpads.length ? underpads[0] : [];
      temp.underpad.requestor = cna.requestor;
      if (cna && cna.requestor && requestorDaily.includes(cna.requestor.toLowerCase())) {
        temp.underpad.threshold = 30;
      }
    }

    if (temp.underwear.productId && productList.find(p => p.id === temp.underwear.productId)) {
      const item = productList.find(p => p.id === temp.underwear.productId);
      temp.underwear.vendor = item.vendor;
      temp.underwear.size = item.size;
      temp.underwear.unitPrice = item.unit_price;
      temp.underwear.cnt = item.count;
      temp.underwear.unitDist = item.unit_distribution;
      temp.underwear.threshold = 40;//item.count;
      const cna = underwears && underwears.length ? underwears[0] : [];
      temp.underwear.requestor = cna.requestor;
      if (cna && cna.requestor && requestorDaily.includes(cna.requestor.toLowerCase())) {
        temp.underwear.threshold = 60;
      }
    }

    if (temp.wipe.productId && productList.find(p => p.id === temp.wipe.productId)) {
      const item = productList.find(p => p.id === temp.wipe.productId);
      temp.wipe.vendor = item.vendor;
      temp.wipe.size = item.size;
      temp.wipe.unitPrice = item.unit_price;
      temp.wipe.cnt = item.count;
      temp.wipe.unitDist = item.unit_distribution;
      temp.wipe.threshold = 2;
      const cna = wipes && wipes.length ? wipes[0] : [];
      temp.wipe.requestor = cna.requestor;
      if (cna && cna.requestor && requestorDaily.includes(cna.requestor.toLowerCase())) {
        temp.wipe.threshold = 3;
      }
    }
    if (temp.glove.productId && productList.find(p => p.id === temp.glove.productId)) {
      const item = productList.find(p => p.id === temp.glove.productId);
      temp.glove.vendor = item.vendor;
      temp.glove.size = item.size;
      temp.glove.unitPrice = item.unit_price;
      temp.glove.cnt = item.count;
      temp.glove.unitDist = item.unit_distribution;
      temp.glove.threshold = 1;
      const cna = gloves && gloves.length ? gloves[0] : [];
      temp.glove.requestor = cna.requestor;
      if (cna && cna.requestor && requestorDaily.includes(cna.requestor.toLowerCase())) {
        temp.glove.threshold = 2;
      }
    }
    if (temp.ensure.productId && productList.find(p => p.id === temp.ensure.productId)) {
      const item = productList.find(p => p.id === temp.ensure.productId);
      temp.ensure.vendor = item.vendor;
      temp.ensure.size = item.size;
      temp.ensure.unitPrice = item.unit_price;
      temp.ensure.cnt = item.count;
      temp.ensure.unitDist = item.unit_distribution;
      temp.ensure.threshold = 7;
      const cna = ensures && ensures.length ? ensures[0] : [];
      temp.ensure.requestor = cna.requestor;
      if (cna && cna.requestor && requestorDaily.includes(cna.requestor.toLowerCase())) {
        temp.ensure.threshold = 7;
      }
    }



    supplyPlot.push(temp);
  }
  const plotHandler = (source) => {
    const newPlot = [];
    const plots = supplyPlot.map(map => map[source]);
    console.log('[plots]', plots);
    for (const plot of plots) {
      if (plot.productId) {
        const tempStock = [...stockList];
        let currentStock = tempStock.find(stk => stk.productId === plot.productId);
        if (currentStock) {
          plot.currentStock = tempStock.find(stk => stk.productId === plot.productId).qty_on_hand;
          if (currentStock.qty_on_hand === 0) {
            plot.balance = 0;
            plot.order = plot.threshold;
          } else {
            const diff1 = parseInt(currentStock.qty_on_hand, 10) - parseInt(plot.threshold);
            //     currentStock.qty_on_hand = diff1 < 0 ? 0 : diff1;
            plot.balance = diff1 < 0 ? 0 : diff1;
            if (diff1 <= 0) {
              plot.order = Math.abs(diff1);
            }
          }

        }
        newPlot.push(plot);
      }
    }
    console.log('[new Plot]', newPlot);
    //one by one 
    //make data
    const ids = newPlot.map(m => m.productId);
    const uIds = Array.from(new Set(ids));

    patientSupplyPlot[source] = newPlot;
    const adjustment = [];
    uIds.forEach(u => {
      const sel = patientSupplyPlot[source].filter(n => n.productId === u);

      console.log('[se]', sel);
      sel.forEach((s, indx) => {
        if (parseInt(indx) > 0) {
          console.log('[index]', indx, sel[indx - 1]);
          s.currentStock = sel[indx - 1].balance;
          const balance = parseInt(s.currentStock) - parseInt(s.threshold);
          s.balance = balance < 0 ? 0 : balance;
          if (balance <= 0 && s.currentStock === 0) {
            s.order = s.threshold;
          } else if (balance <= 0) {
            s.order = s.cnt - s.currentStock;
          }

        }
        adjustment.push(s);
      })
    })
    patientSupplyPlot[source] = adjustment;
    uIds.forEach(u => {
      const sel = patientSupplyPlot[source].filter(n => n.productId === u);
      console.log('[estimatedSupplyGrandTotal [sel]]',sel,source);
      let orders = 0;
      sel.forEach(e => {
        orders += parseInt(e.order || 0);
      });
      if (orders > 0) {
            console.log('[estimatedSupplyGrandTotal]',estimatedSupplyGrandTotal[source],source);
        const cartonCnt = Math.ceil(parseFloat(orders / sel[0].cnt)) === 0 ? 1 : Math.ceil(parseFloat(orders / sel[0].cnt));
        estimatedSupplyGrandTotal[source] = parseFloat(estimatedSupplyGrandTotal[source]) + (parseInt(cartonCnt) * sel[0].unitPrice);
  
        plotSummary[source].push({
          ...sel[0], total: orders, carton: cartonCnt, amt: parseInt(cartonCnt) * sel[0].unitPrice
        });
      }
    });
    const stocks = stockList.filter(s => s.category && s.category.toLowerCase() === source);
    stocks.forEach(b => {
      if (!uIds.find(u => u === b.productId)) {
        const pr = productList.find(p => p.id === b.productId);
        if (pr) {
          const temp = {
            product: pr.description,
            vendor: pr.vendor,
            size: pr.size,
            qty: b.qty_on_hand
          };
          if (b.qty_on_hand > 0) {
            unusedPlotSummary[source].push(temp);
          }
        }
      }
    })
  }

  console.log('[Dashboard Patient List]', patients);
  console.log('[Dashboard Distribution List]', distributions, isDistributionCollection);
  console.log('[products]', products);
  console.log('[stokcs]', stocks);
  if (props.stocks && props.stocks.status === ACTION_STATUSES.SUCCEED) {
    stockList = [...props.stocks.data];

    isStockListDone = true;
    props.resetListStocks();
  }
  if (products && products.status === ACTION_STATUSES.SUCCEED) {
    productList = [...products.data];
    isProductListDone = true;
    resetListProducts();
  }
  if (isPatientCollection && patients && patients.status === ACTION_STATUSES.SUCCEED) {
    setIsPatientCollection(false);
    isPatientListDone = true;
    patientList = patients.data || [];
    patientCnaList = [];
    patientList.forEach(p => {
      if (!patientCnaList.find(c => c.name === p.name)) {
        patientCnaList.push({
          label: p.name,
          value: p.name,
          name: p.name,
          category: 'patient'
        });
      }
      if (!patientCnaList.find(c => c.name === p.assigned_cna)) {
        patientCnaList.push({
          label: p.assigned_cna,
          value: p.assigned_cna,
          name: p.assigned_cna,
          category: 'patient'
        });
      }
    })
    patientCnaList = sortByName(patientCnaList);
    patientList = sortByPatientStatus(patientList);
    numberInactive = patientList.filter(p => p.status && p.status === 'Inactive').length;
    numberActive = patientList.length - numberInactive;
    // patientList = patientList.filter(f => f.status !== 'Inactive');


  }
  if (stockList.length && isDistributionCollection && distributions && distributions.status === ACTION_STATUSES.SUCCEED) {
    isDistributionListDone = true;
    setIsDistributionCollection(false);
    patientGrandTotal = 0.0;


    distributionList = distributions.data || [];
    console.log('[Patient Data]', patientList);
    console.log('[Patient Data2]', distributionList);

    patientDashboard = [];

    supplyPlot = [];
    patientSupplyPlot = {
      brief: [],
      underpad: [],
      wipe: [],
      glove: [],
      underwear: [],
      ensure: []
    };
    estimatedSupplyGrandTotal = {
      brief: parseFloat(0.0),
      underpad: parseFloat(0.0),
      underwear: parseFloat(0.0),
      glove: parseFloat(0.0),
      wipe: parseFloat(0.0),
      ensure: parseFloat(0.0)
    };

    plotSummary = {
      brief: [],
      underpad: [],
      underwear: [],
      glove: [],
      wipe: [],
      ensure : []
    };


    unusedPlotSummary = {
      brief: [],
      underpad: [],
      underwear: [],
      glove: [],
      wipe: [],
      ensure : []
    };
    for (const patient of patientList) {
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
        nutrition: 0,
        other: 0,

      };
      const others = supplies.filter(supply => !['Diabetic Shake', 'Nutrition Shake', 'Brief', 'Underwear/Pull-ups', 'Underpads', 'Lotion', 'Cleanser', 'Ointment', 'Cream'].includes(supply.category));
      const nutritions = supplies.filter(supply => ['Diabetic Shake', 'Nutrition Shake'].includes(supply.category));
     
      const ensures = supplies.filter(supply => ['Diabetic Shake', 'Nutrition Shake'].includes(supply.category) && supply.description.indexOf('Ensure') !== -1);
      console.log('[Ensures]',ensures);
      const briefs = supplies.filter(supply => supply.category === 'Brief');
      const wipes = supplies.filter(supply => supply.category === 'Wipes');
      const gloves = supplies.filter(supply => supply.category === 'Gloves');
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
      if (nutritions && nutritions.length) {
        nutritions.forEach(item => {
          seriesList.nutrition = parseFloat(parseFloat(seriesList.nutrition) + parseFloat(item.estimated_total_amt)).toFixed(2);
        })
      }
      patientGrandTotal += estimatedAmt;
      if (estimatedAmt > 0 && patient.name.indexOf('C/O') === -1) {
        patientDashboard.push({
          status: patient.status,
          soc: moment(patient.soc_at).format('YYYY-MM-DD'),
          eoc: patient.status === 'Inactive' ? moment(patient.eoc_at).format('YYYY-MM-DD') : '',
          cna: patient.assigned_cna,
          name: patient.name,
          label: patient.name,
          value: patient.name,
          cateogry: 'patient',
          estimatedAmt,
          series: [parseFloat(seriesList.underpad), parseFloat(seriesList.brief), parseFloat(seriesList.underwear), parseFloat(seriesList.lotion), parseFloat(seriesList.nutrition), parseFloat(seriesList.other)]

        })



      }
      if ((patient.status.toLowerCase() === 'inactive' && patient.name.indexOf('C/O') !== -1) || patient.status.toLowerCase() !== 'inactive') {
        setPatientProductHandler(patient, briefs, underpads, underwears, wipes, gloves,ensures);
      }

    }
    console.log('[Plot Supply]', patientSupplyPlot.ensure);
    plotHandler('brief');
    plotHandler('underpad');
    plotHandler('underwear');
    plotHandler('wipe');
    plotHandler('glove');
    plotHandler('ensure');
    patientSupplyPlot.brief = sortByProductId(patientSupplyPlot.brief, 'productId');
    patientSupplyPlot.underpad = sortByProductId(patientSupplyPlot.underpad, 'productId');
    patientSupplyPlot.underwear = sortByProductId(patientSupplyPlot.underwear, 'productId');
    patientSupplyPlot.wipe = sortByProductId(patientSupplyPlot.wipe, 'productId');
    patientSupplyPlot.glove = sortByProductId(patientSupplyPlot.glove, 'productId');
    patientSupplyPlot.ensure = sortByProductId(patientSupplyPlot.ensure, 'productId');
    patientOptions = [...patientDashboard];




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
    transactionType = {

      amazon: 0,
      medline: 0,
      mckesson: 0,
      walmart: 0,
      others: 0,
      grand : 0
    }
    cardTransaction = [
      { info: "4344", ...transactionType },
      { info: "1001", ...transactionType },
      { info: "1015", ...transactionType },
      { info: "1937", ...transactionType },
      { info: "0994", ...transactionType },
      { info: "9465", ...transactionType }
    ];


    transactionData.forEach(transact => {
      grandTotal += parseFloat(transact.grand_total);
      cardTransaction.forEach(card => {
        if (transact.payment_info.indexOf(card.info) !== -1 && transact.vendor === 'Amazon') {
          card.amazon += parseFloat(transact.grand_total);
        }
        if (transact.payment_info.indexOf(card.info) !== -1 && transact.vendor === 'Mckesson') {
          card.mckesson += parseFloat(transact.grand_total);
        }
        if (transact.payment_info.indexOf(card.info) !== -1 && transact.vendor === 'Medline') {
          card.medline += parseFloat(transact.grand_total);
        }
        if (transact.payment_info.indexOf(card.info) !== -1 && transact.vendor === 'Walmart') {
          card.walmart += parseFloat(transact.grand_total);
        }
        if (transact.payment_info.indexOf(card.info) !== -1 && !['Walmart', 'Medline', 'Mckesson', 'Amazon'].includes(transact.vendor)) {
          console.log('[Found Others]',transact);
          card.others += parseFloat(transact.grand_total);
        }
        if (transact.payment_info.indexOf(card.info) !== -1) {
          card.grand += parseFloat(transact.grand_total);
        }
        
      });

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
      providerDashboard.other = grandTotal - amazonAmount - medlineAmount - mckessonAmount;

      providerDashboard.series = [parseFloat(amazonAmount), parseFloat(medlineAmount), parseFloat(mckessonAmount), parseFloat(providerDashboard.other)];
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
        const found = temp.filter(t => (t.name === item.name || t.cna === item.name));
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
    const plotViewHandler = (event) => {
      setPlotView(event.target.value);
    }

    
    numberActive = patientDashboard.filter(p => p.status === 'Active').length;
    numberInactive = patientDashboard.length - numberActive;
    
    return (
      <div className={classes.root}>
        {!isDistributionListDone || !isPatientListDone || !isTransactionDone || !isProductListDone || !isStockListDone ?
          <div align="center" style={{ paddingTop: '100px' }}>
            <br />
            <CircularProgress />&nbsp;<span>Loading</span>...
          </div>
          :
          <React.Fragment>
            <Typography variant="h6">DASHBOARD</Typography>
            <div style={{ width: 500, paddingTop: 20 }}>
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
              <Tab value="two" style={{ fontSize: 14 }} label="SUPPLIES TRANSACTION PAYMENTS" {...a11yProps('two')} />
              <Tab value="three" style={{ fontSize: 14 }} label="PAYMENT METHOD TRACKING" {...a11yProps('three')} />
              <Tab value="four" style={{ fontSize: 14 }} label="ORDER PLOT STRATEGY" {...a11yProps('four')} />
            </Tabs>

            {/* Client Expenses Report */}
            <TabPanel value={value} index="one">
              <Grid container style={{ paddingLeft: 10, paddingRight: 10 }} direction="row">
                <Grid container justifyContent="space-between" style={{ paddingBottom: 20 }}>
                  <div style={{ display: 'flex', gap: 10 }}>


                    <div style={{ width: 300 }}>

                      <SingleWithClearAutoComplete
                        id='patient'
                        placeholder='Select Patient/CNA'
                        label='Select Patient'
                        name='patient'
                        options={patientCnaList}
                        value={patient}
                        onSelectHandler={autoCompleteGeneralInputHander}
                        onChangeHandler={inputGeneralHandler}
                      />
                    </div>
                  </div>
                  
                </Grid>
                <Grid item xs={12} style={{ paddingBottom: 10 }}>
                  <Divider variant="fullWidth" style={{

                    height: '.02em',
                    border: 'solid 1px rgba(0, 0, 0, 0.12)'
                  }} orientation="horizontal" flexItem />
                </Grid>
                <Grid container direction="row">
                <PrintReport source={'clientExpensesReport'} clientExpensesAmt={`$${parseFloat(patientGrandTotal || 0.0).toFixed(2)}`} patientDashboard={patientDashboard} numberActive={numberActive} numberInactive={numberInactive} dateFrom={dateFrom} dateTo={dateTo}/>
                </Grid>
              </Grid>
            </TabPanel>


            <TabPanel value={value} index="two">
              <Grid container direction="row">
              <PrintReport source={'supplyExpensesReport'} transactionDashboard={transactionDashboard}  providerDashboard={providerDashboard} dateFrom={dateFrom} dateTo={dateTo}/>
               
              </Grid>
            </TabPanel>

            {/* Card History Report */}
            <TabPanel value={value} index="three">
                <PrintReport source={'cardHistoryReport'} details={cardTransaction} dateFrom={dateFrom} dateTo={dateTo}/>
            </TabPanel>
            <TabPanel value={value} index="four">
              <FormControl component="fieldset">
                <FormLabel component="legend">** Plot View based on patient existing delivery supplies record from {dateFrom} to {dateTo}</FormLabel>
                <div style={{ display: 'inline-flex' }}>
                  <div>

                    <Radio
                      checked={plotView === 'brief'}
                      onChange={plotViewHandler}
                      value="brief"
                      label="Brief"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': 'A' }}
                    ></Radio>BRIEFS
                    <Radio
                      checked={plotView === 'underpad'}
                      onChange={plotViewHandler}
                      value="underpad"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': 'B' }}
                    ></Radio>UNDERPADS
                    <Radio
                      checked={plotView === 'underwear'}
                      onChange={plotViewHandler}
                      value="underwear"

                      name="radio-button-demo"
                      inputProps={{ 'aria-label': 'A' }}
                    ></Radio>UNDERWEARS
                    <Radio
                      checked={plotView === 'wipe'}
                      onChange={plotViewHandler}
                      value="wipe"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': 'B' }}
                    ></Radio>WIPES
                    <Radio
                      checked={plotView === 'glove'}
                      onChange={plotViewHandler}
                      value="glove"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': 'B' }}
                    ></Radio>GLOVES
                      <Radio
                      checked={plotView === 'ensure'}
                      onChange={plotViewHandler}
                      value="ensure"
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': 'B' }}
                    ></Radio>ENSURE
                    {/*
      <RadioGroup style={{display:'inline-flex'}} aria-label="gender" name="gender1" value={plotView} onChange={plotViewHandler}>
        <FormControlLabel value="brief" control={<Radio />} label="Briefs" />
        <FormControlLabel value="underpad" control={<Radio />} label="Underpads" />
        <FormControlLabel value="underwear" control={<Radio />} label="UnderWears" />
        <FormControlLabel value="wipe" control={<Radio />} label="Wipes" />
        <FormControlLabel value="glove" control={<Radio />} label="Gloves" />
      </RadioGroup>
              */}
                  </div>
                </div>
              </FormControl>
              <div>
                <Divider variant="fullWidth" style={{
                  height: '.03em',
                  border: 'solid 1px rgba(0, 0, 0, 0.12)'
                }} orientation="horizontal" flexItem />
              </div>
              {plotView === 'brief' ?
                <SupplyPlot title={'BRIEF'} patientPlot={patientSupplyPlot.brief} estimatedGrandTotal={estimatedSupplyGrandTotal.brief} unusedSummary={unusedPlotSummary.brief} summary={plotSummary.brief} />
                : plotView === 'underpad' ?
                  <SupplyPlot title={'UNDERPAD'} patientPlot={patientSupplyPlot.underpad} estimatedGrandTotal={estimatedSupplyGrandTotal.underpad} unusedSummary={unusedPlotSummary.underpad} summary={plotSummary.underpad} />
                  : plotView === 'underwear' ?
                    <SupplyPlot title={'UNDERWEAR'} patientPlot={patientSupplyPlot.underwear} estimatedGrandTotal={estimatedSupplyGrandTotal.underwear} unusedSummary={unusedPlotSummary.underwear} summary={plotSummary.underwear} />
                    : plotView === 'wipe' ?
                      <SupplyPlot title={'WIPE'} patientPlot={patientSupplyPlot.wipe} estimatedGrandTotal={estimatedSupplyGrandTotal.wipe} unusedSummary={unusedPlotSummary.wipe} summary={plotSummary.wipe} />
                      : plotView === 'glove' ?
                        <SupplyPlot title={'GLOVE'} patientPlot={patientSupplyPlot.glove} estimatedGrandTotal={estimatedSupplyGrandTotal.glove} unusedSummary={unusedPlotSummary.glove} summary={plotSummary.glove} />
                        : plotView === 'ensure' ?
                        <SupplyPlot title={'ENSURE'} patientPlot={patientSupplyPlot.ensure} estimatedGrandTotal={estimatedSupplyGrandTotal.ensure} unusedSummary={unusedPlotSummary.ensure} summary={plotSummary.ensure} />
                        : null}
            </TabPanel>
          </React.Fragment>
        }
      </div>
    );
  }
  const mapStateToProps = store => ({
    patients: patientListStateSelector(store),
    distributions: distributionListStateSelector(store),
    transactions: transactionListStateSelector(store),
    products: productListStateSelector(store),
    stocks: stockListStateSelector(store),
  });

  const mapDispatchToProps = dispatch => ({
    listPatients: (data) => dispatch(attemptToFetchPatient(data)),
    resetListPatients: () => dispatch(resetFetchPatientState()),
    listDistributions: (data) => dispatch(attemptToFetchDistribution(data)),
    resetListDistribution: () => dispatch(resetFetchDistributionState()),
    listTransactions: (data) => dispatch(attemptToFetchTransaction(data)),
    resetlistTransactions: () => dispatch(resetFetchTransactionState()),
    listProducts: (data) => dispatch(attemptToFetchProduct(data)),
    resetListProducts: () => dispatch(resetFetchProductState()),
    listStocks: (data) => dispatch(attemptToFetchStock(data)),
    resetListStocks: () => dispatch(resetFetchStockState()),

  });

  export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);




