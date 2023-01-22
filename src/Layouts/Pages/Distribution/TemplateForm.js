import React, { useEffect, useState } from "react";
import ModalHeader from "../../../Common/components/Modal/ModalHeader/ModalHeader";
import ModalFooter from "../../../Common/components/Modal/ModalFooter/ModalFooter";
import styles from "./distribution.module.css";
import ReactModal from "react-modal";
import { Avatar, Button, Grid, Tooltip, Typography, Divider, FormControl, FormLabel, Radio, FormGroup } from "@mui/material";
import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import { DEFAULT_ITEM, QUANTITY_UOM } from "../../../utils/constants";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintForm from "./PrintForm";
import TOAST from "../../../modules/toastManager";

let uoms = [];



QUANTITY_UOM.forEach((item, index) => {
    uoms.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'uoms'

    })
});
function TemplateForm(props) {
    const [generalForm, setGeneralForm] = useState({});
    const [detailForm, setDetailForm] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const [isPrintForm, setIsPrintFrom] = useState(false);
    const [templateType, setTemplateType] = useState('add');
    const [templateNameError, setTemplateNameError] = useState({ isError: false, message: '' });
    const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_ITEM);
    const { isOpen,
        onClose,

    } = props;




    const details = [
        {
            id: 'search',
            component: 'singlecomplete',
            placeholder: 'Search Item',
            label: 'Search Item',
            name: 'search',
            options: [...props.productList]
        },
        {
            id: 'description',
            component: 'textfield',
            placeholder: 'Description',
            label: 'Description',
            name: 'description',

        },
        {
            id: 'size',
            component: 'textfield',
            placeholder: 'Size',
            label: 'Size',
            name: 'size',

        },
        {
            id: 'orderQty',
            component: 'textfield',
            placeholder: 'Quantity',
            label: 'Quantity',
            name: 'orderQty',
            type: 'number'
        },
        {
            id: 'unitDistribution',
            component: 'textfield',
            placeholder: 'Unit',
            label: 'Unit',
            name: 'unitDistribution',

        },
        {
            id: 'vendor',
            component: 'textfield',
            placeholder: 'Vendor',
            label: 'Vendor',
            name: 'vendor',
            type: 'test',
            value: '-'
        },



    ]
    useEffect(() => {
        console.log('[props distribution form]', props);
        const fm = {};
        fm.templateName = '';
        setGeneralForm(fm);
    }, []);
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
                console.log('[Cancel me]');
                props.onClose();
            },
        },
    ];
    const validateFormHandler = () => {
        if (templateType === 'add' && !generalForm.templateName) {
            setTemplateNameError({ isError: true, message: 'Template name is required' });
            return;
        } else if (!generalForm.templateName) {
            TOAST.error('Must have template Name');
            return;

        }
        console.log('[details from]', detailForm);
        const finalData = [...detailForm].filter(detail => detail.productId);
        if (finalData && finalData.length) {
            props.manageTemplateHandler({ ...generalForm }, finalData, templateType);
            setDetailForm([]);
            setSelectedTemplate(DEFAULT_ITEM);
            setGeneralForm({ templateName: '' });
        } else {
            TOAST.error('Nothing to save. Please provide details');
            return;
        }


    }

    const inputGeneralHandler = ({ target }) => {
        console.log('[Target General]', target, generalForm);
        const source = { ...generalForm };
        source[target.name] = target.value;
        setGeneralForm(source);

    };
    const inputDetailHandler = ({ target }, source) => {
        source[target.name] = target.value;
        setIsRefresh(!isRefresh);

    };
    const autoCompleteGeneralInputHander = (item) => {
        const src = { ...generalForm };
        console.log('[src]', src, item);

        if (item.categoryType === 'template') {
            setSelectedTemplate(item);
            if (item.details && item.details && item.details.products && item.details.products.length) {
                console.log('[with details]', item.details);
                const details = [];
                item.details.products.forEach(i => {

                    const productInfo = props.productList.find(product => product.id === i.productId);
                    if (productInfo) {
                        console.log('[product Info]', productInfo);
                        details.push({
                            id: uuidv4(),
                            description: productInfo.description,
                            shortDescription: productInfo.short_description || '-',
                            orderQty: i.qty || 0,
                            stockQty: 0,
                            unitDistribution: productInfo.unit_distribution || '-',
                            status: '',
                            size: productInfo.size || '-',
                            productId: i.productId,
                            vendor: productInfo.vendor || '-'
                        });
                    }
                })
                setGeneralForm({
                    templateId: item.id,
                    templateName: item.name
                });
                setDetailForm(details);
            }
        }


    }

    const autoCompleteDetailInputHander = (item, source) => {
        source.search = item;
        console.log('[item]', item);
        source.description = `${item.shortDescription} / ${item.comments} / ${item.additional_info}`;
        source.productId = item.productId;

        source.category = item.category;
        source.vendor = item.vendor || '-';
        const productInfo = props.productList.find(product => product.id === item.productId);
        if (productInfo) {
            source.size = productInfo.size;
            source.shortDescription = productInfo.short_description;
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
            unitDistribution: '-',
            status: '',
            size: '-',
            productId: ''
        });
        setDetailForm(records);
    }
    if (templateType === 'add' && detailForm && detailForm.length === 0) {
        addItemHandler();
    }
    const deleteItemHandler = (indx) => {
        const fm = [...detailForm];
        fm.splice(indx, 1);

        setDetailForm(fm);
    }

    const titleHandler = () => {
        return 'Manage Distribution Template'

    }
    const closePrintFormHandler = () => {
        setIsPrintFrom(false);
    }
    const deleteTemplateHandler = () => {
        if (generalForm.templateId) {
            props.deleteTemplateHandler(generalForm.templateId);
            setDetailForm([]);
            setSelectedTemplate(DEFAULT_ITEM);
            setGeneralForm({ templateId: '', templateName: '' });
        }
    }

    const useTemplateHandler = () => {
        if (generalForm.templateId) {
            props.useTemplateHandler(detailForm);
            setDetailForm([]);
            setSelectedTemplate(DEFAULT_ITEM);
            setGeneralForm({ templateId: '', templateName: '' });

        }
    }

    const templateTypeHandler = ({ target }) => {
        setGeneralForm({
            templateId: '',
            templateName: ''
        });
        setSelectedTemplate(DEFAULT_ITEM);
        if (target.value === 'add') {
            setDetailForm([{
                id: uuidv4(),
                description: '-',
                orderQty: 0,
                stockQty: 0,
                unitDistribution: '-',
                status: '',
                size: '-',
                productId: ''
            }]);
        } else {
            setDetailForm([]);
        }
        setTemplateType(target.value);
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
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Select Action</FormLabel>
                        <div style={{ display: 'inline-flex' }}>
                            <div>

                                <Radio
                                    checked={templateType === 'add'}
                                    onChange={templateTypeHandler}
                                    value="add"
                                    label="Add"
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'A' }}
                                ></Radio>ADD TEMPLATE
                                <Radio
                                    checked={templateType === 'edit'}
                                    onChange={templateTypeHandler}
                                    value="edit"
                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'B' }}
                                ></Radio>EDIT TEMPLATE
                                <Radio
                                    checked={templateType === 'delete'}
                                    onChange={templateTypeHandler}
                                    value="delete"

                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'A' }}
                                ></Radio>DELETE TEMPLATE
                                <Radio
                                    checked={templateType === 'use'}
                                    onChange={templateTypeHandler}
                                    value="use"

                                    name="radio-button-demo"
                                    inputProps={{ 'aria-label': 'A' }}
                                ></Radio>USE TEMPLATE


                            </div>
                        </div>
                    </FormControl>
                    {templateType === 'add' ?
                        <div style={{ width: '500px', paddingTop: 20, paddingBottom: 20 }}>
                            <FormGroup>
                                <Typography>TEMPLATE NAME</Typography>
                                <RegularTextField isError={templateNameError.isError} errorMsg={templateNameError.message} placeholder="Enter Template Name *" value={generalForm.templateName || ''} name="templateName" onChange={inputGeneralHandler} />
                            </FormGroup>
                        </div>

                        : templateType === 'edit' ?
                            <div style={{ width: '500px', paddingTop: 20, paddingBottom: 20 }}>
                                <FormGroup>
                                    <Typography>TEMPLATE NAME</Typography>
                                    <SingleWithClearAutoComplete
                                        value={selectedTemplate}
                                        onSelectHandler={autoCompleteGeneralInputHander}
                                        onChangeHandler={onChangeGeneralInputHandler}
                                        options={[...props.templateList]} />
                                </FormGroup>
                            </div>
                            : templateType === 'delete' ?
                                <div style={{ width: '500px', paddingTop: 20, paddingBottom: 20 }}>
                                    <FormGroup>
                                        <Typography>TEMPLATE NAME</Typography>
                                        <div style={{ display: 'inline-flex', gap: 20 }}>
                                            <div style={{ width: '400px' }}>
                                                <SingleWithClearAutoComplete
                                                    value={selectedTemplate}
                                                    onSelectHandler={autoCompleteGeneralInputHander}
                                                    onChangeHandler={onChangeGeneralInputHandler}
                                                    options={[...props.templateList]} />
                                            </div>
                                            <div style={{ width: '200px', display: selectedTemplate.name ? '' : 'none' }}>
                                                <Button onClick={deleteTemplateHandler} variant="contained" color="secondary">Delete Template</Button>
                                            </div>
                                        </div>
                                    </FormGroup>
                                </div>
                                : templateType === 'use' ?
                                    <div style={{ width: '500px', paddingTop: 20, paddingBottom: 20 }}>
                                        <FormGroup>
                                            <Typography>TEMPLATE NAME</Typography>
                                            <div style={{ display: 'inline-flex', gap: 20 }}>
                                                <div style={{ width: '400px' }}>
                                                    <SingleWithClearAutoComplete
                                                        value={selectedTemplate}
                                                        onSelectHandler={autoCompleteGeneralInputHander}
                                                        onChangeHandler={onChangeGeneralInputHandler}
                                                        options={[...props.templateList]} />
                                                </div>
                                                <div style={{ width: '200px', display: selectedTemplate.name ? '' : 'none' }}>
                                                    <Button onClick={useTemplateHandler} variant="contained" color="primary">Use Template</Button>
                                                </div>
                                            </div>
                                        </FormGroup>
                                    </div>
                                    : null
                    }

                    <Grid container>
                        <Grid container style={{ paddingTop: 20 }}>
                            <Typography variant="h5">Details</Typography>
                        </Grid>
                        <Grid item xs={12} style={{ paddingBottom: 10 }}>
                            <Divider variant="fullWidth" style={{

                                height: '.02em',
                                border: 'solid 1px rgba(0, 0, 0, 0.12)'
                            }} orientation="horizontal" flexItem />
                        </Grid>
                        <br />
                    </Grid>

                    {detailForm && detailForm.length ?
                        detailForm.map((item, index) => {
                            return (
                                <Grid container spacing={1} direction="row" style={{ paddingBottom: 12 }} key={`contr-${index}`}>

                                    <Grid item xs={12} style={{ display: templateType === 'add' || templateType === 'edit' ? '' : 'none' }}>
                                        <div style={{ display: 'inline-flex', gap: 10 }}>
                                            <Avatar style={{ height:24,width:24,color: 'black', background: 'white', border: '1px solid black' }}>{index + 1}</Avatar>
                                            <div style={{ paddingTop: 4 }}>
                                                <Tooltip title={'Delete Item'}>
                                                    <DeleteIcon style={{ color: '#F62100', fontSize: '24px', cursor: 'pointer' }} onClick={() => deleteItemHandler(index)} />
                                                </Tooltip>

                                            </div>

                                            <div style={{ width: 340 }}>
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
                                        
                                            <div style={{ width: 120 }}>
                                                <RegularTextField disabled={false} source={item}  {...details.find(d => d.id === 'orderQty')} value={item['orderQty']} onChange={inputDetailHandler} />
                                            </div>
                                            
                                            <div style={{ width: 400 }}>
                                                <RegularTextField disabled={true} source={item}  {...details.find(d => d.id === 'description')} value={item['shortDescription'] || '-'} onChange={inputDetailHandler} />
                                            </div>
                                            <div style={{ width: 120 }}>
                                                <RegularTextField disabled={true} source={item}  {...details.find(d => d.id === 'size')} value={item['size']} onChange={inputDetailHandler} />
                                            </div>
                                            <div style={{ width: 120 }}>
                                                <RegularTextField disabled={true} source={item}  {...details.find(d => d.id === 'unitDistribution')} value={item['unitDistribution']} />
                                            </div>
                                            <div style={{ width: 120 }}>
                                                <RegularTextField disabled={true} source={item}   {...details.find(d => d.id === 'vendor')} value={item['vendor'] || '-'} />
                                            </div>

                                        </div>
                                    </Grid>


                                </Grid>
                            )
                        }) : null}

                    {(templateType !== 'delete' && templateType !== 'use') && detailForm && detailForm.length ?
                        <div style={{ paddingTop: 4, display: props.mode && props.mode === 'edit' ? 'none' : '' }}>
                            <Button disabled={props.mode && props.mode === 'view' ? true : false} variant="outlined" color="primary" style={{ fontSize: 14 }} onClick={() => addItemHandler()}>Add Item</Button>
                        </div>
                        : null
                    }
                </div>
                <br />
                {(props.mode && props.mode === 'view') || templateType === 'delete' || templateType === 'use' ?
                    null :
                    <ModalFooter actions={footerActions} templateType={templateType} />
                }
            </div>
            {isPrintForm &&
                <PrintForm isOpen={isPrintForm} generalForm={generalForm} closePrintForm={closePrintFormHandler} detailForm={detailForm} />
            }
        </ReactModal >

    );
};




export default TemplateForm;
