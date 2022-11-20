
import { Button, CircularProgress, Grid, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DataHandler from "./DataHandler";
import FilterTable from "./FilterTable";

import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { ACTION_STATUSES } from "../../../utils/constants";
import { useState } from "react";
import * as FileSaver from 'file-saver';
import { v4 as uuidv4 } from 'uuid';
import Form from "./DistributionForm";
import { connect } from "react-redux";
import { distributionCreateStateSelector, distributionDeleteStateSelector, distributionListStateSelector, distributionUpdateStateSelector } from "../../../store/selectors/distributionSelector";

import Helper from "../../../utils/helper";
import InventoryTable from "../../../Common/components/inventorySystem/InventoryTable";
import ActionsFunction from "../../../Common/components/inventorySystem/ActionsFunction";
import { productListStateSelector } from "../../../store/selectors/productSelector";
import { attemptToFetchProduct, resetFetchProductState } from "../../../store/actions/productAction";
import { attemptToCreateDistribution, attemptToDeleteDistribution, attemptToFetchDistribution, attemptToUpdateDistribution, resetCreateDistributionState, resetDeleteDistributionState, resetFetchDistributionState, resetUpdateDistributionState } from "../../../store/actions/distributionAction";
import { stockListStateSelector } from "../../../store/selectors/stockSelector";
import { attemptToFetchStock, resetFetchStockState } from "../../../store/actions/stockAction";
import { attemptToFetchPatient, resetFetchPatientState } from "../../../store/actions/patientAction";
import { patientListStateSelector } from "../../../store/selectors/patientSelector";
import { attemptToFetchEmployee, resetFetchEmployeeState } from "../../../store/actions/employeeAction";
import { employeeListStateSelector } from "../../../store/selectors/employeeSelector";


let productList = [];
let stockList = [];
let patientList = [];
let employeeList = [];


let isProductListDone = false;
let isStockListDone = false;
let isDistributionListDone = false;
let isPatientListDone = false;
let isEmployeeListDone = false;
let isAllFetchDone = false;

let grandTotal = 0.0;
let originalSource = undefined;

const Distribution = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState(DataHandler.columns());
  const [isFormModal, setIsFormModal] = useState(false);
  const [item, setItem] = useState(undefined);
  const [mode, setMode] = useState('create');
  const [isAddGroupButtons, setIsAddGroupButtons] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo,setDateTo] = useState('');
  const [isDistributionsCollection, setIsDistributionsCollection] = useState(true);
  const [isCreateDistributionCollection, setIsCreateDistributionCollection] = useState(true);
  const [isUpdateDistributionCollection, setIsUpdateDistributionCollection] = useState(true);
  const [isDeleteDistributionCollection, setIsDeleteDistributionCollection] = useState(true);


  const createFormHandler = (data, mode) => {
    setItem(data);
    setMode(mode || 'create');
    setIsFormModal(true);
  }
  const closeFormModalHandler = () => {


    setIsFormModal(false);
  }


  useEffect(() => {
    console.log('list Distributions');
    const dates = Helper.formatDateRangeByCriteriaV2('thisMonth');
    setDateFrom(dates.from);
    setDateTo(dates.to);
    props.listProducts();
    props.listStocks();
    props.listPatients();
    props.listDistributions({from : dates.from,to:dates.to});
    props.listEmployees();
  }, []);


  useEffect(() => {

    if (!isDistributionsCollection && props.distributions && props.distributions.status === ACTION_STATUSES.SUCCEED) {
      props.resetListDistributions();

      setIsDistributionsCollection(true);
    }

    if (!isCreateDistributionCollection && props.createDistributionState && props.createDistributionState.status === ACTION_STATUSES.SUCCEED) {
      props.resetCreateDistribution();

      setIsCreateDistributionCollection(true);

    }
    if (!isUpdateDistributionCollection && props.updateDistributionState && props.updateDistributionState.status === ACTION_STATUSES.SUCCEED) {
      props.resetUpdateDistribution();

      setIsUpdateDistributionCollection(true);


    }
    if (!isDeleteDistributionCollection && props.deleteDistributionState && props.deleteDistributionState.status === ACTION_STATUSES.SUCCEED) {
      console.log('[change me to true]');
      props.resetDeleteDistribution();
      setIsDeleteDistributionCollection(true);

    }
  }, [isDistributionsCollection, isCreateDistributionCollection, isUpdateDistributionCollection, isDeleteDistributionCollection]);

  const grandTotalHandler = (data) => {
    grandTotal = 0.0;
    data.forEach(e => {
      grandTotal = parseFloat(parseFloat(grandTotal) + parseFloat(e.estimated_total_amt)).toFixed(2);
    })
  }

  if (props.patients && props.patients.status === ACTION_STATUSES.SUCCEED) {
    patientList = [...props.patients.data];
    patientList.forEach(item => {
      item.name = item.name.toUpperCase();
      item.value = item.name.toUpperCase();
      item.label = item.name.toUpperCase();
      item.categoryType = 'patient'
    });
    isPatientListDone = true;
    props.resetListPatients();
  }

  console.log('[props.employees]', props.employees);

  if (props.employees && props.employees.status === ACTION_STATUSES.SUCCEED) {
    employeeList = [...props.employees.data];
    employeeList.forEach(item => {
      item.name = item.name.toUpperCase();
      item.value = item.name.toUpperCase();
      item.label = item.name.toUpperCase();
      item.categoryType = 'employee'
    });
    isEmployeeListDone = true;
    props.resetListEmployees();
  }
  if (props.products && props.products.status === ACTION_STATUSES.SUCCEED) {
    productList = [...props.products.data];
    productList.forEach(item => {
      item.name = item.description.toUpperCase();
      item.value = item.description.toUpperCase();
      item.label = item.description.toUpperCase();
      item.categoryType = 'description'
    });
    isProductListDone = true;
    props.resetListProducts();
  }
  console.log('[props.Stocks]', props.stocks);
  if (props.stocks && props.stocks.status === ACTION_STATUSES.SUCCEED) {
    stockList = [...props.stocks.data];
    stockList.forEach(item => {
      item.name = item.description.toUpperCase();
      item.value = item.description.toUpperCase();
      item.label = item.description.toUpperCase();
      item.categoryType = 'stock'
    });
    isStockListDone = true;
    props.resetListStocks();
  }
  console.log('[props.distributions]', props.distribution);
  if (isDistributionsCollection && props.distributions && props.distributions.status === ACTION_STATUSES.SUCCEED) {
    let source = props.distributions.data;
    if (source && source.length) {
      source = DataHandler.mapData(source);

    }

    const cols = DataHandler.columns().map((col, index) => {
      if (col.name === 'actions') {
        return {
          ...col,
          editable: () => false,
          render: (cellProps) => <ActionsFunction deleteRecordItemHandler={deleteRecordItemHandler} disabled={cellProps.data.order_status && cellProps.data.order_status.toLowerCase() !== 'order' ? true : false} createFormHandler={createFormHandler} data={{ ...cellProps.data }} />
        }

      } else {
        return {
          ...col,
          editable: () => false
        }
      }
    });
    setColumns(cols);
    originalSource = [...source];
    grandTotalHandler(source);
    setDataSource(source);
    isDistributionListDone = true;
    setIsDistributionsCollection(false);
  }
  console.log('[Is Create Distribution Collection]', props.createDistributionState);
  if (isCreateDistributionCollection && props.createDistributionState && props.createDistributionState.status === ACTION_STATUSES.SUCCEED) {
    setIsCreateDistributionCollection(false);
    
    props.listDistributions({from : dateFrom,to:dateTo});

  }
  if (isUpdateDistributionCollection && props.updateDistributionState && props.updateDistributionState.status === ACTION_STATUSES.SUCCEED) {
    setIsUpdateDistributionCollection(false);
    props.listDistributions();

  }
  console.log('[isDeleteDistribution]', isDeleteDistributionCollection, props.deleteDistributionState);
  if (isDeleteDistributionCollection && props.deleteDistributionState && props.deleteDistributionState.status === ACTION_STATUSES.SUCCEED) {
    setIsDeleteDistributionCollection(false);
    props.listDistributions();

  }

  const filterByDateHandler = (dates) => {
    setDateTo(dates.to);
    setDateFrom(dates.from);
    props.listDistributions({from : dates.from,to:dates.to});
  }

  const deleteRecordItemHandler = (id) => {
    console.log('[delete Distribution id]', id);
    props.deleteDistribution(id);
  }

  const createDistributionHandler = (general, details, mode) => {
    console.log('[Create Distribution Handler]', general, details, mode);


    const finalPayload = [];
    const groupId = uuidv4();
    for (const payload of details) {

      const params = {
        created_at: new Date(),
        description: payload.description,
        productId: payload.productId,
        price_per_pcs: payload.price_per_pcs,
        category: payload.category,
        estimated_total_amt: parseFloat(parseFloat(payload.price_per_pcs) * parseInt(payload.orderQty, 10)).toFixed(2),
        order_status: general.statusName,
        order_qty: payload.orderQty,
        order_at: general.orderDt,
        patient_name: general.patientName,
        delivery_location: general.facility,
        requestor: general.requestorName,
        patient_caregiver: general.caregiver,
        patient_id: general.patientId || 0,
        stock_status: payload.stockStatus,
        group_id: groupId

      };
      console.log('[params]', params);
      finalPayload.push(params);
    }
    if (mode === 'create') {
      console.log('[final payload]', finalPayload);
      props.createDistribution(finalPayload);

    } else if (mode === 'edit') {

      props.updateDistribution(finalPayload);
    }
    setIsFormModal(false);




  }
  console.log('[Is Create Distribution Collection]', props.createDistributionState);

  
  const filterRecordHandler = (keyword) => {
    console.log('[Keyword]',keyword);
    if(!keyword) {
      grandTotalHandler([...originalSource]);  
      setDataSource([...originalSource]);
    } else {
    const temp = [...originalSource];
    const found = temp.filter( data => data.description.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    || data.patient_name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    );
    grandTotalHandler(found);
   setDataSource(found);
    }
  };

  const onCheckboxSelectionHandler = (data, isAll, itemIsChecked) => {
    console.log('[data ALl]', data, isAll, itemIsChecked);
    const dtSource = [...dataSource];
    if (isAll) {
      dtSource.forEach(item => {
        item.isChecked = isAll; // reset
      });
    } else if (!isAll && data && data.length > 0) {
      dtSource.forEach(item => {
        if (item.id.toString() === data[0].toString()) {
          item.isChecked = itemIsChecked;
        }
      });

    } else if (!isAll && Array.isArray(data) && data.length === 0) {
      dtSource.forEach(item => {
        item.isChecked = isAll; // reset
      });
    }
    setIsAddGroupButtons(dtSource.find(f => f.isChecked));
    originalSource = [...dtSource];
    grandTotalHandler(dtSource);
    setDataSource(dtSource);

  }
  const exportToExcelHandler = () => {
    const excelData = dataSource.filter((r) => r.isChecked);
    const headers = columns;
    const excel = Helper.formatExcelReport(headers, excelData);
    console.log("headers", excel);
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    let fileName = `distribution_list_batch_${new Date().getTime()}`;

    if (excelData && excelData.length) {
      import(/* webpackChunkName: 'json2xls' */ "json2xls")
        .then((json2xls) => {
          // let fileName = fname + '_' + new Date().getTime();
          const xls = typeof json2xls === 'function' ? json2xls(excel) : json2xls.default(excel);
          const buffer = Buffer.from(xls, "binary");
          // let buffer = Buffer.from(excelBuffer);
          const data = new Blob([buffer], { type: fileType });
          FileSaver.saveAs(data, fileName + fileExtension);
        })
        .catch((err) => {
          // Handle failure
          console.log(err);
        });
    }


  }

  const changeStatusHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeChangeStatusMenuHandler = () => {
    setAnchorEl(null);
  }
  if (isEmployeeListDone && isStockListDone && isPatientListDone && isProductListDone && isDistributionListDone) {
    isAllFetchDone = true;
  }
  return (
    <React.Fragment>
      {!isAllFetchDone ?
        <div align="center" style={{ paddingTop: '100px' }}>
          <br />
          <CircularProgress />&nbsp;<span>Loading</span>...
        </div>
        :
        <React.Fragment>
          <Grid container>
            <Grid container justifyContent="space-between" style={{ paddingTop: 10 }}>
              <div>
                <Typography variant="h6">DISTRIBUTION MANAGEMENT</Typography>
              </div>
              <div>
                <FilterTable filterRecordHandler={filterRecordHandler} filterByDateHandler={filterByDateHandler}/>
              </div>
            </Grid>

            <Grid container>
              <div style={{ display: 'inline-flex', gap: 10 }}>
                <Button
                  onClick={() => createFormHandler()}
                  variant="contained"
                  style={{
                    border: 'solid 1px #2196f3',
                    color: 'white',
                    background: '#2196f3',
                    fontFamily: "Roboto",
                    fontSize: "12px",
                    fontWeight: 500,
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: 1.71,
                    letterSpacing: "0.4px",
                    textAlign: "left",
                    cursor: 'pointer'
                  }}
                  component="span"
                  startIcon={<AddIcon />}
                >
                  ADD ORDER
                </Button>
                {isAddGroupButtons &&
                  <div style={{ display: 'inline-flex', gap: 10 }}>
                    <Button
                      onClick={() => exportToExcelHandler()}
                      variant="contained"
                      style={{
                        border: 'solid 1px blue',
                        color: 'white',
                        background: 'blue',
                        fontFamily: "Roboto",
                        fontSize: "12px",
                        fontWeight: 500,
                        fontStretch: "normal",
                        fontStyle: "normal",
                        lineHeight: 1.71,
                        letterSpacing: "0.4px",
                        textAlign: "left",
                        cursor: 'pointer'
                      }}
                      component="span"
                      startIcon={<AddIcon />}
                    > Export Excel </Button>
                    <Button
                      onClick={changeStatusHandler}
                      variant="contained"
                      color="primary"
                      aria-controls="simple-menu" aria-haspopup="true"
                      component="span"
                      endIcon={<ArrowDownwardIcon />}
                    >

                      Change Status
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={closeChangeStatusMenuHandler}
                    >
                      <MenuItem>Fullfill</MenuItem>
                      <MenuItem>Delivered</MenuItem>
                      <MenuItem>Returned</MenuItem>


                    </Menu>
                  </div>
                }
              </div>
            </Grid>
            <Grid item xs={12} align="right">
              <Typography variant="h5">{`Grand Total : ${grandTotal}`}</Typography>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: 10 }}>

              <InventoryTable onCheckboxSelectionHandler={onCheckboxSelectionHandler} columns={columns} dataSource={dataSource} />
            </Grid>
          </Grid>
        </React.Fragment>
      }
      {isFormModal &&
        <Form filterRecordHandler={filterRecordHandler} employeeList={employeeList} patientList={patientList} productList={productList} stockList={stockList} createDistributionHandler={createDistributionHandler} mode={mode} isOpen={isFormModal} isEdit={false} item={item} onClose={closeFormModalHandler} />
      }

    </React.Fragment>
  )
}
const mapStateToProps = store => ({
  products: productListStateSelector(store),
  stocks: stockListStateSelector(store),
  patients: patientListStateSelector(store),
  employees: employeeListStateSelector(store),
  distributions: distributionListStateSelector(store),
  createDistributionState: distributionCreateStateSelector(store),
  updateDistributionState: distributionUpdateStateSelector(store),
  deleteDistributionState: distributionDeleteStateSelector(store),


});

