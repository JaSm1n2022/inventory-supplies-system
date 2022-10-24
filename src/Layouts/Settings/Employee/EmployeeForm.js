import React, { useEffect, useState } from "react";
import ModalHeader from "../../../Common/components/Modal/ModalHeader/ModalHeader";
import ModalFooter from "../../../Common/components/Modal/ModalFooter/ModalFooter";
import styles from "./employee.module.css";
import ReactModal from "react-modal";
import {  Grid } from "@mui/material";
import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import RegularDatePicker from "../../../Common/components/Date/RegularDatePicker";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import {  EMPLOYMENT_STATUS } from "../../../utils/constants";
import RegularSelect from "../../../Common/components/Select/RegularSelect";
import moment from "moment";



let statuses = [];
EMPLOYMENT_STATUS.forEach((item, index) => {
    statuses.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'employeeStatus'

    })
});

function EmployeeForm(props) {
    const [generalForm, setGeneralForm] = useState({});
    const { isOpen,
        onClose,

        isEdit } = props;

    const general = [
      
        {
            id: 'name',
            component: 'textfield',
            placeholder: 'Employee Name',
            label: 'Employee Name',
            name: 'name',
            disabled: props.mode && props.mode === 'view' ? true : false,
            cols: 4 
            
        },
        {
            id: 'email',
            component: 'textfield',
            placeholder: 'Email',
            label: 'Email',
            name: 'email',
            disabled: props.mode && props.mode === 'view' ? true : false,
            cols: 4 
            
        },
        {
            id: 'position',
            component: 'textfield',
            placeholder: 'Position',
            label: 'Position',
            name: 'position',
            disabled: props.mode && props.mode === 'view' ? true : false,
            cols: 4 
            
        },
      
        {
            id: 'phone',
            component: 'textfield',
            placeholder: 'Contact Number',
            label: 'Contact Number',
            name: 'phone',
            disabled: props.mode && props.mode === 'view' ? true : false,
            cols: 4 
            
        },
        {
            id: 'status',
            component: 'singlecomplete',
            placeholder: 'Employee Status',
            label: 'Employee Status',
            name: 'status',
            options: statuses,
            disabled: props.mode && props.mode === 'view' ? true : false,
            cols: 4 
            
        },
        {
            id: 'hiredDt',
            component: 'datepicker',
            placeholder: 'Hired Date',
            label: 'Hired Date',
            name: 'hiredDt',
            disabled: props.mode && props.mode === 'view' ? true : false,
            cols: 4 
            
        },
        {
            id: 'dob',
            component: 'datepicker',
            placeholder: 'DOB',
            label: 'DOB',
            name: 'dob',
            disabled: props.mode && props.mode === 'view' ? true : false,
            cols: 4 
            
        }
        
    ]

    
    useEffect(() => {
        console.log('[effects 1]');
        const fm = {};
        fm.created_at = new Date();
        fm.pricePerPcs = 0.0;
        setGeneralForm(fm);
      },[]);
    useEffect(() => {
        if(props.item) {
            console.log('[effects 2]');
            console.log('[items]',props.item);
            
            const generalFm = {...props.item};
            generalFm.created_at = moment(new Date(generalFm.created_at)).utc().format('YYYY-MM-DD');
            generalFm.hired_at = moment(new Date(generalFm.hired_at)).utc().format('YYYY-MM-DD');
            generalFm.dob = moment(new Date(generalFm.dob)).utc().format('YYYY-MM-DD');
            generalFm.status = statuses.find(v => v.name === generalFm.employement_status);
            
            setGeneralForm(generalFm);
            
            
            
        }
    }, [props.item]);
    const validateFormHandler = () => {
        props.saveHandler(generalForm,props.mode);
    }
    const footerActions = [
        {
            title: props.distribution ? "Apply" : "Save",
            type: "primary",
            event: "submit",
            callback: () => {
                validateFormHandler();
            },
        },
        {
            title: "Cancel",
            type: "default",
            event: "cancel",
            callback: () => {
                props.onClose();
            },
        },
    ];
    const inputGeneralHandler = ({ target }) => {
        console.log('[Target]',target,generalForm);
        const source = { ...generalForm};
        source[target.name] = target.value;
        if(target.name === 'count' || target.name === 'unitPrice') {
            source.pricePerPcs = parseFloat(parseFloat(source.unitPrice) / parseInt(source.count || 1,10)).toFixed(2);
        }
        setGeneralForm(source);

    };
    const autoCompleteGeneralInputHander = (item) => {
        const src = { ...generalForm };
        console.log('[src]',src,item);
        if(item.category === 'employeeStatus') {
         src['status'] = item;
         src['statusName'] = item.name;
        }
       
        setGeneralForm(src);
        
    }
    const onChangeGeneralInputHandler = (e) => {
        const src = { ...generalForm };
        if (!e.target.value) {
            src[e.target.name] = { name: '', label: '' };
            setGeneralForm(src);
        }
    }
    
    
    const dateInputHandler = (name,value) => {
        const src = { ...generalForm };
        src[name] = value;
        setGeneralForm(src);
      }
      const titleHandler = () => {
          if(props.mode === 'view') {
                return 'View Employee'
          } else if (props.mode === 'edit') {
              return 'Edit Employee';
          } else {
              return 'Create Employee';
          }
      }
      console.log('[general form]',generalForm);
    return (
        <ReactModal
            style={{
                overlay: {
                    zIndex: 999,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.65)'
                },
                content: {
                    position: 'absolute',
                    top: '0',
                    bottom: '0',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: '0',
                    left: '0',
                    overflow: 'none',
                    WebkitOverflowScrolling: 'touch',
                    border: 'none',
                    padding: '0px',
                    background: 'none'
                }
            }}
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
        >
            <div className={styles.invoiceForm}>
                <ModalHeader title={titleHandler()} onClose={onClose} />
                <div className={styles.content}>
                    <Grid container spacing={1} direction="row">
                        {general.map(item => {
                            return (
                                <Grid item xs={item.cols ? item.cols : 3}>
                                    {item.component === 'textfield' ?
                                        <React.Fragment>
                                            <RegularTextField {...item} value={generalForm[item.name]} onChange={inputGeneralHandler} />
                                        </React.Fragment>
                                        : item.component === 'datepicker' ?
                                            <React.Fragment>
                                                 <RegularDatePicker {...item} value={generalForm[item.name]} onChange={dateInputHandler} />
                                            </React.Fragment>
                                            : item.component === 'singlecomplete' ?
                                                <React.Fragment>
                                                    <SingleWithClearAutoComplete
                                                        {...item}
                                                        value={generalForm[item.name]}
                                                        onSelectHandler={autoCompleteGeneralInputHander}
                                                        onChangeHandler={onChangeGeneralInputHandler}
                                                        />
                                                </React.Fragment>
                                                : item.component === 'select' ?
                                                    <React.Fragment>
                                                        <RegularSelect 	{...item} 

                                                            onChange={inputGeneralHandler}
                                                            value={generalForm[item.value]}
                                                        />
                                                    </React.Fragment>
                                                    : null
                                    }
                                </Grid>
                            )
                        })}
                    </Grid>
                    

                </div>
                <br />
                {props.mode && props.mode === 'view' ?
                null : 
                <ModalFooter actions={footerActions} />
}   
            </div>
        </ReactModal >

    );
};




export default EmployeeForm;
