import React, { useEffect, useState } from "react";
import ModalHeader from "../../../Common/components/Modal/ModalHeader/ModalHeader";
import ModalFooter from "../../../Common/components/Modal/ModalFooter/ModalFooter";
import styles from "./distribution.module.css";
import ReactModal from "react-modal";
import { Avatar, Button, Grid, Tooltip, Typography, Divider} from "@mui/material";
import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import RegularDatePicker from "../../../Common/components/Date/RegularDatePicker";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import { DIVINE_EMPLOYEES, DIVINE_PATIENT_LIST, HOSPICE_FACILITIES, QUANTITY_UOM,  SUPPLY_STATUS } from "../../../utils/constants";
import RegularSelect from "../../../Common/components/Select/RegularSelect";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";
import TOAST from "../../../modules/toastManager";
import PrintForm from "./PrintForm";
let uoms = [];
let patients = [];
let employees = [];
let facilities = [];
let statuses = [];
SUPPLY_STATUS.forEach((item, index) => {
    statuses.push({
        ...item,
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'status'

    });
});
HOSPICE_FACILITIES.forEach((item, index) => {
    facilities.push({
        ...item,
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'facility'

    });
});
DIVINE_EMPLOYEES.forEach((item, index) => {
    employees.push({
        ...item,
        id: index,
        name: item.name,
        value: item.name,
        label: item.name,
        category: 'employee'

    });
});

DIVINE_PATIENT_LIST.forEach((item, index) => {
    patients.push({
        ...item,
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'patient'

    });
});

