import React, { useEffect, useState } from "react";
import ModalHeader from "../../../Common/components/Modal/ModalHeader/ModalHeader";
import ModalFooter from "../../../Common/components/Modal/ModalFooter/ModalFooter";
import styles from "./invoice.module.css";
import ReactModal from "react-modal";
import {  Grid } from "@mui/material";
import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import RegularDatePicker from "../../../Common/components/Date/RegularDatePicker";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import {  SUPPLY_PAYMENT_METHOD, SUPPLY_VENDOR } from "../../../utils/constants";
import RegularSelect from "../../../Common/components/Select/RegularSelect";
import moment from "moment";


let vendors = [];
let payments = [];
SUPPLY_PAYMENT_METHOD.forEach((item, index) => {
    payments.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'method'

    })
});

SUPPLY_VENDOR.forEach((item, index) => {
    vendors.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'vendor'

    })
});
function InvoiceForm(props) {
    const [generalForm, setGeneralForm] = useState({});
    const [isRefresh, setIsRefresh] = useState(false);
    const { isOpen,
        onClose,

        isEdit } = props;

    const general = [
      
        {
            id: 'invoiceDt',
            component: 'datepicker',
            placeholder: 'Invoice Date',
            label: 'Invoice Date',
            name: 'invoiceDt',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
        {
            id: 'invNumber',
            component: 'textfield',
            placeholder: 'Invoice Number',
            label: 'Invoice Number',
            name: 'invNumber',
            disabled: props.mode && props.mode === 'view' ? true : false
        },
        {
            id: 'grandTotal',
            component: 'textfield',
            placeholder: 'Grand Total',
            label: 'Grand Total',
            name: 'grandTotal',
            type:'number',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },

        {
            id: 'paymentMethod',
            component: 'singlecomplete',
            placeholder: 'Payment Method',
            label: 'Payment Method',
            name: 'paymentMethod',
            options: payments,
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
     
        {
            id: 'paymentDt',
            component: 'datepicker',
            placeholder: 'Payment Date',
            label: 'Payment Date',
            name: 'paymentDt',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
        {
            id: 'paymentInfo',
            component: 'textfield',
            placeholder: 'Payment Information',
            label: 'Payment Information',
            name: 'paymentInfo',
            disabled: props.mode && props.mode === 'view' ? true : false
            
        },
        {
            id: 'vendor',
            component: 'singlecomplete',
            placeholder: 'Vendor',
            label: 'Vendor',
            name: 'vendor',
            options : vendors,
            disabled: props.mode && props.mode === 'view' ? true : false
            
            
        }
    ]

    
    useEffect(() => {
        console.log('[effects 1]');
        const fm = {};
        fm.invoiceDt = new Date();
        fm.paymentDt = new Date();
        setGeneralForm(fm);
      },[]);
    useEffect(() => {
        if(props.item) {
            console.log('[effects 2]');
            console.log('[items]',props.item);
            
            const generalFm = {...props.item};
            generalFm.invoiceDt = moment(new Date(generalFm.invoiced_at)).format('YYYY-MM-DD HH:mm');
            generalFm.invNumber = generalFm.invoice_number;
            generalFm.grandTotal = parseFloat(generalFm.grand_total).toFixed(2);
            generalFm.paymentMethod = payments.find(payment => payment.name === generalFm.payment_method);
            generalFm.paymentDt = moment(new Date(generalFm.payment_at)).format('YYYY-MM-DD HH:mm');
            generalFm.paymentInfo = generalFm.payment_info;
            generalFm.vendor = vendors.find(vendor => vendor.name === generalFm.vendor);
            setGeneralForm(generalFm);
            
            
            
        }
    }, [props.item]);
    const validateFormHandler = () => {
        props.createInvoiceHandler(generalForm,props.mode);
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
        setGeneralForm(source);

    };
    const autoCompleteGeneralInputHander = (item) => {
        const src = { ...generalForm };
        console.log('[src]',src,item);
        if(item.category === 'method') {
         src['paymentMethod'] = item;
         src['method'] = item.name;
        } else if(item.category === 'vendor') {
            src['vendor'] = item;
            src['vendorName'] = item.name;
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
    
    
    const dateInputHandler = (value, name) => {
        const src = { ...generalForm };
        src[name] = value;
        setGeneralForm(src);
      }
      const titleHandler = () => {
          if(props.mode === 'view') {
                return 'View Invoice Statement'
          } else if (props.mode === 'edit') {
              return 'Edit Invoice Statement';
          } else {
              return 'Create Invoice Statement';
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
                                <Grid item xs={4}>
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




export default InvoiceForm;
