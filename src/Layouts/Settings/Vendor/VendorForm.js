import React, { useEffect, useState } from "react";
import ModalHeader from "../../../Common/components/Modal/ModalHeader/ModalHeader";
import ModalFooter from "../../../Common/components/Modal/ModalFooter/ModalFooter";
import styles from "./vendor.module.css";
import ReactModal from "react-modal";
import {  Grid } from "@mui/material";
import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import RegularDatePicker from "../../../Common/components/Date/RegularDatePicker";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import {  EMPLOYMENT_STATUS } from "../../../utils/constants";
import RegularSelect from "../../../Common/components/Select/RegularSelect";
import moment from "moment";





function VendorForm(props) {
    const [generalForm, setGeneralForm] = useState({});
    const { isOpen,
        onClose,

        isEdit } = props;
       
    const general = [
      
        {
            id: 'name',
            component: 'textfield',
            placeholder: 'Vendor Name',
            label: 'Vendor Name',
            name: 'name',
            disabled: props.mode && props.mode === 'view' ? true : false,
            cols: 4 
            
        },
        {
            id: 'website',
            component: 'textfield',
            placeholder: 'Website',
            label: 'Website',
            name: 'website',
            disabled: props.mode && props.mode === 'view' ? true : false,
            cols: 4 
            
        },
        {
            id: 'location',
            component: 'textfield',
            placeholder: 'Location',
            label: 'Location',
            name: 'location',
            disabled: props.mode && props.mode === 'view' ? true : false,
            cols: 4 
            
        },
      
        {
            id: 'contact_person',
            component: 'textfield',
            placeholder: 'Contact Person',
            label: 'Contact Person',
            name: 'contact_person',
            disabled: props.mode && props.mode === 'view' ? true : false,
            cols: 4 
            
        },
        {
            id: 'phone',
            component: 'textfield',
            placeholder: 'Contact Phone',
            label: 'Contact Phone',
            name: 'phone',
            disabled: props.mode && props.mode === 'view' ? true : false,
            cols: 4 
            
        },
        {
            id: 'fax',
            component: 'textfield',
            placeholder: 'Fax Number',
            label: 'Fax Number',
            name: 'fax',
            disabled: props.mode && props.mode === 'view' ? true : false,
            cols: 4 
            
        },
        {
            id: 'account_number',
            component: 'textfield',
            placeholder: 'Account Number',
            label: 'Account Number',
            name: 'account_number',
            disabled: props.mode && props.mode === 'view' ? true : false,
            cols: 4 
            
        },
        
    ]

    
    useEffect(() => {
        console.log('[effects 1]');
        const fm = {};
        fm.created_at = new Date();
        setGeneralForm(fm);
      },[]);
    useEffect(() => {
        if(props.item) {
            console.log('[effects 2]');
            console.log('[items]',props.item);
            
            const generalFm = {...props.item};
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




export default VendorForm;
