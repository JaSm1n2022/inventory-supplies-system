
import { Button, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DataHandler from "./DataHandler";
import FilterTable from "./FilterTable";

import AddIcon from "@mui/icons-material/Add";

import { ACTION_STATUSES } from "../../../utils/constants";
import { useState } from "react";
import * as FileSaver from 'file-saver';

import InvoiceForm from "./InvoiceForm";
import { connect } from "react-redux";
import { invoiceCreateStateSelector, invoiceDeleteStateSelector, invoiceListStateSelector, invoiceUpdateStateSelector } from "../../../store/selectors/invoiceSelector";
import { attemptToCreateInvoice, attemptToDeleteInvoice, attemptToFetchInvoice, attemptToUpdateInvoice, resetCreateInvoiceState, resetDeleteInvoiceState, resetFetchInvoiceState, resetUpdateInvoiceState } from "../../../store/actions/invoiceAction";
import InventoryTable from "../../../Common/components/inventorySystem/InventoryTable";
import moment from "moment";
import Helper from "../../../utils/helper";
import ActionsFunction from "../../../Common/components/inventorySystem/ActionsFunction";

let grandTotal = 0;
let originalSource = [];
let vendorList = [];
const DEFAULT_DATE_RANGE = Helper.formatDateRangeByCriteriaV2('thisMonth');
function payloadDateRange() {
  const payload = {
    from: `${DEFAULT_DATE_RANGE.from} 00:00:00`,
    to: `${DEFAULT_DATE_RANGE.to} 23:59:00`
  };
  return payload;
}
const Invoice = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isInvoicesCollection, setIsInvoicesCollection] = useState(true);
  const [isCreateInvoiceCollection, setIsCreateInvoiceCollection] = useState(true);
  const [isUpdateInvoiceCollection, setIsUpdateInvoiceCollection] = useState(true);
  const [isDeleteInvoiceCollection, setIsDeleteInvoiceCollection] = useState(true);
  const [isFormModal, setIsFormModal] = useState(false);
  const [item, setItem] = useState(undefined);
  const [mode, setMode] = useState('create');
  const [isAddGroupButtons, setIsAddGroupButtons] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const createFormHandler = (data, mode) => {
    setItem(data);
    setMode(mode || 'create');
    setIsFormModal(true);
  }
  const closeFormModalHandler = () => {


    setIsFormModal(false);
  }

  useEffect(() => {

    if (!isInvoicesCollection && props.invoices && props.invoices.status === ACTION_STATUSES.SUCCEED) {
      props.resetListInvoices();
      setIsInvoicesCollection(true);
    }

    if (!isCreateInvoiceCollection && props.createInvoiceState && props.createInvoiceState.status === ACTION_STATUSES.SUCCEED) {
      props.resetCreateInvoice();
      setIsCreateInvoiceCollection(true);
    }
    if (!isUpdateInvoiceCollection && props.updateInvoiceState && props.updateInvoiceState.status === ACTION_STATUSES.SUCCEED) {
      props.resetUpdateInvoice();
      setIsUpdateInvoiceCollection(true);
      if (!isDeleteInvoiceCollection && props.deleteInvoiceState && props.deleteInvoiceState.status === ACTION_STATUSES.SUCCEED) {
        props.resetDeleteInvoice();
        setIsDeleteInvoiceCollection(true);
      }
    }
  }, [isInvoicesCollection, isCreateInvoiceCollection, isUpdateInvoiceCollection, isDeleteInvoiceCollection]);
  useEffect(() => {

    const dates = Helper.formatDateRangeByCriteriaV2('thisMonth');
    setDateFrom(dates.from);
    setDateTo(dates.to);
    props.listInvoices({from:dates.from,to:dates.to});
  }, []);
  const filterByDateHandler = (dates) => {
    setDateTo(dates.to);
    setDateFrom(dates.from);
    props.listInvoices({from : dates.from,to:dates.to});
  }
  console.log('[props.invoices]', props.invoices);
  if (isInvoicesCollection && props.invoices && props.invoices.status === ACTION_STATUSES.SUCCEED) {
    grandTotal = 0.0;
    let source = props.invoices.data;
    if (source && source.length) {
      source = DataHandler.mapData(source);
      const grands = source.map(map => map.grand_total);
      grands.forEach(g => {
        grandTotal += parseFloat(g) || 0.00;
      });
    }

    const cols = DataHandler.columns().map((col, index) => {
      if (col.name === 'actions') {
        return {
          ...col,
          editable: () => false,
          render: (cellProps) => <ActionsFunction deleteRecordItemHandler={deleteRecordItemHandler} createFormHandler={createFormHandler} data={{ ...cellProps.data }} />
        }

      } else {
        return {
          ...col,
          editable: () => false
        }
      }
    });
    setColumns(cols);
    setDataSource(source);
    originalSource = [...source];
    setIsInvoicesCollection(false);
  }
  const deleteRecordItemHandler = (id) => {
    props.deleteInvoice(id);
  }
  const createInvoiceHandler = (payload, mode) => {
    console.log('[Create Invoice Handler]', payload, mode);
    const params = {
      invoiced_at: moment(new Date(payload.invoiceDt)).format('YYYY-MM-DD HH:mm'),
      invoice_number: payload.invNumber,
      grand_total: parseFloat(payload.grandTotal || 0.00).toFixed(2),
      payment_method: payload.method,
      payment_info: payload.paymentInfo,
      payment_at: moment(new Date(payload.paymentDt)).format('YYYY-MM-DD HH:mm'),
      vendor: payload.vendorName
    };
    if (mode === 'create') {
      props.createInvoice(params);

    } else if (mode === 'edit') {
      params.id = payload.id;
      props.updateInvoice(params);
    }
    setIsFormModal(false);




  }

  if (isCreateInvoiceCollection && props.createInvoiceState && props.createInvoiceState.status === ACTION_STATUSES.SUCCEED) {
    setIsCreateInvoiceCollection(false);
    props.listInvoices(payloadDateRange());

  }
  if (isUpdateInvoiceCollection && props.updateInvoiceState && props.updateInvoiceState.status === ACTION_STATUSES.SUCCEED) {
    setIsUpdateInvoiceCollection(false);
    props.listInvoices(payloadDateRange());

  }
  if (isDeleteInvoiceCollection && props.deleteInvoiceState && props.deleteInvoiceState.status === ACTION_STATUSES.SUCCEED) {
    setIsDeleteInvoiceCollection(false);
    props.listInvoices(payloadDateRange());

  }
  const filterRecordHandler = (keyword) => {
    console.log('[Keyword]',keyword);
    if(!keyword) {
      setDataSource([...originalSource]);
      grandTotal = 0.0;
      const grands = [...originalSource].map(map => map.grand_total);
      grands.forEach(g => {
        grandTotal += parseFloat(g) || 0.00;
      });
    } else {
    const temp = [...originalSource];
    console.log('[Keyword 1]',temp);
    const found = temp.filter( data => data.vendor.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    || data.order_number.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    || data.payment_info.indexOf(keyword) !== -1
    );
    console.log('[Keyword 2]',found);
    grandTotal = 0.0;
    const grands = found.map(map => map.grand_total);
    grands.forEach(g => {
      grandTotal += parseFloat(g) || 0.00;
    });
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
    let fileName = `invoice_statement_batch_${new Date().getTime()}`;

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




  return (
    <React.Fragment>
      <Grid container  style={{ paddingLeft: 10, paddingTop:10,paddingRight: 10,paddingBottom:10 }}>
        <Grid container  justifyContent="space-between">
          <div>
          <Typography variant="h6">INVOICE MANAGEMENT</Typography>
          </div>
          <div>
          <FilterTable filterRecordHandler={filterRecordHandler} filterByDateHandler={filterByDateHandler}/>
          </div>
        </Grid>
        <Grid container justifyContent="space-between" style={{ paddingBottom: 10,paddingTop:10 }}>
          <div style={{display:'inline-flex',gap:10}}>
         
          {isAddGroupButtons &&
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
}
          </div>
          <Typography variant="h6">{`Total : $${parseFloat(grandTotal).toFixed(2)}`}</Typography>
        
        </Grid>
        <Grid item xs={12}>

          <InventoryTable onCheckboxSelectionHandler={onCheckboxSelectionHandler} columns={columns} dataSource={dataSource} />
        </Grid>
      </Grid>
      {isFormModal &&
        <InvoiceForm vendorList={vendorList} createInvoiceHandler={createInvoiceHandler} mode={mode} isOpen={isFormModal} isEdit={false} item={item} onClose={closeFormModalHandler} />
      }
    </React.Fragment>
  )
  
}
const mapStateToProps = store => ({
  invoices: invoiceListStateSelector(store),
  createInvoiceState: invoiceCreateStateSelector(store),
  updateInvoiceState: invoiceUpdateStateSelector(store),
  deleteInvoiceState: invoiceDeleteStateSelector(store)

});

const mapDispatchToProps = dispatch => ({
  listInvoices: (data) => dispatch(attemptToFetchInvoice(data)),
  resetListInvoices: () => dispatch(resetFetchInvoiceState()),
  createInvoice: (data) => dispatch(attemptToCreateInvoice(data)),
  resetCreateInvoice: () => dispatch(resetCreateInvoiceState()),
  updateInvoice: (data) => dispatch(attemptToUpdateInvoice(data)),
  resetUpdateInvoice: () => dispatch(resetUpdateInvoiceState()),
  deleteInvoice: (data) => dispatch(attemptToDeleteInvoice(data)),
  resetDeleteInvoice: () => dispatch(resetDeleteInvoiceState())

});

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);

