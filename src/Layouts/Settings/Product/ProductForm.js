import React, { useEffect, useState } from "react";
import ModalHeader from "../../../Common/components/Modal/ModalHeader/ModalHeader";
import ModalFooter from "../../../Common/components/Modal/ModalFooter/ModalFooter";
import styles from "./product.module.css";
import ReactModal from "react-modal";

import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import RegularDatePicker from "../../../Common/components/Date/RegularDatePicker";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import { QUANTITY_UOM, SUPPLY_CATEGORY,SUPPLY_VENDOR } from "../../../utils/constants";
import RegularSelect from "../../../Common/components/Select/RegularSelect";
import moment from "moment";


let categoryList = [];
let uoms = [];
let vendors = [];
QUANTITY_UOM.forEach((item, index) => {
    uoms.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'uom'

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
SUPPLY_CATEGORY.forEach((item, index) => {
    categoryList.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'category'

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
            options : categoryList,
            disabled: props.mode && props.mode === 'view' ? true : false,
            cols : 3
            
            
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
            cols : 5
        },
        {
            id: 'qty',
            component: 'textfield',
            placeholder: 'qty',
            label: 'Qty',
            name: 'qty',
            type:'number',
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
            type:'number'
            
            
        },
        {
            id: 'pricePerPcs',
            component: 'textfield',
            placeholder: 'Price Per Pcs',
            label: 'Price Per Pcs',
            name: 'pricePerPcs',
            disabled: true,
            type:'number'
            
            
        },
        {
            id: 'vendor',
            component: 'singlecomplete',
            placeholder: 'Vendor',
            label: 'Vendor',
            name: 'vendor',
            disabled: props.mode && props.mode === 'view' ? true : false,
            options: vendors
            
            
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
            generalFm.category = categoryList.find(cat => cat.name === generalFm.category);
            generalFm.qtyUom = uoms.find(cat => cat.name === generalFm.qty_uom);
            generalFm.vendor = vendors.find(v => v.name === generalFm.vendor);
            generalFm.pricePerPcs = generalFm.price_per_pcs || 0.00;
            generalFm.unitPrice = generalFm.unit_price || 0.00;
            
            setGeneralForm(generalFm);
            
            
            
        }
    }, [props.item]);
    const validateFormHandler = () => {
        props.createProductHandler(generalForm,props.mode);
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
        if(item.category === 'category') {
         src['category'] = item;
         src['categoryName'] = item.name;
        }
        if (item.category === 'vendor') {
            src['vendor'] = item;
            src['vendorName'] = item.name;
        }
        if(item.category === 'uom') {
            src['qtyUom'] = item;
            src['uom'] = item.name;
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
                return 'View Product'
          } else if (props.mode === 'edit') {
              return 'Edit Product';
          } else {
              return 'Create Product';
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




export default ProductForm;
