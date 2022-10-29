import React, { useEffect, useState } from "react";
import ModalHeader from "../../../Common/components/Modal/ModalHeader/ModalHeader";
import ModalFooter from "../../../Common/components/Modal/ModalFooter/ModalFooter";
import styles from "./transaction.module.css";
import ReactModal from "react-modal";
import { Grid } from "@mui/material";
import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import RegularDatePicker from "../../../Common/components/Date/RegularDatePicker";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import { DEFAULT_ITEM, QUANTITY_UOM, SUPPLY_CATEGORY, SUPPLY_PAYMENT_METHOD, SUPPLY_STATUS, SUPPLY_VENDOR } from "../../../utils/constants";
import RegularSelect from "../../../Common/components/Select/RegularSelect";
import moment from "moment";

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
    const [searchItem, setSearchItem] = useState('');
    const { isOpen,
        onClose,
        isEdit } = props;

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
            name: 'orderNumber',
        },
        {
            id: 'description',
            component: 'textfield',
            placeholder: 'Description',
            label: 'Description',
            name: 'description',
            cols: 6
        },
        {
            id: 'category',
            component: 'singlecomplete',
            placeholder: 'Category',
            label: 'Category',
            name: 'category',
            options: categoryList
        },
        {
            id: 'item',
            component: 'textfield',
            placeholder: 'Item',
            label: 'Item',
            name: 'item',
        },
        {
            id: 'size',
            component: 'textfield',
            placeholder: 'Size',
            label: 'Size',
            name: 'size',
        },
        {
            id: 'dimension',
            component: 'textfield',
            placeholder: 'Dimension',
            label: 'Dimension',
            name: 'dimension',
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
            id: 'qtyUom',
            component: 'singlecomplete',
            placeholder: 'Qty Uom',
            label: 'Qty Uom',
            name: 'qtyUom',
            options: uoms

        },
        {
            id: 'unitPiece',
            component: 'textfield',
            placeholder: 'Unit Piece',
            label: 'Unit Piece',
            name: 'unitPiece',
            type: 'number'

        },
        {
            id: 'totalPcs',
            component: 'textfield',
            placeholder: 'Total Pieces',
            label: 'Total Pieces',
            name: 'totalPcs',
            type: 'number',
            disabled:true

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
            disabled : true
            

        },
        {
            id: 'pricePerPcs',
            component: 'textfield',
            placeholder: 'Price Per Pcs',
            label: 'Price Per Pcs',
            name: 'pricePerPcs',
            type: 'number',
            disabled : true

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
            options: paymentMethods

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


    useEffect(() => {
        console.log('[effects 1]');
        const fm = {};
        fm.created_at = new Date();
        fm.orderedDt = new Date();
        fm.paymentDt = new Date();
        fm.category = DEFAULT_ITEM;
        fm.description = '-';
        fm.size = '-';
        fm.dimension='-';
        fm.item = '-';
        fm.expectedDeliveryDt = new Date();
        fm.pricePerPcs = 0.00;
        fm.unitPrice = 0.00;
        fm.totalPrice = 0.0;
        fm.totalPcs = 1;
        fm.unitPiece = 1;
        fm.qty = 1;
        setGeneralForm(fm);
    }, []);
    useEffect(() => {
        if (props.item) {
            
            console.log('[items]', props.item);
            const fm = { ...props.item };   
            fm.expectedDeliveryDt = `${fm.expected_delivery_at}T00:00:00.000Z`;
            fm.grandTotal = parseFloat(fm.grand_total||0.00).toFixed(2);
            fm.orderNumber = fm.order_number;
            fm.orderedDt  = `${fm.ordered_at}T00:00:00.000Z`;
            fm.paymentInfo = fm.payment_info;
            fm.paymentMethod = fm.payment_method ? paymentMethods.find(pm => pm.name === fm.payment_method) : DEFAULT_ITEM;
            fm.paymentDt = `${fm.payment_transaction_at}T00:00:00.000Z`;
            fm.pricePerPcs = parseFloat(fm.price_per_pcs || 0.00).toFixed(2);
            fm.qtyUom = fm.qty_uom ? uoms.find(u => u.name === fm.qty_uom) : DEFAULT_ITEM;
            fm.status = fm.status ? statuses.find(s => s.name === fm.status) : DEFAULT_ITEM;
            fm.totalPcs = fm.total_pcs || 0;
            fm.totalPrice = fm.total_price || 0.00;
            fm.unitPiece =fm.unit_piece || 0;
            fm.unitPrice = fm.unit_price || 0.00;
            fm.vendor = fm.vendor ? vendors.find(v => v.name === fm.vendor) : DEFAULT_ITEM; 
            fm.category = categoryList.find(cat => cat.name === fm.category);
            setGeneralForm(fm);



        }
    }, [props.item]);
    const validateFormHandler = () => {
        props.createTransactionHandler(generalForm, props.mode);
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
        if(['qty','unitPiece','unitPrice'].includes(target.name)) {
            source.totalPcs = parseInt(source.qty || 0,10) * parseInt(source.unitPiece || 0,10);
            source.totalPrice = parseFloat(parseFloat(source.qty || 0) * parseFloat(source.unitPrice|| 0)).toFixed(2)
            source.pricePerPcs = parseFloat(parseFloat(source.unitPrice || 0) / parseFloat(source.unitPiece|| 0)).toFixed(2)
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


    const dateInputHandler = (name,value) => {
        const src = { ...generalForm };
        src[name] = value;
        setGeneralForm(src);
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
    const inputSearchHandler = (e) => {
        if (!e.target.value) {
            setSearchItem(DEFAULT_ITEM);
        };
    }
    const autoCompleteInputSearchHandler = (item) => {
        console.log('[Item]',item);
       
       const gen = {...generalForm};
        gen.category = categoryList.find(cat => cat.name === item.category);
        gen.description = item.description;
        gen.size = item.size;
        gen.dimension = item.dimension;
        gen.item = item.item;
        gen.qtyUom = uoms.find(u => u.name === item.qty_uom);
        gen.pricePerPcs = item.price_per_pcs;      
        gen.totalPrice = (item.price_per_pcs || 1) * (item.qty || 1);
        gen.qty = item.qty;
        gen.totalPcs = (item.count || 1) * (item.qty || 1);
        gen.unitPiece = item.count;
        setGeneralForm(gen);
        
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
            <div className={styles.invoiceForm}>
                <ModalHeader title={titleHandler()} onClose={onClose} />
                <div className={styles.content}>
                    <Grid container spacing={1} direction="row">

                        <Grid item xs={12} style={{paddingBottom:12}}>
                        <SingleWithClearAutoComplete
                                placeholder={'Search Item'}
                                label={'Search Item'}
                                name={'searchItem'}
                                options={props.productList || []}
                                disabled={props.mode && props.mode === 'view' ? true : false}
                                value={searchItem || DEFAULT_ITEM}
                                onSelectHandler={autoCompleteInputSearchHandler}
                                onChangeHandler={inputSearchHandler}

                            />

                        </Grid>

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




export default TransportationForm;
