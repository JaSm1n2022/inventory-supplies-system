
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DataHandler from "./DataHandler";
import FilterTable from "./FilterTable";

import AddIcon from "@mui/icons-material/Add";

import { ACTION_STATUSES} from "../../../utils/constants";
import { useState } from "react";
import * as FileSaver from 'file-saver';

import Form from "./VendorForm";
import { connect } from "react-redux";
import { vendorCreateStateSelector, vendorDeleteStateSelector, vendorListStateSelector, vendorUpdateStateSelector } from "../../../store/selectors/vendorSelector";
import { attemptToCreateVendor, attemptToDeleteVendor, attemptToFetchVendor, attemptToUpdateVendor, resetCreateVendorState, resetDeleteVendorState, resetFetchVendorState, resetUpdateVendorState } from "../../../store/actions/vendorAction";


import Helper from "../../../utils/helper";
import InventoryTable from "../../../Common/components/inventorySystem/InventoryTable";
import ActionsFunction from "../../../Common/components/inventorySystem/ActionsFunction";


let originalSource = [];


function payloadHandler() {
  /*
  const payload = {
  from : `${DEFAULT_DATE_RANGE.from} 00:00:00`,
  to: `${DEFAULT_DATE_RANGE.to} 23:59:00`
*/

  return null;
}

const Vendor = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isVendorsCollection, setIsVendorsCollection] = useState(true);
  const [isCreateVendorCollection, setIsCreateVendorCollection] = useState(true);
  const [isUpdateVendorCollection, setIsUpdateVendorCollection] = useState(true);
  const [isDeleteVendorCollection, setIsDeleteVendorCollection] = useState(true);
  const [isFormModal, setIsFormModal] = useState(false);
  const [item, setItem] = useState(undefined);
  const [mode, setMode] = useState('create');
  const [isAddGroupButtons, setIsAddGroupButtons] = useState(false);

  const createFormHandler = (data, mode) => {
    setItem(data);
    setMode(mode || 'create');
    setIsFormModal(true);
  }
  const closeFormModalHandler = () => {


    setIsFormModal(false);
  }

  useEffect(() => {

    if (!isVendorsCollection && props.vendors && props.vendors.status === ACTION_STATUSES.SUCCEED) {
      props.resetlistVendors();
      setIsVendorsCollection(true);

    }

    if (!isCreateVendorCollection && props.createVendorState && props.createVendorState.status === ACTION_STATUSES.SUCCEED) {
      props.resetCreateVendor();
      setIsCreateVendorCollection(true);

    }
    if (!isUpdateVendorCollection && props.updateVendorState && props.updateVendorState.status === ACTION_STATUSES.SUCCEED) {
      props.resetUpdateVendor();
      setIsUpdateVendorCollection(true);

      if (!isDeleteVendorCollection && props.deleteVendorState && props.deleteVendorState.status === ACTION_STATUSES.SUCCEED) {
        props.resetDeleteVendor();
        setIsDeleteVendorCollection(true);

      }
    }
  }, [isVendorsCollection, isCreateVendorCollection, isUpdateVendorCollection, isDeleteVendorCollection]);
  useEffect(() => {


    props.listVendors(payloadHandler());
  }, []);

  console.log('[props.Vendors]', props.vendors);
  if (isVendorsCollection && props.vendors && props.vendors.status === ACTION_STATUSES.SUCCEED) {
    let source = props.vendors.data || [];
      source = DataHandler.mapData(source);
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
    originalSource = [...source];
    setDataSource(source);
    setIsVendorsCollection(false);
  }
  const deleteRecordItemHandler = (id) => {
    props.deleteVendor(id);
  }
  const saveHandler = (payload, mode) => {
    console.log('[Create Vendor Handler]', payload, mode);
    const params = {
    ...payload

    };
    if (mode === 'create') {
      props.createVendor(params);

    } else if (mode === 'edit') {
      params.id = payload.id;
      props.updateVendor(params);
    }
    setIsFormModal(false);




  }
  console.log('[Is Create Vendor Collection]', props.createVendorState);
  if (isCreateVendorCollection && props.createVendorState && props.createVendorState.status === ACTION_STATUSES.SUCCEED) {
    setIsCreateVendorCollection(false);
    props.listVendors();

  }
  if (isUpdateVendorCollection && props.updateVendorState && props.updateVendorState.status === ACTION_STATUSES.SUCCEED) {
    setIsUpdateVendorCollection(false);
    props.listVendors();

  }
  if (isDeleteVendorCollection && props.deleteVendorState && props.deleteVendorState.status === ACTION_STATUSES.SUCCEED) {
    setIsDeleteVendorCollection(false);
    props.listVendors();

  }
  const filterRecordHandler = (keyword) => {
    console.log('[Keyword]',keyword);
    if(!keyword) {
      setDataSource([...originalSource]);
    } else {
    const temp = [...originalSource];
    console.log('[Keyword 1]',temp);
    const found = temp.filter( data => data.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
    console.log('[Keyword 2]',found);
   
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
    let fileName = `vendor_list_batch_${new Date().getTime()}`;

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
      <Grid container style={{paddingTop:12}}>
        <Grid container justifyContent="space-between">
          <div>
            <Typography variant="h6">VENDOR MANAGEMENT</Typography>
          </div>
          <div>
            <FilterTable filterRecordHandler={filterRecordHandler} />
          </div>
        </Grid>

     

        <Grid container justifyContent="space-between" style={{ paddingBottom: 10 }}>
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
              ADD VENDOR
            </Button>
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
        </Grid>
        <Grid item xs={12}>

          <InventoryTable onCheckboxSelectionHandler={onCheckboxSelectionHandler} columns={columns} dataSource={dataSource} />
        </Grid>
      </Grid>
      {isFormModal &&
        <Form saveHandler={saveHandler} mode={mode} isOpen={isFormModal} isEdit={false} item={item} onClose={closeFormModalHandler} />
      }
    </React.Fragment>
  )
}
const mapStateToProps = store => ({
  vendors: vendorListStateSelector(store),
  createVendorState: vendorCreateStateSelector(store),
  updateVendorState: vendorUpdateStateSelector(store),
  deleteVendorState: vendorDeleteStateSelector(store)

});

const mapDispatchToProps = dispatch => ({
  listVendors: (data) => dispatch(attemptToFetchVendor(data)),
  resetlistVendors: () => dispatch(resetFetchVendorState()),
  createVendor: (data) => dispatch(attemptToCreateVendor(data)),
  resetCreateVendor: () => dispatch(resetCreateVendorState()),
  updateVendor: (data) => dispatch(attemptToUpdateVendor(data)),
  resetUpdateVendor: () => dispatch(resetUpdateVendorState()),
  deleteVendor: (data) => dispatch(attemptToDeleteVendor(data)),
  resetDeleteVendor: () => dispatch(resetDeleteVendorState())

});

export default connect(mapStateToProps, mapDispatchToProps)(Vendor);