const mapDispatchToProps = dispatch => ({
  listEmployees: (data) => dispatch(attemptToFetchEmployee(data)),
  resetListEmployees: () => dispatch(resetFetchEmployeeState()),
  listPatients: (data) => dispatch(attemptToFetchPatient(data)),
  resetListPatients: () => dispatch(resetFetchPatientState()),
  listProducts: (data) => dispatch(attemptToFetchProduct(data)),
  resetListProducts: () => dispatch(resetFetchProductState()),
  listStocks: (data) => dispatch(attemptToFetchStock(data)),
  resetListStocks: () => dispatch(resetFetchStockState()),
  listDistributions: (data) => dispatch(attemptToFetchDistribution(data)),
  resetListDistributions: () => dispatch(resetFetchDistributionState()),
  createDistribution: (data) => dispatch(attemptToCreateDistribution(data)),
  resetCreateDistribution: () => dispatch(resetCreateDistributionState()),
  updateDistribution: (data) => dispatch(attemptToUpdateDistribution(data)),
  resetUpdateDistribution: () => dispatch(resetUpdateDistributionState()),
  deleteDistribution: (data) => dispatch(attemptToDeleteDistribution(data)),
  resetDeleteDistribution: () => dispatch(resetDeleteDistributionState())

});

export default connect(mapStateToProps, mapDispatchToProps)(Distribution);

