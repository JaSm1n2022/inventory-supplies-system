
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DataHandler from "./DataHandler";
import AddIcon from "@mui/icons-material/Add";
import { ACTION_STATUSES } from "../../../utils/constants";
import { useState } from "react";
import * as FileSaver from 'file-saver';
import { connect } from "react-redux";
import { patientListStateSelector } from "../../../store/selectors/patientSelector";
import { attemptToFetchPatient, resetFetchPatientState } from "../../../store/actions/patientAction";
import Helper from "../../../utils/helper";
import ActionsFunction from "../../../Common/components/inventorySystem/ActionsFunction";
import ThresholdForm from "./ThresholdForm";

import { employeeListStateSelector } from "../../../store/selectors/employeeSelector";
import { attemptToFetchEmployee, resetFetchEmployeeState } from "../../../store/actions/employeeAction";
let originalSource = [];
let isListEmployeeDone = false;
let isListPatientDone = false;
let patientList = [];
let employeeList = [];
const Threshold = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isPatientsCollection, setIsPatientsCollection] = useState(true);
  const [isFormModal, setIsFormModal] = useState(false);
  const [item, setItem] = useState(undefined);
  const [mode, setMode] = useState('create');
  function payloadHandler() {
    /*
    const payload = {
    from : `${DEFAULT_DATE_RANGE.from} 00:00:00`,
    to: `${DEFAULT_DATE_RANGE.to} 23:59:00`
  */

    return null;
  }

  useEffect(() => {

    if (!isPatientsCollection && props.patients && props.patients.status === ACTION_STATUSES.SUCCEED) {
      isListPatientDone = true;
      props.resetListPatients();
      setIsPatientsCollection(true);

    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPatientsCollection]);
  useEffect(() => {
    props.listEmployees();

    props.listPatients(payloadHandler());
  }, []);

  const createFormHandler = (data, mode) => {
    setItem(data);
    setMode(mode || 'create');
    setIsFormModal(true);
    console.log('[Create Threshold form]');
  }
  console.log('[props.Patients]', props.patients);
  if (isPatientsCollection && props.patients && props.patients.status === ACTION_STATUSES.SUCCEED) {
    patientList = [];

    let source = props.patients.data || [];
    source.forEach((s, indx) => {
      if (s.status === 'Active') {
        s.label = s.name;
        s.value = s.name;
        s.id = indx;
        s.title = s.name;
        s.description = s.name;
        s.category = 'patient';
        patientList.push(s);
      }
    })

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
      mr_nbr: payload.mrNbr,
      dob_at: payload.dob || new Date(),
      soc_at: payload.soc || new Date(),
      eoc_at: payload.eoc || new Date(),
      care_type: payload.careType && payload.careType.name ? payload.careType.name : '',
      place_of_service: payload.placeOfService,
      address: payload.address,
      contact_nbr: payload.contactNbr,
      assigned_rn: payload.assignRn,
      rn_visit_freq: payload.rnVisitFreq,
      assigned_cna: payload.assignCna,
      cna_visit_freq: payload.cnaVisitFreq,
      status: payload.status && payload.status.name ? payload.status.name : '',

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

  const filterRecordHandler = (keyword) => {
    console.log('[Keyword]', keyword);
    if (!keyword) {
      setDataSource([...originalSource]);
    } else {
      const temp = [...originalSource];
      const found = temp.filter(data => data.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);

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

  const closeFormModalHandler = () => {
    setIsFormModal(false);
  }
  if (props.employees && props.employees.status === ACTION_STATUSES.SUCCEED) {
    isListEmployeeDone = true;
    employeeList = [...props.employees.data];
    employeeList.forEach(item => {
      item.name = item.name.toUpperCase();
      item.value = item.name.toUpperCase();
      item.label = item.name.toUpperCase();
      item.categoryType = 'employee'
    });

    props.resetListEmployees();
  }

  return (
    <React.Fragment>
      {isListEmployeeDone && isListPatientDone ?
        <Grid container style={{ paddingTop: 12 }}>
          <Grid container justifyContent="space-between">
            <div>
              <Typography variant="h4">Plot Order Threshold Management</Typography>
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
                ADD THRESHOLD
              </Button>

            </div>
          </Grid>

        </Grid>
        : <div><CircularProgress>Loading...</CircularProgress></div>
      }
      {isFormModal &&
        <ThresholdForm requestorList={employeeList} patientList={patientList} saveHandler={saveHandler} mode={mode} isOpen={isFormModal} isEdit={false} item={item} onClose={closeFormModalHandler} />
      }
    </React.Fragment>
  )
}
const mapStateToProps = store => ({
  patients: patientListStateSelector(store),
  employees: employeeListStateSelector(store),
});

const mapDispatchToProps = dispatch => ({

  listPatients: (data) => dispatch(attemptToFetchPatient(data)),
  resetListPatients: () => dispatch(resetFetchPatientState()),
  listEmployees: (data) => dispatch(attemptToFetchEmployee(data)),
  resetListEmployees: () => dispatch(resetFetchEmployeeState()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Threshold);

