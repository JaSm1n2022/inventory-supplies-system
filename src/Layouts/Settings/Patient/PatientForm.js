import React, { useEffect, useState } from "react";
import ModalHeader from "../../../Common/components/Modal/ModalHeader/ModalHeader";
import ModalFooter from "../../../Common/components/Modal/ModalFooter/ModalFooter";
import styles from "./patient.module.css";
import ReactModal from "react-modal";
import { Grid } from "@mui/material";
import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import RegularDatePicker from "../../../Common/components/Date/RegularDatePicker";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import { CARE_TYPE } from "../../../utils/constants";
import RegularSelect from "../../../Common/components/Select/RegularSelect";
import moment from "moment";

const statuses = [{ name: 'Active', value: 'Active', label: 'Active', category: 'status' },
{ name: 'Inactive', value: 'Inactive', label: 'Inactive', category: 'status' }];
let careTypes = [];
CARE_TYPE.forEach((item, index) => {
    careTypes.push({
        id: index,
        name: item,
        value: item,
        label: item,
        category: 'careType'

    })
});

function PatientForm(props) {
    const [generalForm, setGeneralForm] = useState({});
    const { isOpen,
        onClose } = props;

    const general = [

        {
            id: 'name',
            component: 'textfield',
            placeholder: 'Patient Name',
            label: 'Patient Name',
            name: 'name',
            disabled: props.mode && props.mode === 'view' ? true : false,


        },
        {
            id: 'mrNbr',
            component: 'textfield',
            placeholder: 'MR #',
            label: 'MR #',
            name: 'mrNbr',
            disabled: props.mode && props.mode === 'view' ? true : false,


        },
        {
            id: 'dob',
            component: 'datepicker',
            placeholder: 'DOB',
            label: 'DOB',
            name: 'dob',
            disabled: props.mode && props.mode === 'view' ? true : false,
        },
        {
            id: 'soc',
            component: 'datepicker',
            placeholder: 'SOC',
            label: 'SOC',
            name: 'soc',
            disabled: props.mode && props.mode === 'view' ? true : false,
        },
        {
            id: 'eoc',
            component: 'datepicker',
            placeholder: 'eoc',
            label: 'EOC',
            name: 'eoc',
            disabled: props.mode && props.mode === 'view' ? true : false,
        },
        {
            id: 'careType',
            component: 'singlecomplete',
            placeholder: 'Care Type',
            label: 'Care Type',
            name: 'careType',
            options: careTypes,
            disabled: props.mode && props.mode === 'view' ? true : false,
        },
        {
            id: 'placeOfService',
            component: 'textfield',
            placeholder: 'Place of Service',
            label: 'Place of Service',
            name: 'placeOfService',
            disabled: props.mode && props.mode === 'view' ? true : false,
        },
        {
            id: 'address',
            component: 'textfield',
            placeholder: 'Address',
            label: 'Address',
            name: 'address',
            disabled: props.mode && props.mode === 'view' ? true : false,
        },
        {
            id: 'contactNbr',
            component: 'textfield',
            placeholder: 'Contact Number',
            label: 'Contact Number',
            name: 'contactNbr',
            disabled: props.mode && props.mode === 'view' ? true : false,
        },
        {
            id: 'assignRnId',
            component: 'singlecomplete',
            placeholder: 'Assigned RN',
            label: 'Assigned RN',
            name: 'assignRnId',
            options: [...props.rnList],
            disabled: props.mode && props.mode === 'view' ? true : false,
        },
        /*
        {
            id: 'assignRn',
            component: 'textfield',
            placeholder: 'Assigned RN',
            label: 'Assigned RN',
            name: 'assignRn',
            disabled: true,
        },
        */
        {
            id: 'rnVisitFreq',
            component: 'textfield',
            placeholder: 'RN Visit Freq',
            label: 'RN Visit Freq',
            name: 'rnVisitFreq',
            disabled: props.mode && props.mode === 'view' ? true : false,
        },

        /*
        {
            id: 'assignCna',
            component: 'textfield',
            placeholder: 'Assigned CNA',
            label: 'Assigned CNA',
            name: 'assignCna',
            disabled: props.mode && props.mode === 'view' ? true : false,
        },
        */
        {
            id: 'assignCnaId',
            component: 'singlecomplete',
            placeholder: 'Assigned CNA',
            label: 'Assigned CNA',
            name: 'assignCnaId',
            options: [...props.cnaList],
            disabled: props.mode && props.mode === 'view' ? true : false,
        },
        {
            id: 'cnaVisitFreq',
            component: 'textfield',
            placeholder: 'CNA Visit Freq',
            label: 'CNA Visit Freq',
            name: 'cnaVisitFreq',
            disabled: props.mode && props.mode === 'view' ? true : false,
        },
        {
            id: 'status',
            component: 'singlecomplete',
            placeholder: 'Status',
            label: 'Status',
            name: 'status',
            value: 'Active',
            options: statuses,
            disabled: props.mode && props.mode === 'view' ? true : false,
        },

    ]


    useEffect(() => {
        console.log('[effects 1]');
        const fm = {
            status: statuses.find(s => s.name === 'Active'),
            soc: moment(new Date()).utc().format('YYYY-MM-DD'),
            eoc: moment(new Date()).utc().format('YYYY-MM-DD'),
            dob: moment(new Date()).utc().format('YYYY-MM-DD')
        };
        fm.created_at = new Date();
        fm.pricePerPcs = 0.0;
        setGeneralForm(fm);
    }, []);
    useEffect(() => {
        if (props.item) {
            console.log('[effects 2]');
            console.log('[items]', props.item);

            const generalFm = { ...props.item };
            generalFm.created_at = moment(new Date(generalFm.created_at)).utc().format('YYYY-MM-DD');
            generalFm.soc = moment(new Date(generalFm.soc_at)).utc().format('YYYY-MM-DD');
            generalFm.eoc = generalFm.status && generalFm.status === 'Inactive' ? moment(new Date(generalFm.eoc_at)).utc().format('YYYY-MM-DD') : '';
            generalFm.dob = moment(new Date(generalFm.dob_at)).utc().format('YYYY-MM-DD');
            generalFm.careType = careTypes.find(care => care.name === generalFm.care_type);
            generalFm.mrNbr = generalFm.mr_nbr;
            generalFm.placeOfService = generalFm.place_of_service;
            generalFm.contactNbr = generalFm.contact_nbr;
            generalFm.assignRn = generalFm.assigned_rn;
            generalFm.assignCnaId = [...props.cnaList].find(emp => emp.id === generalFm.assigned_cna_id);
            generalFm.assignRnId = [...props.rnList].find(emp => emp.id === generalFm.assigned_rn_id);
            generalFm.rnVisitFreq = generalFm.rn_visit_freq;
            generalFm.assignCna = generalFm.assigned_cna;
            generalFm.cnaVisitFreq = generalFm.cna_visit_freq;
            generalFm.status = statuses.find(s => s.name === generalFm.status);
            ;




            setGeneralForm(generalFm);



        }
    }, [props.item]);
    const validateFormHandler = () => {
        props.saveHandler(generalForm, props.mode);
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
    const autoCompleteGeneralInputHandler = (item) => {
        const src = { ...generalForm };
        console.log('[src]', src, item);
        if (item.categoryType === 'cna') {
            src.assignCna = item.name;
            src.assignCnaId = item;
        }
        if (item.categoryType === 'rn') {
            src.assignRn = item.name;
            src.assignRnId = item;
        }
        if (item.category === 'status') {
            src.status = item;
        }
        if (item.category === 'careType') {
            src.careType = item;

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


    const dateInputHandler = (name, value) => {
        const src = { ...generalForm };
        src[name] = value;
        setGeneralForm(src);
    }
    const titleHandler = () => {
        if (props.mode === 'view') {
            return 'View Patient'
        } else if (props.mode === 'edit') {
            return 'Edit Patient';
        } else {
            return 'Create Patient';
        }
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
                                                        onSelectHandler={autoCompleteGeneralInputHandler}
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




export default PatientForm;
