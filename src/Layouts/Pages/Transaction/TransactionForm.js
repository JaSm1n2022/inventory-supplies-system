import React, { useEffect, useState } from "react";
import ModalHeader from "../../../Common/components/Modal/ModalHeader/ModalHeader";
import ModalFooter from "../../../Common/components/Modal/ModalFooter/ModalFooter";
import styles from "./transaction.module.css";
import ReactModal from "react-modal";
import { Avatar, Button, Divider, Grid, Tooltip, Typography } from "@mui/material";
import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import RegularDatePicker from "../../../Common/components/Date/RegularDatePicker";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import { DEFAULT_ITEM, QUANTITY_UOM, SUPPLY_CATEGORY, SUPPLY_PAYMENT_METHOD, SUPPLY_STATUS, SUPPLY_VENDOR } from "../../../utils/constants";
import RegularSelect from "../../../Common/components/Select/RegularSelect";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";
let categoryList = [];
let uoms = [];
let vendors = [];
let statuses = [];
let paymentMethods = [];
SUPPLY_PAYMENT_METHOD.forEach((item, index) => {
    paymentMethods.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'payments'

    })
});
SUPPLY_STATUS.forEach((item, index) => {
    statuses.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'supplyStatus'

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
QUANTITY_UOM.forEach((item, index) => {
    uoms.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'uom'

    })
});
SUPPLY_CATEGORY.forEach((item, index) => {
    categoryList.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'category'

    })
});
function TransportationForm(props) {
    const [generalForm, setGeneralForm] = useState({});
    const [detailForm, setDetailForm] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [isRefresh, setIsRefresh] = useState(false);
    const { isOpen,
        onClose,
        isEdit } = props;
    const details = [

        {
            id: 'description',
            component: 'textfield',
            placeholder: 'Description',
            label: 'Description',
            name: 'description',
            cols: 6
        },

        {
            id: 'qty',
            component: 'textfield',
            placeholder: 'Qty',
            label: 'Qty',
            name: 'qty',
            type: 'number'
        },


        {
            id: 'unitPrice',
            component: 'textfield',
            placeholder: 'Unit Price',
            label: 'Unit Price',
            name: 'unitPrice',
            type: 'number',


        },
        {
            id: 'totalPrice',
            component: 'textfield',
            placeholder: 'Total Price',
            label: 'Total Price',
            name: 'totalPrice',
            type: 'number',
            disabled: true


        },

        {
            id: 'vendor',
            component: 'singlecomplete',
            placeholder: 'Vendor',
            label: 'Vendor',
            name: 'vendor',
            options: vendors

        },
        {
            id: 'grandTotal',
            component: 'textfield',
            placeholder: 'Grand Total',
            label: 'Grand Total',
            name: 'grandTotal',
            type: 'number'

        },
    ]
    const general = [
        {
            id: 'orderedDt',
            component: 'datepicker',
            placeholder: 'Date Order',
            label: 'Date Order',
            name: 'orderedDt',
        },
        {
            id: 'orderNumber',
            component: 'textfield',
            placeholder: 'Order Number',
            label: 'Order Number',
            name: 'orderNumber'
        },
        {
            id: 'status',
            component: 'singlecomplete',
            placeholder: 'Status',
            label: 'Status',
            name: 'status',
            options: statuses

        },
        {
            id: 'expectedDeliveryDt',
            component: 'datepicker',
            placeholder: 'Expected Delivery Date',
            label: 'Expected Delivery Date',
            name: 'expectedDeliveryDt'

        },

        {
            id: 'paymentMethod',
            component: 'singlecomplete',
            placeholder: 'Payment Method',
            label: 'Payment Method',
            name: 'paymentMethod',
            options: paymentMethods,
            value : paymentMethods.find(method => method.name === 'Card')

        },
        {
            id: 'paymentInfo',
            component: 'textfield',
            placeholder: 'Payment Info',
            label: 'Payment Info',
            name: 'paymentInfo'

        },
        {
            id: 'paymentDt',
            component: 'datepicker',
            placeholder: 'Paid On',
            label: 'Paid On',
            name: 'paymentDt'

        }
    ]


    useEffect(() => {
        console.log('[effects 1]');
        const fm = {};
        fm.created_at = new Date();
        fm.orderedDt = new Date();
        fm.paymentDt = new Date();
       
        fm.expectedDeliveryDt = new Date();
        fm.paymentMethod = paymentMethods.find(m => m.name === 'Card');
        fm.status = statuses.find(s => s.name === 'Order');
        setGeneralForm(fm);
    }, []);
    useEffect(() => {
        if (props.item) {

            console.log('[use effect transaction items]', props.item);
            const fm = { ...props.item };
            fm.expectedDeliveryDt = `${fm.expected_delivery_at}T00:00:00.000Z`;
            fm.grandTotal = parseFloat(fm.grand_total || 0.00).toFixed(2);
            fm.orderNumber = fm.order_number;
            fm.orderedDt = `${fm.ordered_at}T00:00:00.000Z`;
            fm.paymentInfo = fm.payment_info;
            fm.paymentMethod = fm.payment_method ? paymentMethods.find(pm => pm.name === fm.payment_method) : DEFAULT_ITEM;
            fm.paymentDt = `${fm.payment_transaction_at}T00:00:00.000Z`;
            fm.status = fm.status ? statuses.find(s => s.name === fm.status) : DEFAULT_ITEM;
            const source = {};
            source.category =fm.category;
            source.item = fm.item;
            source.size = fm.size;
            source.qty = fm.qty;
            
            source.dimension =fm.dimension;
            source.qty_uom = fm.qty_uom;
            source.count = fm.count;
           source.unit_price = fm.unit_price;
           source.price_per_pcs = fm.price_per_pcs;
           source.vendor = fm.vendor;
            source.unitPrice = fm.unit_price;
            source.totalPrice = fm.total_price;
            source.grandTotal = fm.grand_total;
            source.description =fm.description;
           
            source.price_per_pcs = fm.price_per_pcs;
           setDetailForm([source]);
            setGeneralForm(fm);



        }
    }, [props.item]);
    const validateFormHandler = () => {
        props.createTransactionHandler(generalForm, detailForm,props.mode);
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
        console.log('[Target]', target, generalForm);
        const source = { ...generalForm };
        source[target.name] = target.value;
        if (['qty', 'unitPiece', 'unitPrice'].includes(target.name)) {
            source.totalPcs = parseInt(source.qty || 0, 10) * parseInt(source.unitPiece || 0, 10);
            source.totalPrice = parseFloat(parseFloat(source.qty || 0) * parseFloat(source.unitPrice || 0)).toFixed(2)
            source.pricePerPcs = parseFloat(parseFloat(source.unitPrice || 0) / parseFloat(source.unitPiece || 0)).toFixed(2)
            source.grandTotal =  source.totalPrice;
        }
        setGeneralForm(source);

    };
    const autoCompleteGeneralInputHander = (item) => {
        const src = { ...generalForm };
        console.log('[src]', src, item);
        if (item.category === 'category') {
            src['category'] = item;
            src['categoryName'] = item.name;
        } else if (item.category === 'uom') {
            src['qtyUom'] = item;
            src['uom'] = item.name;
        } else if (item.category === 'vendor') {
            src['vendor'] = item;
            src['vendorName'] = item.name;
        } else if (item.category === 'supplyStatus') {
            src['status'] = item;
            src['statusName'] = item.name;
        } else if (item.category === 'payments') {
            src['paymentMethod'] = item;
            src['payment'] = item.name;
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
    const onChangeDetailInputHandler = (e, source) => {
        if (!e.target.value) {
            source[e.target.name] = undefined;
            setIsRefresh(!isRefresh);
        }
    }
    const autoCompleteDetailInputHander = (item, source) => {

        source.search = item;
        console.log('   ', item);
        
        source.productId = item.productId;
        source.category = item.category;
        source.vendor = item.vendor || '-';
        source.qty = 1;
        const productInfo = props.productList.find(product => product.id === item.id);
        if (productInfo) {
            source.category = productInfo.category;
            source.item = productInfo.item;
            source.size = productInfo.size;
            source.dimension = productInfo.dimension;
            source.qty_uom = productInfo.qty_uom;
            source.count = productInfo.count;
           source.unit_price = productInfo.unit_price;
           source.price_per_pcs = productInfo.price_per_pcs;
           source.vendor = productInfo.vendor;
            source.unitPrice = productInfo.unit_price;
            source.totalPrice = productInfo.unit_price;
            source.grandTotal = productInfo.unit_price;
            source.productInfo = productInfo;
            source.description = productInfo.description;
            source.unitDistribution = productInfo.unit_distribution;
            source.price_per_pcs = productInfo.price_per_pcs;
            source.search.shortDescription = productInfo.short_description;
            source.search.unitDistribution = productInfo.unit_distribution;
            source.search.category = productInfo.category;
            source.search.vendor = productInfo.vendor;
            source.search.size = productInfo.size;
        }
        setIsRefresh(!isRefresh);

    }
    const deleteItemHandler = (indx) => {
        const fm = [...detailForm];
        fm.splice(indx, 1);

        setDetailForm(fm);
    }
    const dateInputHandler = (name, value) => {
        const src = { ...generalForm };
        src[name] = value;
        setGeneralForm(src);
    }
    const addItemHandler = () => {
        const records = [...detailForm];
        records.push({
            id: uuidv4(),
            description: '-',
            qty: 0,
            unitPrice : 0,
            totalPrice : 0,
            grandTotal : 0
        
        });
        setDetailForm(records);
    }
    const titleHandler = () => {
        if (props.mode === 'view') {
            return 'View Transaction'
        } else if (props.mode === 'edit') {
            return 'Edit Transaction';
        } else {
            return 'Create Transaction';
        }
    }
    const inputDetailHandler = ({ target }, source) => {
        source[target.name] = target.value;
          console.log('[Target]', target, generalForm);
            if (['qty', 'unitPiece', 'unitPrice'].includes(target.name)) {
                source.totalPcs = parseInt(source.qty || 0, 10) * parseInt(source.unitPiece || 0, 10);
                source.totalPrice = parseFloat(parseFloat(source.qty || 0) * parseFloat(source.unitPrice || 0)).toFixed(2)
                source.pricePerPcs = parseFloat(parseFloat(source.unitPrice || 0) / parseFloat(source.unitPiece || 0)).toFixed(2)
                source.grandTotal =  source.totalPrice;
            }
        setIsRefresh(!isRefresh);

    };
   
    if (detailForm && detailForm.length === 0) {
        addItemHandler();
    }
    console.log('[general form]', generalForm);
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
            <div className={props.mode === 'edit' ? styles.invoiceEditForm : styles.invoiceForm}>
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

                    <br />
                    <Typography variant="h6">Items</Typography>
                    <Grid container>
                        <Grid item xs={12} style={{ paddingBottom: 10 }}>
                            <Divider variant="fullWidth" style={{

                                height: '.02em',
                                border: 'solid 1px rgba(0, 0, 0, 0.12)'
                            }} orientation="horizontal" flexItem />
                        </Grid>
                        <br />
                    </Grid>
                    {detailForm.map((item, index) => {
                        return (
                            <Grid container spacing={1} direction="row" style={{ paddingBottom: 12 }} key={`contr-${index}`}>

                                <Grid item xs={12}>
                                    <div style={{ display: 'inline-flex', gap: 10 }}>
                                        <Avatar style={{ height: 24, width: 24, color: 'black', background: 'white', border: '1px solid black' }}>{index + 1}</Avatar>
                                        <div style={{ paddingTop: 4 }}>
                                            <Tooltip title={'Delete Item'}>
                                                <DeleteIcon style={{ color: '#F62100', fontSize: '24px', cursor: 'pointer' }} onClick={() => deleteItemHandler(index)} />
                                            </Tooltip>
                                        </div>
                                        <div style={{ width: 400 }}>
                                            <SingleWithClearAutoComplete
                                                disabled={props.mode && props.mode === 'view' ? true : false}
                                                source={item}
                                                {...details.find(d => d.id === 'search')}
                                                value={item['search']}
                                                onSelectHandler={autoCompleteDetailInputHander}
                                                onChangeHandler={onChangeDetailInputHandler}
                                                options={[...props.productList]}
                                            />
                                        </div>
                                        <div style={{ width: 400 }}>
                                            <RegularTextField disabled={true} source={item}  {...details.find(d => d.id === 'description')} value={item['description'] || '-'} onChange={inputDetailHandler} />
                                        </div>
                                        <div style={{ width: 100 }}>
                                        <RegularTextField disabled={false} source={item}  {...details.find(d => d.id === 'qty')} value={item['qty']} onChange={inputDetailHandler} />
                                        </div>
                                        <div style={{ width: 100 }}>
                                        <RegularTextField disabled={false} source={item}  {...details.find(d => d.id === 'unitPrice')} value={item['unitPrice']} onChange={inputDetailHandler} />
                                        </div>
                                        <div style={{ width: 120 }}>
                                        <RegularTextField disabled={true} source={item}  {...details.find(d => d.id === 'totalPrice')} value={item['totalPrice']} onChange={inputDetailHandler} />
                                        </div>
                                        <div style={{ width: 120 }}>
                                        <RegularTextField disabled={props.mode && props.mode === 'view' ? true : false} source={item}  {...details.find(d => d.id === 'grandTotal')} value={item['grandTotal']} onChange={inputDetailHandler} />
                                        </div>
                                    </div>
                                </Grid>

                            </Grid>
                        )
                    })}


                    <div style={{ paddingTop: 4, display: props.mode && props.mode === 'edit' ? 'none' : '' }}>
                        <Button disabled={props.mode && props.mode === 'view' ? true : false} variant="outlined" color="primary" style={{ fontSize: 14 }} onClick={() => addItemHandler()}>Add Item</Button>
                    </div>



                </div>
                <br />
                {
                    props.mode && props.mode === 'view' ?
                        null :
                        <ModalFooter actions={footerActions} />
                }
            </div>
        </ReactModal >

    );
};




export default TransportationForm;
