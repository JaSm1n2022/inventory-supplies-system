
import { Button, CircularProgress, Grid, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DataHandler from "./DataHandler";
import FilterTable from "./FilterTable";

import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { ACTION_STATUSES, LIMIT_ITEM_PRINT, SUPPLY_STATUS } from "../../../utils/constants";
import { useState } from "react";
import * as FileSaver from 'file-saver';
import { v4 as uuidv4 } from 'uuid';
import Form from "./DistributionForm";
import TemplateForm from "./TemplateForm";
import { connect } from "react-redux";
import { distributionCreateStateSelector, distributionDeleteStateSelector, distributionListStateSelector, distributionUpdateStateSelector } from "../../../store/selectors/distributionSelector";

import Helper from "../../../utils/helper";
import InventoryTable from "../../../Common/components/inventorySystem/InventoryTable";
import ActionsFunction from "../../../Common/components/inventorySystem/ActionsFunction";
import { productListStateSelector } from "../../../store/selectors/productSelector";
import { attemptToFetchProduct, resetFetchProductState } from "../../../store/actions/productAction";
import { attemptToCreateDistribution, attemptToDeleteDistribution, attemptToFetchDistribution, attemptToUpdateDistribution, resetCreateDistributionState, resetDeleteDistributionState, resetFetchDistributionState, resetUpdateDistributionState } from "../../../store/actions/distributionAction";
import { stockListStateSelector, stockUpdateStateSelector } from "../../../store/selectors/stockSelector";
import { attemptToFetchStock, attemptToUpdateStock, resetFetchStockState, resetUpdateStockState } from "../../../store/actions/stockAction";
import { attemptToFetchPatient, resetFetchPatientState } from "../../../store/actions/patientAction";
import { patientListStateSelector } from "../../../store/selectors/patientSelector";
import { attemptToFetchEmployee, resetFetchEmployeeState } from "../../../store/actions/employeeAction";
import { employeeListStateSelector } from "../../../store/selectors/employeeSelector";
//import PrintForm from "../../Document/PrintForm";
import PrintForm from "./PrintForm";
import { attemptToCreateTemplate, attemptToDeleteTemplate, attemptToFetchTemplate, attemptToUpdateTemplate, resetCreateTemplateState, resetDeleteTemplateState, resetFetchTemplateState, resetUpdateTemplateState } from "../../../store/actions/templateAction";
import { templateCreateStateSelector, templateDeleteStateSelector, templateListStateSelector, templateUpdateStateSelector } from "../../../store/selectors/templateSelector";




let productList = [];
let stockList = [];
let patientList = [];
let employeeList = [];
let templateList = [];

let isProductListDone = false;
let isStockListDone = false;
let isDistributionListDone = false;
let isPatientListDone = false;
let isEmployeeListDone = false;
let isTemplateListDone = false;
let isAllFetchDone = false;
let mainGeneral = {};
let mainDetails = [];

let grandTotal = 0.0;
let forStockUpdates = [];
let originalSource = undefined;
let multiPatients = [];
const Distribution = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [templateAnchorEl, setTemplateAnchorEl] = React.useState(null);
  const [isPrintForm, setIsPrintForm] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState(DataHandler.columns());
  const [isFormModal, setIsFormModal] = useState(false);
  const [isTemplateFormModal, setIsTemplateFormModal] = useState(false);
  const [item, setItem] = useState(undefined);
  const [mode, setMode] = useState('create');
  const [module, setModule] = useState('single');

  const [isAddGroupButtons, setIsAddGroupButtons] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [isDistributionsCollection, setIsDistributionsCollection] = useState(true);
  const [isCreateDistributionCollection, setIsCreateDistributionCollection] = useState(true);
  const [isUpdateDistributionCollection, setIsUpdateDistributionCollection] = useState(true);
  const [isDeleteDistributionCollection, setIsDeleteDistributionCollection] = useState(true);
  const [generalForm, setGeneralForm] = useState(undefined);
  const [detailForm, setDetailForm] = useState([]);
  const [isCreateTemplateCollection, setIsCreateTemplateCollection] = useState(true);
  const [isUpdateTemplateCollection, setIsUpdateTemplateCollection] = useState(true);
  const [isDeleteTemplateCollection, setIsDeleteTemplateCollection] = useState(true);

  const createFormHandler = (data, mode) => {
    console.log('[data]', data);
    setMode(mode || 'create');
    setModule('single');
    if (mode === 'edit') {
      //setItem(data);
      data.distributionId = data.id;
      data.patient = patientList.find(p => p.id === data.patient_id);
      if (data.requestor_id) {
        data.requestor = employeeList.find(e => e.id === data.requestor_id);
      } else if (data.requestor) {
        data.requestor = employeeList.find(e => e.name && e.name.toUpperCase() === data.requestor.toUpperCase());
      }
      data.requestorName = data.requestor;
      const prod = productList.find(p => p.id === data.productId);


      data.details = [{
        search: { ...prod },
        ...prod,
        orderQty: data.order_qty,
        productId: data.productId,
        unitDistribution: data.unit_distribution || data.unitDistribution || data.unit_uom,
        distributionId: data.id
      }];
      setItem(data);
    } else {

      setItem(data);
    }

    setIsFormModal(true);
  }
  const closeFormModalHandler = () => {


    setIsFormModal(false);
  }
  const closeTemplateFormModalHandler = () => {


    setIsTemplateFormModal(false);
  }

  useEffect(() => {
    console.log('list Distributions');
    const dates = Helper.formatDateRangeByCriteriaV2('thisMonth');
    setDateFrom(dates.from);
    setDateTo(dates.to);
    props.listProducts();
    props.listStocks();
    props.listPatients();
    props.listDistributions({ from: dates.from, to: dates.to });
    props.listEmployees();
    props.listTemplates();
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
    if (!isCreateTemplateCollection && props.createTemplateState && props.createTemplateState.status === ACTION_STATUSES.SUCCEED) {
      props.resetCreateTemplate();

      setIsCreateTemplateCollection(true);

    }
    if (!isUpdateTemplateCollection && props.updateTemplateState && props.updateTemplateState.status === ACTION_STATUSES.SUCCEED) {
      props.resetUpdateTemplate();

      setIsUpdateTemplateCollection(true);


    }
    if (!isDeleteTemplateCollection && props.deleteTemplateState && props.deleteTemplateState.status === ACTION_STATUSES.SUCCEED) {
      console.log('[change me to true]');
      props.resetDeleteTemplate();
      setIsDeleteTemplateCollection(true);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateTemplateCollection, isCreateTemplateCollection, isDeleteTemplateCollection, isDistributionsCollection, isCreateDistributionCollection, isUpdateDistributionCollection, isDeleteDistributionCollection]);

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

  if (props.templates && props.templates.status === ACTION_STATUSES.SUCCEED) {
    templateList = [...props.templates.data];
    templateList.forEach(item => {
      item.name = item.name.toUpperCase();
      item.value = item.name.toUpperCase();
      item.label = item.name.toUpperCase();
      item.categoryType = 'template'
    });
    isTemplateListDone = true;
    props.resetListTemplates();
  }
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
      item.name = `${item.description.toUpperCase()} (${item.vendor})`;
      item.value = item.name;
      item.label = item.name;
      item.categoryType = 'stock'
    });
    isStockListDone = true;
    props.resetListStocks();
  }
  console.log('[props.distributions]', props.distributions,isProductListDone,productList);
  if (isProductListDone && isDistributionsCollection && props.distributions && props.distributions.status === ACTION_STATUSES.SUCCEED) {
    let source = props.distributions.data;
    for(const src of source) {
      const prodDetails = productList.find(pr => pr.id === src.productId);
      if(prodDetails) {
        src.shortDescription = prodDetails.short_description;
        src.size = prodDetails.size;
        src.flavor = prodDetails.flavor;
      
      }
    }
    if (source && source.length) {
      source = DataHandler.mapData(source);

    }

    const cols = DataHandler.columns().map((col, index) => {
      if (col.name === 'actions') {
        return {
          ...col,
          editable: () => false,
          render: (cellProps) => <ActionsFunction deleteRecordItemHandler={deleteRecordItemHandler} disabled={cellProps.data.order_status && cellProps.data.order_status.toLowerCase() !== 'order' ? false : false} createFormHandler={createFormHandler} data={{ ...cellProps.data }} />
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

    setIsPrintForm(true);
    console.log('Update Stock', forStockUpdates);
    props.updateStock(forStockUpdates);
    props.listDistributions({ from: dateFrom, to: dateTo });

  }
  if (isUpdateDistributionCollection && props.updateDistributionState && props.updateDistributionState.status === ACTION_STATUSES.SUCCEED) {
    setIsUpdateDistributionCollection(false);
    props.updateStock(forStockUpdates);
    props.listDistributions({ from: dateFrom, to: dateTo });

  }
  console.log('[isDeleteDistribution]', isDeleteDistributionCollection, props.deleteDistributionState);
  if (isDeleteDistributionCollection && props.deleteDistributionState && props.deleteDistributionState.status === ACTION_STATUSES.SUCCEED) {
    setIsDeleteDistributionCollection(false);
    console.log('[delete distribution stock]', forStockUpdates);
    props.updateStock(forStockUpdates);

    props.listDistributions({ from: dateFrom, to: dateTo });

  }
  if (props.updateStockState && props.updateStockState.status === ACTION_STATUSES.SUCCEED) {
    props.listStocks();
    props.resetUpdateStock();
  }
  const filterByDateHandler = (dates) => {
    setDateTo(dates.to);
    setDateFrom(dates.from);
    props.listDistributions({ from: dates.from, to: dates.to });
  }

  const deleteRecordItemHandler = (id, data) => {
    forStockUpdates = [];
    console.log('[delete Distribution id]', id, data);
    const stock = stockList.find(s => s.productId === data.productId);
    console.log('[delete distribution stock', stock);
    forStockUpdates.push(
      {
        id: stock.id,
        qty_on_hand: Math.abs(parseInt(stock.qty_on_hand, 10) + parseInt(data.order_qty, 10))

      });
    props.deleteDistribution(id);
  }


  const createMultiDistributionHandler = () => {
    const finalPayload = [];
    forStockUpdates = [];
    const groupId = uuidv4();
    for (const multi of multiPatients) {
      const { general, details } = multi;
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
          requestor_id: general.requestorId,
          patient_caregiver: general.caregiver,
          patient_id: general.patientId || 0,
          stock_status: payload.stockStatus,
          group_id: groupId,
          unit_uom: payload.unitDistribution

        };

        const stock = stockList.find(s => s.productId === payload.productId);
        if (stock) {
          let qty = parseInt(payload.orderQty, 10);

          forStockUpdates.push(
            {
              id: stock.id,
              qty_on_hand: Math.abs(parseInt(stock.qty_on_hand, 10) - parseInt(qty, 10))

            });
        }
        console.log('[params]', params);
        finalPayload.push(params);
      }
    }
    dataSource.forEach(e => e.isChecked = false);
    console.log('[final payload]', finalPayload, forStockUpdates);
    props.createDistribution(finalPayload);





  }
  const manageTemplateHandler = (general, details, mode) => {
    if (details && details.length) {

      const params = {
        created_at: new Date(),
        name: general.templateName,
        details: {
          products: [...details].map(map => ({ productId: map.productId, qty: parseInt(map.orderQty || 0, 10) }))
        }
      };
      if (general.templateId) {
        params.id = general.templateId;
      }

      console.log('[params[', params);
      if (general.templateId) {
        props.updateTemplate(params);
      } else {
        props.createTemplate(params);
      }
    }
  }
  const createDistributionHandler = (general, details, mode) => {
    multiPatients = [];
    mainGeneral = general;
    mainDetails = details;
    console.log('[Create Distribution Handler]', general, details, mode);


    const finalPayload = [];
    forStockUpdates = [];
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
        requestor_id: general.requestorId,
        patient_caregiver: general.caregiver,
        patient_id: general.patientId || 0,
        stock_status: payload.stockStatus,
        group_id: groupId,
        unit_uom: payload.unitDistribution

      };
      if (mode === 'edit' && payload.distributionId) {
        params.id = payload.distributionId;
      }
      const stock = stockList.find(s => s.productId === payload.productId);
      if (stock) {
        let qty = parseInt(payload.orderQty, 10);
        if (mode === 'edit') {
          qty = parseInt(payload.adjustedQty, 10);
        }
        forStockUpdates.push(
          {
            id: stock.id,
            qty_on_hand: Math.abs(parseInt(stock.qty_on_hand, 10) - parseInt(qty, 10))

          });
      }
      console.log('[params]', params);
      finalPayload.push(params);
    }
    console.log('[For Stock Updates]', forStockUpdates);
    if (mode === 'create') {
      console.log('[final payload]', finalPayload);
      props.createDistribution(finalPayload);

    } else if (mode === 'edit') {
      console.log('[Final Payload]', finalPayload);
      props.updateDistribution(finalPayload);
    }
    setIsFormModal(false);




  }
  console.log('[Is Create Distribution Collection]', props.createDistributionState);


  const filterRecordHandler = (keyword) => {
    console.log('[Keyword]', keyword);
    if (!keyword) {
      grandTotalHandler([...originalSource]);
      setDataSource([...originalSource]);
    } else {
      const temp = [...originalSource];
      const found = temp.filter(data => data.description.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        || data.patient_name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        || data.requestor.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
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
  const closePrintFormHandler = () => {
    dataSource.forEach(data => data.isChecked = false);
    props.listDistributions({ from: dateFrom, to: dateTo });
    setIsAddGroupButtons(false);
    setIsPrintForm(false);
  }
  const changeStatusHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeChangeStatusMenuHandler = () => {
    setAnchorEl(null);
  }

  const templateHandler = (event) => {
    setTemplateAnchorEl(event.currentTarget);
  }
  const closeTemplateMenuHandler = () => {
    setTemplateAnchorEl(null);
  }

  const updateStatusHandler = (status) => {
    const selectedData = dataSource.filter((r) => r.isChecked);
    console.log('[selected Data Status]', selectedData, status);
    const forUpdateStatus = [];
    selectedData.forEach(sel => {
      forUpdateStatus.push({
        id: sel.id,
        order_status: status
      });
    })
    props.updateDistribution(forUpdateStatus);
    setAnchorEl(null);
  }
  const deleteTemplateHandler = (id) => {
    console.log('[Delete Template]', id);
    props.deleteTemplate(id);
  }
  const createOrderHandler = () => {
    setModule('multiple');
    const selectedData = dataSource.filter((r) => r.isChecked);
    console.log('[Selected Data]', selectedData);
    const generalData = {};
    const detailsData = [];
    selectedData.forEach((ea, indx) => {
      generalData.patient = patientList.find(p => p.id === ea.patient_id);
      if (ea.requestor_id) {
        generalData.requestor = employeeList.find(e => e.id === ea.requestor_id);
      } else if (ea.requestor) {
        generalData.requestor = employeeList.find(e => e.name && e.name.toUpperCase() === ea.requestor.toUpperCase());
      }
      generalData.requestorName = ea.requestor;
      const prod = productList.find(p => p.id === ea.productId);


      detailsData.push({
        search: { ...prod },
        ...prod,
        orderQty: ea.order_qty,
        productId: ea.productId,
        unitDistribution: prod.unit_distribution || prod.unitDistribution || ea.unit_uom
      });
    });
    setGeneralForm(generalData);
    setDetailForm(detailsData);
    setMode('create');
    setIsFormModal(true);

  }
  if (isTemplateListDone && isEmployeeListDone && isStockListDone && isPatientListDone && isProductListDone && isDistributionListDone) {
    isAllFetchDone = true;
  }
  const printAllOrdersHandler = () => {
    const selectedData = dataSource.filter((r) => r.isChecked);
    console.log('[Selected Data]', selectedData);

    multiPatients = [];
    let patientIds = selectedData.map(map => map.patient_id);
    console.log('[patientIds]', patientIds);
    patientIds = Array.from(new Set(patientIds));
    console.log('[patientIds2]', patientIds);
    for (const pId of patientIds) {

      const patientData = selectedData.filter(sel => sel.patient_id === pId);
      let generalData = {};
      let detailsData = [];
      let maxCnt = 1;
      for (const ea of patientData) {
        if (maxCnt % (LIMIT_ITEM_PRINT + 1) === 0) {

          multiPatients.push({
            general: generalData,
            details: detailsData
          })
          generalData = {};
          detailsData = [];
        }
        generalData.patient = patientList.find(p => p.id === ea.patient_id);
        generalData.patientName = generalData.patient ? generalData.patient.name : '';
        generalData.facility = generalData.patient ? generalData.patient.place_of_service : '';
        if (ea.requestor_id) {
          generalData.requestor = employeeList.find(e => e.id === ea.requestor_id);
        } else if (ea.requestor) {
          generalData.requestor = employeeList.find(e => e.name && e.name.toUpperCase() === ea.requestor.toUpperCase());
        }
        generalData.requestorName = ea.requestor;
        const prod = productList.find(p => p.id === ea.productId);
        detailsData.push({
          search: { ...prod },
          ...prod,
          orderQty: ea.order_qty,
          productId: ea.productId,
          unitDistribution: prod.unit_distribution || prod.unitDistribution || ea.unit_uom
        });
        maxCnt++;
      }
      multiPatients.push({
        general: generalData,
        details: detailsData
      })
    }


    setIsPrintForm(true);
  }
  const copyAllHandler = () => {
    const selectedData = dataSource.filter((r) => r.isChecked);
    console.log('[Selected Data]', selectedData);

    multiPatients = [];
    let patientIds = selectedData.map(map => map.patient_id);
    console.log('[patientIds]', patientIds);
    patientIds = Array.from(new Set(patientIds));
    console.log('[patientIds2]', patientIds);
    for (const pId of patientIds) {
      const patientStatus = patientList.find(patient => patient.id === pId);
      if (patientStatus.status === 'Active') { // only active patient to be distributed
        const patientData = selectedData.filter(sel => sel.patient_id === pId);
        let generalData = {};
        let detailsData = [];

        for (const ea of patientData) {
          generalData.patient = patientList.find(p => p.id === ea.patient_id);
          generalData.patientId = ea.patient_id;
          generalData.patientName = generalData.patient ? generalData.patient.name : '';
          generalData.facility = generalData.patient ? generalData.patient.place_of_service : '';
          if (ea.requestor_id) {
            generalData.requestorId = ea.requestor_id;
            generalData.requestor = employeeList.find(e => e.id === ea.requestor_id);
          } else if (ea.requestor) {
            generalData.requestor = employeeList.find(e => e.name && e.name.toUpperCase() === ea.requestor.toUpperCase());
            generalData.requestorId = generalData.requestor.id;
          }
          generalData.orderDt = new Date();
          generalData.requestorName = ea.requestor;
          const prod = productList.find(p => p.id === ea.productId);
          detailsData.push({
            search: { ...prod },
            ...prod,
            orderQty: ea.order_qty,
            productId: ea.productId,
            unitDistribution: prod.unit_distribution || prod.unitDistribution || ea.unit_uom
          });

        }
        multiPatients.push({
          general: generalData,
          details: detailsData
        })
      }
    }
    createMultiDistributionHandler();

  }
  const useTemplateHandler = (details) => {
    console.log('[Use Template handler]', details);
    setModule('multiple');
    const generalData = {};
    const detailsData = [];
    details.forEach((ea) => {
      generalData.patient = {
        name: '-',
        value: '-',
        place_of_service: '-'
      };
      generalData.requestor = { title: '-', name: '-', position: '-' };
      generalData.requestorName = '';
      const prod = productList.find(p => p.id === ea.productId);


      detailsData.push({
        search: { ...prod },
        ...prod,
        orderQty: parseInt(ea.orderQty || 0, 10),
        productId: ea.productId,
        unitDistribution: prod.unit_distribution || prod.unitDistribution || ea.unit_uom
      });
    });
    setGeneralForm(generalData);
    setDetailForm(detailsData);
    setMode('create');
    setIsTemplateFormModal(false);
    setIsFormModal(true);
  }
  const addEditTemplateHandler = () => {
    setTemplateAnchorEl(undefined);
    setIsTemplateFormModal(true);
  }
  if (isCreateTemplateCollection && props.createTemplateState && props.createTemplateState.status === ACTION_STATUSES.SUCCEED) {
    isTemplateListDone = false;
    setIsCreateTemplateCollection(false);
    props.listTemplates();
  }
  if (isUpdateTemplateCollection && props.updateTemplateState && props.updateTemplateState.status === ACTION_STATUSES.SUCCEED) {
    isTemplateListDone = false;
    setIsUpdateTemplateCollection(false);
    props.listTemplates();

  }
  if (isDeleteTemplateCollection && props.deleteTemplateState && props.deleteTemplateState.status === ACTION_STATUSES.SUCCEED) {
    isTemplateListDone = false;
    setIsDeleteTemplateCollection(false);
    props.listTemplates();
  }
  console.log('[Create Template]', props.createTemplateState);
  return (
    <React.Fragment>
      {!isAllFetchDone  &&
        <div align="center" style={{ paddingTop: '100px' }}>
          <br />
          <CircularProgress />&nbsp;<span>Loading</span>...
        </div>
}
        <React.Fragment>
          <Grid container style={{display:isAllFetchDone  ? '' :'none'}}>
            <Grid container justifyContent="space-between" style={{ paddingTop: 10 }}>
              <div>
                <Typography variant="h6">DISTRIBUTION MANAGEMENT</Typography>
              </div>
              <div>
                <FilterTable filterRecordHandler={filterRecordHandler} filterByDateHandler={filterByDateHandler} />
              </div>
            </Grid>

            <Grid container>
              <div style={{ display: 'inline-flex', gap: 10, paddingTop: 10 }}>
                <Button
                  onClick={addEditTemplateHandler}
                  variant="outlined"
                  color="primary"
                  aria-controls="simple-menu" aria-haspopup="true"
                  component="span"

                >

                  MANAGE TEMPLATE
                </Button>
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
                <Menu
                  id="simple-menu"
                  anchorEl={templateAnchorEl}
                  keepMounted
                  open={Boolean(templateAnchorEl)}
                  onClose={closeTemplateMenuHandler}
                >
                  <MenuItem onClick={() => addEditTemplateHandler()}>Add/Edit Template</MenuItem>
                  <MenuItem>Use Template</MenuItem>

                </Menu>
                {isAddGroupButtons &&
                  <div style={{ display: 'inline-flex', gap: 10 }}>
                    <Button
                      onClick={() => exportToExcelHandler()}
                      variant="outlined"
                      style={{

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

                    > Export Excel </Button>
                    <Tooltip title={'Limit to 16 records'}>
                      <Button
                        onClick={() => createOrderHandler()}
                        variant="outlined"
                        style={{

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

                      > Add Multiple Orders </Button>
                    </Tooltip>
                    <Button
                      onClick={changeStatusHandler}
                      variant="outlined"
                      color="primary"
                      aria-controls="simple-menu" aria-haspopup="true"
                      component="span"
                      endIcon={<ArrowDownwardIcon />}
                    >

                      Change Status
                    </Button>
                    <Tooltip title={'Reprint'}>
                      <Button
                        onClick={() => printAllOrdersHandler()}
                        variant="outlined"
                        style={{



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

                      > PRINT ALL </Button>
                    </Tooltip>
                    <Tooltip title={'Create same data'}>
                      <Button
                        onClick={() => copyAllHandler()}
                        variant="outlined"
                        style={{


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

                      > COPY DATA </Button>
                    </Tooltip>

                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={closeChangeStatusMenuHandler}
                    >
                      {SUPPLY_STATUS.map(map => {
                        return (
                          <MenuItem onClick={() => updateStatusHandler(map)}>{map}</MenuItem>
                        )
                      })}
                    </Menu>

                  </div>
                }
              </div>
            </Grid>
            <Grid item xs={12} align="right">
              <Typography variant="h5">{`Grand Total : $${grandTotal}`}</Typography>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: 10 }}>

              <InventoryTable onCheckboxSelectionHandler={onCheckboxSelectionHandler} columns={columns} dataSource={dataSource} />
            </Grid>
          </Grid>
        </React.Fragment>
      
      {isFormModal &&
        <Form module={module} filterRecordHandler={filterRecordHandler} generalInfo={generalForm} detailInfo={detailForm} employeeList={employeeList} patientList={patientList} productList={productList} stockList={stockList} createDistributionHandler={createDistributionHandler} mode={mode} isOpen={isFormModal} isEdit={false} item={item} onClose={closeFormModalHandler} />
      }
      {isTemplateFormModal &&
        <TemplateForm useTemplateHandler={useTemplateHandler} deleteTemplateHandler={deleteTemplateHandler} templateList={templateList} manageTemplateHandler={manageTemplateHandler} filterRecordHandler={filterRecordHandler} generalInfo={generalForm} detailInfo={detailForm} employeeList={employeeList} patientList={patientList} productList={productList} stockList={stockList} createDistributionHandler={createDistributionHandler} mode={mode} isOpen={isTemplateFormModal} isEdit={false} item={item} onClose={closeTemplateFormModalHandler} />
      }
      {isPrintForm &&
        <PrintForm multiPatients={multiPatients} isOpen={isPrintForm} generalForm={mainGeneral} closePrintForm={closePrintFormHandler} detailForm={mainDetails} />
      }

    </React.Fragment>
  )
}
const mapStateToProps = store => ({
  products: productListStateSelector(store),
  stocks: stockListStateSelector(store),
  patients: patientListStateSelector(store),
  employees: employeeListStateSelector(store),
  templates: templateListStateSelector(store),
  distributions: distributionListStateSelector(store),
  createDistributionState: distributionCreateStateSelector(store),
  updateDistributionState: distributionUpdateStateSelector(store),
  updateTemplateState: templateUpdateStateSelector(store),
  deleteDistributionState: distributionDeleteStateSelector(store),
  updateStockState: stockUpdateStateSelector(store),
  createTemplateState: templateCreateStateSelector(store),
  deleteTemplateState: templateDeleteStateSelector(store),


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
  resetDeleteDistribution: () => dispatch(resetDeleteDistributionState()),
  updateStock: (data) => dispatch(attemptToUpdateStock(data)),
  resetUpdateStock: () => dispatch(resetUpdateStockState()),
  createTemplate: (data) => dispatch(attemptToCreateTemplate(data)),
  resetCreateTemplate: () => dispatch(resetCreateTemplateState()),
  listTemplates: (data) => dispatch(attemptToFetchTemplate(data)),
  resetListTemplates: () => dispatch(resetFetchTemplateState()),
  updateTemplate: (data) => dispatch(attemptToUpdateTemplate(data)),
  resetUpdateTemplate: () => dispatch(resetUpdateTemplateState()),
  deleteTemplate: (data) => dispatch(attemptToDeleteTemplate(data)),
  resetDeleteTemplate: () => dispatch(resetDeleteTemplateState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Distribution);