QUANTITY_UOM.forEach((item, index) => {
    uoms.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'uoms'

    })
});
function DistributionForm(props) {
    const [generalForm, setGeneralForm] = useState({});
    const [detailForm, setDetailForm] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const [isPrintForm,setIsPrintFrom] = useState(false);
    const { isOpen,
        onClose,

       } = props;

    const general = [
        {
            id: 'orderDt',
            component: 'datepicker',
            placeholder: 'Requested Date',
            label: 'Requested Date',
            name: 'orderDt',
            disabled: props.mode && props.mode === 'view' ? true : false

        },
        {
            id: 'patient',
            component: 'singlecomplete',
            placeholder: 'Patient Name',
            label: 'Patient Name',
            name: 'patient',
            options: [...props.patientList],
            disabled: props.mode && props.mode === 'view' ? true : false
        },
        {
            id: 'facility',
            component: 'textfield',
            placeholder: 'Facility/POS',
            label: 'Facility/POS',
            name: 'facility',
            disabled: true,
            value : '-'

        },

        {
            id: 'requestor',
            component: 'singlecomplete',
            placeholder: 'Requestor',
            label: 'Requestor',
            name: 'requestor',
            options: [...props.employeeList],
            disabled: props.mode && props.mode === 'view' ? true : false

        },
        {
            id: 'position',
            component: 'textfield',
            placeholder: 'Title',
            label: 'Title',
            name: 'position',
            value: '-',
            disabled: true

        },
        {
            id: 'caregiver',
            component: 'textfield',
            placeholder: 'Patient Caregiver',
            label: 'Patient Caregiver',
            name: 'caregiver',
            disabled: props.mode && props.mode === 'view' ? true : false
        },

        {
            id: 'status',
            component: 'singlecomplete',
            placeholder: 'Status',
            label: 'Status',
            name: 'status',
            options: statuses,
            disabled: props.mode && props.mode === 'view' ? true : false

        }

    ]

    const details = [
        {
            id: 'search',
            component: 'singlecomplete',
            placeholder: 'Search Item',
            label: 'Search Item',
            name: 'search',
            options : [...props.productList]
        },
        {
            id: 'description',
            component: 'textfield',
            placeholder: 'Description',
            label: 'Description',
            name: 'description',
            disabled : true
        },
        {
            id: 'orderQty',
            component: 'textfield',
            placeholder: 'Order Qty in Pcs',
            label: 'Order Qty in Pcs',
            name: 'orderQty',
            type: 'number'
        },
        {
            id: 'vendor',
            component: 'textfield',
            placeholder: 'Vendor',
            label: 'Vendor',
            name: 'vendor',
            type: 'test',
            value :'-'
        },
       
       
     
    ]
    useEffect(() => {
        console.log('[props distribution form]',props);
        const fm = {};
        fm.orderDt = new Date();
        fm.position = '-';
        fm.facility = '-';
        setGeneralForm(fm);
    }, []);
    useEffect(() => {
        if (props.item) {
            console.log('[items]', props.item);
            const generalFm = { ...props.item };
            generalFm.orderDt = new Date(generalFm.order_at);
            const detailFm = generalFm.details ? generalFm.details : [generalFm] ;

            setGeneralForm(generalFm);
            setDetailForm(detailFm);


        }
    }, [props.item]);
    const printHandler = () => {
        setIsPrintFrom(true);
        console.log('[Print Handler]',generalForm,detailForm);
    }
    const validateFormHandler = () => {
        if(!generalForm.patientName) {
            TOAST.error('Patient Name is required');
            return;
        }
        if(!generalForm.requestorName) {
            TOAST.error('Requestor is required');
            return;
        }
        if(!generalForm.facility) {
            TOAST.error('location is required');
            return;
        }
        props.createDistributionHandler(generalForm,detailForm,props.mode);
        
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
            title: props.distribution ? "Print Supplies" : "Print Supplies",
            type: "primary",
            event: "print",
            callback: () => {
                console.log('[Call me]');
                printHandler();
            },
        },
        {
            title: "Cancel",
            type: "default",
            event: "cancel",
            callback: () => {
                console.log('[Cancel me]');
                props.onClose();
            },
        },
    ];
    const inputGeneralHandler = ({ target }) => {
        console.log('[Target]', target, generalForm);
        const source = { ...generalForm };
        source[target.name] = target.value;
        setGeneralForm(source);

    };
    const inputDetailHandler = ({ target }, source) => {
        console.log('[source]',target,source,props.stockList);
        source[target.name] = target.value;
       
        if(target.name === 'orderQty') {
            const qtyOnHand = props.stockList.find(stock => stock.productId === source.productId).qty_on_hand;
            const calc = parseInt(qtyOnHand,10) - parseInt(target.value||0,10);
            if(calc > 0) {
                source.stockStatus = 'In Stock';
            } else {
                source.stockStatus = 'Out of Stock';
            }
        }
        setIsRefresh(!isRefresh);

    };
    const autoCompleteGeneralInputHander = (item) => {
        const src = { ...generalForm };
        console.log('[src]', src, item);
        
        if (item.categoryType === 'employee') {
            src['requestor'] = item;
            
            src['position'] = item.position;
            src['requestorName'] = item.name;
        
        } else if (item.categoryType === 'patient') {
            src['patient'] = item;  
            src['patientName'] = item.name;
            src['patientId'] = item.id;
            src['facility'] = item.place_of_service;
            
        } else if (item.category === 'status') {
            src['status'] = item;
            src['statusName'] = item.name;
        }

        setGeneralForm(src);

    }
   
    const autoCompleteDetailInputHander = (item, source) => {
        
        source.search = item;
        console.log('[item]',item);
        source.description = `${item.description} / ${item.comments} / ${item.additional_info}`;
        source.productId = item.productId;
        source.category = item.category;
        source.vendor = item.vendor || '-';
        const productInfo = props.productList.find(product => product.id === item.productId);
        if(productInfo) {
        source.price_per_pcs = productInfo.price_per_pcs;
        }
        setIsRefresh(!isRefresh);

    }
    const onChangeGeneralInputHandler = (e) => {
        const src = { ...generalForm };
        if (!e.target.value) {
            src[e.target.name] = { name: '', label: '' };
            setGeneralForm(src);
        }
    }
    const onChangeDetailInputHandler = (e, source) => {
        if (!e.target.value) {
            source[e.target.name] = undefined;
            setIsRefresh(!isRefresh);
        }
    }
    const addItemHandler = () => {
        const records = [...detailForm];
        records.push({
            id: uuidv4(),
            description: '-',
            orderQty: 0,
            stockQty: 0,
            status: '',
            productId : ''
        });
        setDetailForm(records);
    }
    if (detailForm && detailForm.length === 0) {
        addItemHandler();
    }
    const deleteItemHandler = (indx) => {
        const fm = [...detailForm];
        fm.splice(indx,1);
       
        setDetailForm(fm);
    }
    const dateInputHandler = (name, value) => {
        const src = { ...generalForm };
        src[name] = moment(new Date(value)).format('YYYY-MM-DD HH:mm');
        setGeneralForm(src);
    }
    const titleHandler = () => {
        if (props.mode === 'view') {
            return 'View Supplies Delivery Record'
        } else if (props.mode === 'edit') {
            return 'Edit Supplies Delivery Record';
        } else {
            return 'Create Supplies Delivery Record';
        }
    }
    console.log('[general form]', generalForm, detailForm);
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
            <div className={styles.form}>
                <ModalHeader title={titleHandler()} onClose={onClose} />
                <div className={styles.content}>
                    <Typography variant="h6">General Information</Typography>
                    <Grid container spacing={1} direction="row">
                        {general.map(item => {
                            return (
                                <Grid item xs={4}>
                                    {item.component === 'textfield' ?
                                        <React.Fragment>
                                            <RegularTextField {...item} value={generalForm[item.name]} onChange={inputGeneralHandler} />
                                        </React.Fragment>
                                        : item.component === 'datepicker' ?
                                         
                                                <RegularDatePicker {...item} value={generalForm[item.name]} onChange={dateInputHandler} />
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
                    <br />
                    <Typography variant="h6">Supplies</Typography>
                    <Grid container>
            <Grid item xs={12} style={{paddingBottom:10}}>
              <Divider variant="fullWidth" style={{
                
                height: '.02em',
                border: 'solid 1px rgba(0, 0, 0, 0.12)'
              }} orientation="horizontal" flexItem />
            </Grid>
            <br />
          </Grid>
                    {detailForm.map((item,index) => {
                        return (
                            <Grid container spacing={1} direction="row" style={{paddingBottom:12}} key={`contr-${index}`}>

                                <Grid item xs={12}>
                                    <div style={{ display: 'inline-flex', gap: 10 }}>
                                    <Avatar  style={{color:'black',background:'white',border: '1px solid black'}}>{index+1}</Avatar>
                                    <div style={{paddingTop:4}}>
                                        <Tooltip title={'Delete Item'}>
                                    <DeleteIcon style={{color: '#F62100',fontSize:'24px',cursor:'pointer'}} onClick={() =>deleteItemHandler(index)}/>
                                    </Tooltip>
                                    
                                    </div>
                                 
                                        <div style={{width:800}}>
                                        <SingleWithClearAutoComplete
                                            disabled={props.mode && props.mode === 'view' ? true : false}
                                            source={item}
                                            {...details.find(d => d.id === 'search')}
                                            value={item['search']}
                                            onSelectHandler={autoCompleteDetailInputHander}
                                            onChangeHandler={onChangeDetailInputHandler}
                                            options={[...props.stockList]}
                                        />
                                        </div>
                                       

                                    </div>
                                </Grid>

                                <Grid item xs={8}>
                                    <RegularTextField disabled={props.mode && props.mode === 'view' ? true : false} source={item}  {...details.find(d => d.id === 'description')} value={item['description']||'-'} onChange={inputDetailHandler} />
                                </Grid>
                                <Grid item xs={2}>
                                    <RegularTextField disabled={props.mode && props.mode === 'view' ? true : false} source={item}  {...details.find(d => d.id === 'orderQty')} value={item['orderQty']} onChange={inputDetailHandler} />
                                </Grid>
                                <Grid item xs={2}>
                                    <RegularTextField disabled={true} source={item}   {...details.find(d => d.id === 'vendor')} value={item['vendor'] || '-'}/>
                                </Grid>
                                {item.stockStatus &&
                                <Grid item xs={2} >
                                <div id="in-stock" style={{borderRadius: '4px', border: '1px solid #9e9e9e', paddingTop: 8, paddingLeft: 8,paddingBottom:2 }}>
					
                                    <Typography variant="h6" style={{color:item.stockStatus === 'In Stock' ? 'blue':'red'}}>{item.stockStatus}</Typography>
                                    </div>
                                </Grid>
                    }
                             
                            </Grid>
                        )
                    })}

                    {details && details.length > 0 &&
                    <div style={{paddingTop:4}}>
                        <Button disabled={props.mode && props.mode === 'view' ? true : false} variant="outlined" color="primary" style={{ fontSize: 14 }} onClick={() => addItemHandler()}>Add Item</Button>
                    </div>
                    
                    }

                </div>
                <br />
                {props.mode && props.mode === 'view' ?
                    null :
                    <ModalFooter actions={footerActions} />
                }
            </div>
            {isPrintForm && 
            <PrintForm isOpen={isPrintForm} generalForm={generalForm} detailForm={detailForm}/>
}
        </ReactModal >

    );
};




export default DistributionForm;
