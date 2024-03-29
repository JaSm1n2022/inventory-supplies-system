import React, { useEffect, useState } from "react";
import ModalHeader from "../../../Common/components/Modal/ModalHeader/ModalHeader";
import ModalFooter from "../../../Common/components/Modal/ModalFooter/ModalFooter";
import styles from "./product.module.css";
import ReactModal from "react-modal";

import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import RegularDatePicker from "../../../Common/components/Date/RegularDatePicker";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import { QUANTITY_UOM, STATUS_ACTIVE_OPTIONS, SUPPLY_CATEGORY, SUPPLY_VENDOR } from "../../../utils/constants";
import RegularSelect from "../../../Common/components/Select/RegularSelect";
import moment from "moment";
import { Grid } from "@mui/material";


let categoryList = [];
let uoms = [];
let units = [];
let vendors = [];
let status = [];
STATUS_ACTIVE_OPTIONS.forEach((item, index) => {
    status.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'status'

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
QUANTITY_UOM.forEach((item, index) => {
    units.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'unit'

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

function ProductForm(props) {
    const [generalForm, setGeneralForm] = useState({});
    const { isOpen,
        onClose,

        isEdit } = props;

    const general = [

        {
            id: 'category',
            component: 'singlecomplete',
            placeholder: 'Item Category',
            label: 'Item Category',
            name: 'category',
            options: [...categoryList],
            disabled: props.mode && props.mode === 'view' ? true : false,
            cols: 3


        },
        {
            id: 'item',
            component: 'textfield',
            placeholder: 'Item',
            label: 'Item',
            name: 'item',
            disabled: props.mode && props.mode === 'view' ? true : false,
            cols: 4


        },
        {
            id: 'description',
            component: 'textfield',
            placeholder: 'Description',
            label: 'Description',
            name: 'description',
            disabled: props.mode && props.mode === 'view' ? true : false,
            cols: 5
        },
        {
            id: 'qty',
            component: 'textfield',
            placeholder: 'qty',
            label: 'Qty',
            name: 'qty',
            type: 'number',
            disabled: props.mode && props.mode === 'view' ? true : false,


        },

        {
            id: 'qtyUom',
            component: 'singlecomplete',
            placeholder: 'Qty Uom',
            label: 'Qty Uom',
            name: 'qtyUom',
            options: uoms,
            disabled: props.mode && props.mode === 'view' ? true : false

        },

        {
            id: 'count',
            component: 'textfield',
            placeholder: 'Count/Pcs',
            label: 'Count/Pcs',
            name: 'count',
            disabled: props.mode && props.mode === 'view' ? true : false

        },
        {
            id: 'size',
            component: 'textfield',
            placeholder: 'Size',
            label: 'Size',
            name: 'size',
            disabled: props.mode && props.mode === 'view' ? true : false

        },
        {
            id: 'flavor',
            component: 'textfield',
            placeholder: 'Flavor/Color',
            label: 'Flavor/Color',
            name: 'flavor',
            disabled: props.mode && props.mode === 'view' ? true : false

        },
        {
            id: 'dimension',
            component: 'textfield',
            placeholder: 'Dimension',
            label: 'Dimension',
            name: 'dimension',
            disabled: props.mode && props.mode === 'view' ? true : false


        },
        {
            id: 'unitPrice',
            component: 'textfield',
            placeholder: 'Unit Price',
            label: 'Unit Price',
            name: 'unitPrice',
            disabled: props.mode && props.mode === 'view' ? true : false,
            type: 'number'


        },
        {
            id: 'pricePerPcs',
            component: 'textfield',
            placeholder: 'Price Per Pcs',
            label: 'Price Per Pcs',
            name: 'pricePerPcs',
            disabled: true,
            type: 'number'


        },
        {
            id: 'vendor',
            component: 'singlecomplete',
            placeholder: 'Vendor',
            label: 'Vendor',
            name: 'vendor',
            disabled: props.mode && props.mode === 'view' ? true : false,
            options: vendors


        },
        {
            id: 'shortDescription',
            component: 'textfield',
            placeholder: 'Short Description',
            label: 'Short Description',
            name: 'shortDescription'

        },
        {
            id: 'unitUom',
            component: 'singlecomplete',
            placeholder: 'Unit Distribution',
            label: 'Unit Distribution',
            name: 'unitUom',
            options: [...units],
            disabled: props.mode && props.mode === 'view' ? true : false

        },
        {
            id: 'status',
            component: 'singlecomplete',
            placeholder: 'Status',
            label: 'Status',
            name: 'status',
            options: [...status],
            disabled: props.mode && props.mode === 'view' ? true : false

        },



    ]


    useEffect(() => {
        console.log('[effects 1]');
        const fm = {};
        fm.created_at = new Date();
        fm.pricePerPcs = 0.0;
        fm.status = status.find(s => s.name === 'Active');
        categoryList = [];
        [...SUPPLY_CATEGORY].forEach((item, index) => {
            categoryList.push({
                id: index,
                name: item,
                value: item,
                label: item,
                category: 'category'

            })
        });
        setGeneralForm(fm);
    }, []);
    useEffect(() => {
        if (props.item) {
            console.log('[effects 2]');

            const generalFm = { ...props.item };
            console.log('[items]', generalFm.qty_uom, props.item, uoms, uoms.find(cat => cat.name === generalFm.qty_uom));
            generalFm.status = generalFm.status ? status.find(s => s.name === 'Active') : status.find(s => s.name === 'Inactive');
            generalFm.created_at = moment(new Date(generalFm.created_at)).utc().format('YYYY-MM-DD');
            generalFm.category = categoryList.find(cat => cat.name === generalFm.category);
            generalFm.qtyUom = uoms.find(cat => cat.name === generalFm.qty_uom);
            generalFm.vendor = vendors.find(v => v.name === generalFm.vendor);
            generalFm.pricePerPcs = generalFm.price_per_pcs || 0.00;
            generalFm.unitPrice = generalFm.unit_price || 0.00;
            generalFm.unitUom = units.find(cat => cat.name === generalFm.unit_distribution);
            generalFm.shortDescription = generalFm.short_description;

            setGeneralForm(generalFm);



        }
    }, [props.item]);
    const validateFormHandler = () => {
        props.createProductHandler(generalForm, props.mode);
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
        if (target.name === 'count' || target.name === 'unitPrice') {
            source.pricePerPcs = parseFloat(parseFloat(source.unitPrice) / parseInt(source.count || 1, 10)).toFixed(2);
        }
        setGeneralForm(source);

    };
    const autoCompleteGeneralInputHander = (item) => {
        const src = { ...generalForm };
        console.log('[src]', src, item);
        if (item.category === 'status') {
            src.status = item;

        }
        if (item.category === 'category') {
            src['category'] = item;
            src['categoryName'] = item.name;
        }
        if (item.category === 'vendor') {
            src['vendor'] = item;
            src['vendorName'] = item.name;
        }
        if (item.category === 'uom') {
            src['qtyUom'] = item;
            src['uom'] = item.name;
        }
        if (item.category === 'unit') {
            src['unitUom'] = item;
            src['unit'] = item.name;
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
        if (props.mode === 'view') {
            return 'View Product'
        } else if (props.mode === 'edit') {
            return 'Edit Product';
        } else {
            return 'Create Product';
        }
    }
    console.log('[product category]', categoryList);
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




export default ProductForm;
