
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DataHandler from "./DataHandler";
import FilterTable from "./FilterTable";

import AddIcon from "@mui/icons-material/Add";

import { ACTION_STATUSES} from "../../../utils/constants";
import { useState } from "react";
import * as FileSaver from 'file-saver';

import EmployeeForm from "./EmployeeForm";
import { connect } from "react-redux";
import { employeeCreateStateSelector, employeeDeleteStateSelector, employeeListStateSelector, employeeUpdateStateSelector } from "../../../store/selectors/employeeSelector";
import { attemptToCreateEmployee, attemptToDeleteEmployee, attemptToFetchEmployee, attemptToUpdateEmployee, resetCreateEmployeeState, resetDeleteEmployeeState, resetFetchEmployeeState, resetUpdateEmployeeState } from "../../../store/actions/employeeAction";


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

const Employee = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isEmployeesCollection, setIsEmployeesCollection] = useState(true);
  const [isCreateEmployeeCollection, setIsCreateEmployeeCollection] = useState(true);
  const [isUpdateEmployeeCollection, setIsUpdateEmployeeCollection] = useState(true);
  const [isDeleteEmployeeCollection, setIsDeleteEmployeeCollection] = useState(true);
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

    if (!isEmployeesCollection && props.employees && props.employees.status === ACTION_STATUSES.SUCCEED) {
      props.resetListEmployees();
      setIsEmployeesCollection(true);

    }

    if (!isCreateEmployeeCollection && props.createEmployeeState && props.createEmployeeState.status === ACTION_STATUSES.SUCCEED) {
      props.resetCreateEmployee();
      setIsCreateEmployeeCollection(true);

    }
    if (!isUpdateEmployeeCollection && props.updateEmployeeState && props.updateEmployeeState.status === ACTION_STATUSES.SUCCEED) {
      props.resetUpdateEmployee();
      setIsUpdateEmployeeCollection(true);

      if (!isDeleteEmployeeCollection && props.deleteEmployeeState && props.deleteEmployeeState.status === ACTION_STATUSES.SUCCEED) {
        props.resetDeleteEmployee();
        setIsDeleteEmployeeCollection(true);

      }
    }
  }, [isEmployeesCollection, isCreateEmployeeCollection, isUpdateEmployeeCollection, isDeleteEmployeeCollection]);
  useEffect(() => {


    props.listEmployees(payloadHandler());
  }, []);

  console.log('[props.Employees]', props.employees);
  if (isEmployeesCollection && props.employees && props.employees.status === ACTION_STATUSES.SUCCEED) {
    let source = props.employees.data || [];
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
    setIsEmployeesCollection(false);
  }
  const deleteRecordItemHandler = (id) => {
    props.deleteEmployee(id);
  }
  const saveHandler = (payload, mode) => {
    console.log('[Create Employee Handler]', payload, mode);
    const params = {
      created_at: new Date(),
      name: payload.name,
      email: payload.email,
      position: payload.position,
      phone : payload.phone,
      employment_status : payload.statusName,
      hired_at : payload.hiredDt,
      dob : payload.dob
    

    };
    if (mode === 'create') {
      props.createEmployee(params);

    } else if (mode === 'edit') {
      params.id = payload.id;
      props.updateEmployee(params);
    }
    setIsFormModal(false);




  }
  console.log('[Is Create Employee Collection]', props.createEmployeeState);
  if (isCreateEmployeeCollection && props.createEmployeeState && props.createEmployeeState.status === ACTION_STATUSES.SUCCEED) {
    setIsCreateEmployeeCollection(false);
    props.listEmployees();

  }
  if (isUpdateEmployeeCollection && props.updateEmployeeState && props.updateEmployeeState.status === ACTION_STATUSES.SUCCEED) {
    setIsUpdateEmployeeCollection(false);
    props.listEmployees();

  }
  if (isDeleteEmployeeCollection && props.deleteEmployeeState && props.deleteEmployeeState.status === ACTION_STATUSES.SUCCEED) {
    setIsDeleteEmployeeCollection(false);
    props.listEmployees();

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
    let fileName = `employee_list_batch_${new Date().getTime()}`;

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
            <Typography variant="h4">Employee Management</Typography>
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
              ADD EMPLOYEE
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
        <EmployeeForm saveHandler={saveHandler} mode={mode} isOpen={isFormModal} isEdit={false} item={item} onClose={closeFormModalHandler} />
      }
    </React.Fragment>
  )
}
const mapStateToProps = store => ({
  employees: employeeListStateSelector(store),
  createEmployeeState: employeeCreateStateSelector(store),
  updateEmployeeState: employeeUpdateStateSelector(store),
  deleteEmployeeState: employeeDeleteStateSelector(store)

});

const mapDispatchToProps = dispatch => ({
  listEmployees: (data) => dispatch(attemptToFetchEmployee(data)),
  resetListEmployees: () => dispatch(resetFetchEmployeeState()),
  createEmployee: (data) => dispatch(attemptToCreateEmployee(data)),
  resetCreateEmployee: () => dispatch(resetCreateEmployeeState()),
  updateEmployee: (data) => dispatch(attemptToUpdateEmployee(data)),
  resetUpdateEmployee: () => dispatch(resetUpdateEmployeeState()),
  deleteEmployee: (data) => dispatch(attemptToDeleteEmployee(data)),
  resetDeleteEmployee: () => dispatch(resetDeleteEmployeeState())

});

export default connect(mapStateToProps, mapDispatchToProps)(Employee);

