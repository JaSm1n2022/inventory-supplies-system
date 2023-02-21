import React, { useEffect, useState } from "react";
import ModalHeader from "../../../Common/components/Modal/ModalHeader/ModalHeader";
import ModalFooter from "../../../Common/components/Modal/ModalFooter/ModalFooter";
import styles from "./threshold.module.css";
import ReactModal from "react-modal";
import { Button, Divider, Grid, Typography } from "@mui/material";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import { DEFAULT_ITEM, THRESHOLD_CATEGORY } from "../../../utils/constants";

import { v4 as uuidv4 } from "uuid";
import RegularCheckbox from "../../../Common/components/Checkbox/RegularCheckbox";
import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import MultipleAutoComplete from "../../../Common/components/AutoComplete/MultipleAutoComplete";
let testList = [
    { name: 'test', title: 'test', value: 'test', category: 'test' }
]
function ThresholdForm(props) {
    const { isOpen,
        onClose } = props;
    const [requestor, setRequestor] = useState(DEFAULT_ITEM);
    const [detailForm, setDetailForm] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const [patientList, setPatientList] = useState([DEFAULT_ITEM]);
    useEffect(() => {
        setPatientList([...props.patientList]);
    }, [props.patientList]);
    const details = [
        {
            id: 'category',
            component: 'singlecomplete',
            placeholder: 'Select Category',
            label: 'Select Category',
            name: 'category',
            options: [...THRESHOLD_CATEGORY]
        },
        {
            id: 'subcomponent',
            component: 'subcomponent',
            children: [{
                id: 'allpatients',
                component: 'checkbox',
                label: 'Apply to all?',
                xs: 5,
                name: 'allpatients'
            }, {
                id: 'patients',
                component: 'multicomplete',
                placeholder: 'Select Patients',
                label: 'Select Patients',
                name: 'category',

            }
            ]
        },
        {
            id: 'default',
            component: 'textfield',
            placeholder: '',
            label: '',
            name: 'default'

        },
        {
            id: 'threshold',
            component: 'textfield',
            placeholder: 'New Threshold',
            label: 'New Threshold',
            name: 'threshold'

        },


    ]

    const validateFormHandler = () => {
        //props.saveHandler(generalForm, props.mode);
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


    const onChangeInputHandler = (e, source) => {
        if (e.name === 'category') {
            source.category = undefined;
            setIsRefresh(!isRefresh);
        }
        if (!e.target.value && e.target.name === 'requestor') {
            setRequestor(DEFAULT_ITEM);
        }
    }
    const addItemHandler = () => {
        const records = [...detailForm];
        records.push({
            id: uuidv4(),
            isAllPatients: false


        });
        setDetailForm(records);
    }
    if (detailForm.length === 0) {
        addItemHandler();
    }
    const autoCompleteHandler = (item, source) => {
        console.log('[Item]', item, source);
        if (item.categoryType === 'requestor') {
            setRequestor(item);
        } else
            if (item.categoryType === 'thresholdCategory') {
                source.category = item;
                source.default = item.default;

            }
        setIsRefresh(!isRefresh);

    }

    const onSelectAllHandler = (isAll, options, source) => {
        console.log('[isALL]', isAll);
        options.forEach(option => {
            option.selected = isAll;
        });
        if (options[0].category === 'patient') {
            source.patients = options;
        }
        setIsRefresh(!isRefresh);

    }
    const addSelectedItemHandler = (items, source) => {
        // for items it is not needed for this handler
        const selectedItems =
            items && items.length ? items.filter((s) => s.selected) : [];
        const selected = selectedItems && selectedItems.length ? selectedItems : [];

        if (source[0].category === 'patient') {
            source.patients = selected;

        }
    };
    console.log('[PatientList]', patientList);
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
                <ModalHeader title={'Threshold'} onClose={onClose} />
                <div className={styles.content}>
                    <Grid container direction="row" style={{ paddingBottom: 8 }}>
                        <Grid item xs={6}>
                            <SingleWithClearAutoComplete
                                name='requestor'
                                label='Select Requestor'
                                placeholder='Select Requestor'
                                options={props.requestorList || []}
                                value={requestor || DEFAULT_ITEM}
                                onSelectHandler={autoCompleteHandler}
                                onChangeHandler={onChangeInputHandler}
                            />
                        </Grid>

                    </Grid>

                    <Grid container direction="row" spacing={1}>
                        <Grid item xs={12}>
                            <Divider variant="fullWidth" style={{
                                height: '.02em',
                                border: 'solid 1px rgba(0, 0, 0, 0.12)'
                            }} orientation="horizontal" flexItem />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>Category</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Patients</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>Default</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>Threshold</Typography>
                        </Grid>
                        <Grid item xs={12} style={{ paddingBottom: 10 }}>
                            <Divider variant="fullWidth" style={{
                                height: '.02em',
                                border: 'solid 1px rgba(0, 0, 0, 0.12)'
                            }} orientation="horizontal" flexItem />
                        </Grid>



                        {detailForm.map((item, index) => {
                            return (
                                <Grid container spacing={1} direction="row" style={{ paddingBottom: 12 }} key={`contr-${index}`}>
                                    <Grid item xs={2}>
                                        <SingleWithClearAutoComplete
                                            source={item}
                                            name='category'
                                            label='Select Category'
                                            placeholder='Select Category'
                                            options={[...THRESHOLD_CATEGORY] || []}
                                            value={item.category || DEFAULT_ITEM}
                                            onSelectHandler={autoCompleteHandler}
                                            onChangeHandler={onChangeInputHandler}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Grid container direction="row" spacing={1}>
                                            <Grid item xs={5}>
                                                <div id="checkbox-customerManaged" style={{ borderRadius: '4px', border: '1px solid #9e9e9e', paddingTop: 8, paddingLeft: 8 }}>
                                                    <RegularCheckbox
                                                        source={item}
                                                        disabled={item.category === undefined ? true : false}
                                                        size={20} tooltipPlacement={'top-start'} tooltiptext={'Check to apply it to all patients'} name={'isAllPatients'} label={'All patients?'} onChange={onChangeInputHandler} />
                                                </div>
                                            </Grid>
                                            <Grid item xs={7}>

                                                <MultipleAutoComplete id="patients" name="patients" onChangeHandler={onChangeInputHandler} label={'Select Patients'} placeholder={item.patients && item.patients.length ? '' : 'Select Patients'} selected={item.patients || []} onSelectAllHandler={onSelectAllHandler} onSelectHandler={addSelectedItemHandler} searchList={testList || [DEFAULT_ITEM]} />

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <RegularTextField source={item} type="number" disabled={true} value={item.default} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <RegularTextField disabled={item.category === undefined ? true : false} source={item} type="number" value={item.threshold} />
                                    </Grid>



                                </Grid>
                            )
                        })}





                        {/*       
                        <Grid item xs={2}>
                            <SingleWithClearAutoComplete

                                name='requestor'
                                label='Select Requestor or leave it as all'
                                placeholder='Select Requestor'
                                options={props.requestorList || []}
                                value={requestor || DEFAULT_ITEM}
                                onSelectHandler={autoCompleteHandler}
                                onChangeHandler={onChangeInputHandler}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Grid container direction="row" spacing={1}>
                                <Grid item xs={5}>
                                    <div id="checkbox-customerManaged" style={{ borderRadius: '4px', border: '1px solid #9e9e9e', paddingTop: 8, paddingLeft: 8 }}>
                                        <RegularCheckbox
                                            size={20} tooltipPlacement={'top-start'} tooltiptext={'Check to apply it to all patients'} name={'isAllPatients'} label={'All patients?'} onChange={onChangeInputHandler} />
                                    </div>
                                </Grid>
                                <Grid item xs={7}>
                                    <SingleWithClearAutoComplete

                                        name='requestor'
                                        label='Select Requestor or leave it as all'
                                        placeholder='Select Requestor'
                                        options={props.requestorList || []}
                                        value={requestor || DEFAULT_ITEM}
                                        onSelectHandler={autoCompleteHandler}
                                        onChangeHandler={onChangeInputHandler}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <RegularTextField type="number" disabled={true} value={briefDefault} />
                        </Grid>
                        <Grid item xs={2}>
                            <RegularTextField type="number" />
                        </Grid>
                        */}
                    </Grid>
                    <Grid container>
                        <div style={{ paddingTop: 4, display: props.mode && props.mode === 'edit' ? 'none' : '' }}>
                            <Button disabled={props.mode && props.mode === 'view' ? true : false} variant="outlined" color="primary" style={{ fontSize: 14 }} onClick={() => addItemHandler()}>Add Item</Button>
                        </div>
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




export default ThresholdForm;
