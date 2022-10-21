
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DataHandler from "./DataHandler";
import FilterTable from "./FilterTable";

import AddIcon from "@mui/icons-material/Add";

import { ACTION_STATUSES} from "../../../utils/constants";
import { useState } from "react";
import * as FileSaver from 'file-saver';

import PatientForm from "./PatientForm";
import { connect } from "react-redux";
import { patientCreateStateSelector, patientDeleteStateSelector, patientListStateSelector, patientUpdateStateSelector } from "../../../store/selectors/patientSelector";
import { attemptToCreatePatient, attemptToDeletePatient, attemptToFetchPatient, attemptToUpdatePatient, resetCreatePatientState, resetDeletePatientState, resetFetchPatientState, resetUpdatePatientState } from "../../../store/actions/patientAction";


import Helper from "../../../utils/helper";
import InventoryTable from "../../../Common/components/inventorySystem/InventoryTable";
import ActionsFunction from "../../../Common/components/inventorySystem/ActionsFunction";

let originalSource = [];
const Patient = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isPatientsCollection, setIsPatientsCollection] = useState(true);
  const [isCreatePatientCollection, setIsCreatePatientCollection] = useState(true);
  const [isUpdatePatientCollection, setIsUpdatePatientCollection] = useState(true);
  const [isDeletePatientCollection, setIsDeletePatientCollection] = useState(true);
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

    if (!isPatientsCollection && props.patients && props.patients.status === ACTION_STATUSES.SUCCEED) {
      props.resetListPatients();
      setIsPatientsCollection(true);

    }

    if (!isCreatePatientCollection && props.createPatientState && props.createPatientState.status === ACTION_STATUSES.SUCCEED) {
      props.resetCreatePatient();
      setIsCreatePatientCollection(true);

    }
    if (!isUpdatePatientCollection && props.updatePatientState && props.updatePatientState.status === ACTION_STATUSES.SUCCEED) {
      props.resetUpdatePatient();
      setIsUpdatePatientCollection(true);

      if (!isDeletePatientCollection && props.deletePatientState && props.deletePatientState.status === ACTION_STATUSES.SUCCEED) {
        props.resetDeletePatient();
        setIsDeletePatientCollection(true);

      }
    }
  }, [isPatientsCollection, isCreatePatientCollection, isUpdatePatientCollection, isDeletePatientCollection]);
  useEffect(() => {


    props.listPatients(payloadHandler());
  }, []);

  console.log('[props.Patients]', props.patients);
  if (isPatientsCollection && props.patients && props.patients.status === ACTION_STATUSES.SUCCEED) {
    let source = props.patients.data || [];
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
    setIsPatientsCollection(false);
  }
  const deleteRecordItemHandler = (id) => {
    props.deletePatient(id);
  }
  const saveHandler = (payload, mode) => {
    console.log('[Create Patient Handler]', payload, mode);
    const params = {
      name: payload.name,
      mr_nbr : payload.mrNbr,
      dob_at : payload.dob,
      soc_at : payload.soc,
      care_type : payload.careType && payload.careType.name ? payload.careType.name : '',
      place_of_service : payload.placeOfService,
      address : payload.address,
      contact_nbr : payload.contactNbr,
      assigned_rn : payload.assignRn,
      rn_visit_freq : payload.rnVisitFreq,
      assigned_cna : payload.assignCna,
      cna_visit_freq : payload.cnaVisitFreq,
      status : payload.status
    
    };
    if (mode === 'create') {
      props.createPatient(params);

    } else if (mode === 'edit') {
      params.id = payload.id;
      props.updatePatient(params);
    }
    setIsFormModal(false);




  }
  console.log('[Is Create Patient Collection]', props.createPatientState);
  if (isCreatePatientCollection && props.createPatientState && props.createPatientState.status === ACTION_STATUSES.SUCCEED) {
    setIsCreatePatientCollection(false);
    props.listPatients();

  }
  if (isUpdatePatientCollection && props.updatePatientState && props.updatePatientState.status === ACTION_STATUSES.SUCCEED) {
    setIsUpdatePatientCollection(false);
    props.listPatients();

  }
  if (isDeletePatientCollection && props.deletePatientState && props.deletePatientState.status === ACTION_STATUSES.SUCCEED) {
    setIsDeletePatientCollection(false);
    props.listPatients();

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
    let fileName = `patient_list_batch_${new Date().getTime()}`;

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
      <Grid container spacing={24} justify="space-between" style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
        <Grid container spacing={24} justify="space-between">
          <div>
            <Typography variant="h4">Patient Management</Typography>
          </div>
          <div>
            <FilterTable filterRecordHandler={filterRecordHandler} />
          </div>
        </Grid>

     

        <Grid container spacing={24} justify="space-between" style={{ paddingBottom: 10 }}>
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
              ADD PATIENT
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
        <PatientForm saveHandler={saveHandler} mode={mode} isOpen={isFormModal} isEdit={false} item={item} onClose={closeFormModalHandler} />
      }
    </React.Fragment>
  )
}
const mapStateToProps = store => ({
  patients: patientListStateSelector(store),
  createPatientState: patientCreateStateSelector(store),
  updatePatientState: patientUpdateStateSelector(store),
  deletePatientState: patientDeleteStateSelector(store)

});

const mapDispatchToProps = dispatch => ({
  listPatients: (data) => dispatch(attemptToFetchPatient(data)),
  resetListPatients: () => dispatch(resetFetchPatientState()),
  createPatient: (data) => dispatch(attemptToCreatePatient(data)),
  resetCreatePatient: () => dispatch(resetCreatePatientState()),
  updatePatient: (data) => dispatch(attemptToUpdatePatient(data)),
  resetUpdatePatient: () => dispatch(resetUpdatePatientState()),
  deletePatient: (data) => dispatch(attemptToDeletePatient(data)),
  resetDeletePatient: () => dispatch(resetDeletePatientState())

});

export default connect(mapStateToProps, mapDispatchToProps)(Patient);

