import { Avatar, Button, CircularProgress, Divider, Grid, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { patientListStateSelector } from "../../../store/selectors/patientSelector";
import { attemptToFetchPatient, resetFetchPatientState } from "../../../store/actions/patientAction";
import { connect } from "react-redux";
import { ACTION_STATUSES, DEFAULT_ITEM, ORDER_FORM } from "../../../utils/constants";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import OrderBar from "../../OrderBar";
import moment from "moment";
import { orderCreateStateSelector, orderListStateSelector } from "../../../store/selectors/orderSelector";
import { StorefrontTwoTone } from "@mui/icons-material";
import { attemptToCreateOrder, attemptToFetchOrder, resetCreateOrderState, resetFetchOrderState } from "../../../store/actions/orderAction";
import TOAST from "../../../modules/toastManager";
let isLoading = false;
const Supply = (props) => {
    const [patient, setPatient] = useState(DEFAULT_ITEM);
    const [patientList, setPatientList] = useState([]);
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);


    useEffect(() => {
        const cats = ORDER_FORM.map(map => map.category);
        console.log('[Cats]', cats);
        const arr = [];
        cats.forEach(c => {

            arr.push({
                name: c,
                label: c,
                value: c,
                category: 'category'
            })
        });
        setCategories(arr);


    }, []);
    useEffect(() => {
        setPatientList(props.patientList);
    }, [props.patientList]);
    const autoCompleteGeneralInputHander = (item) => {
        if (item.categoryType === 'patient') {
            setPatient(item);
        }

    }

    const onChangeGeneralInputHandler = (e) => {

        if (!e.target.value && e.target.name === 'patient') {

            setPatient(DEFAULT_ITEM);
        }
    }

    const addItemHandler = () => {
        const arr = [...items];
        arr.push({
            categoryValue: DEFAULT_ITEM,
            sizeValue: '',
            fields: [],
            quantityValue: 0,
            categoryOptions: categories

        })
        setItems(arr);
    }
    if (items.length === 0 && patient && patient.name) {
        addItemHandler();
    }

    const autoCompleteDetailInputHander = (item, source) => {
        if (source.isMandatory) {
            source.error = { isError: false, errorMsg: '' };
        }
        if (item.category === 'category') {
            source.categoryValue = item;
            const cat = ORDER_FORM.find(form => form.category === item.name);
            if (cat) {
                source.fields = cat.fields;
            }
        } else {

            source.value = item;
        }
        setIsRefresh(!isRefresh);

    }

    const onChangeDetailInputHandler = (e, source) => {
        console.log('[OnChange]', e, source, e.target.name, e.target.value);
        if (e.target.value) {
            if (source.isMandatory) {
                source.error = { isError: false, errorMsg: '' };
            }
        }
        source.value = e.target.value;
        if (source.component === 'select' && !e.target.value) {
            if (source.isMandatory) {
                source.error = { isError: true, errorMsg: 'Required Field' };
            }
            source.value = DEFAULT_ITEM;
        } else if (!e.target.value) {
            if (source.isMandatory) {
                source.error = { isError: true, errorMsg: 'Required Field' };
            }
            source[e.target.name] = undefined;

        }
        setIsRefresh(!isRefresh);
    }
    const placeHolderHandler = () => {
        console.log('[Place Holders]', items);
        //validate
        let isWithError = false;
        const jsonItems = [];
        for (const it of items) {
            console.log('[It]', it);
            if (it.categoryValue && !it.categoryValue.name) {
                isWithError = true;
                it.error = {
                    isError: true,
                    errorMsg: 'Required field'

                };

            } else {
                it.error = {
                    isError: '',
                    errorMsg: ''

                };
            }
            let size = '';
            let qty = 0;
            let flavor = '';
            let uom = '';
            for (const fld of it.fields) {
                console.log('[FLD]', fld);
                fld.error = {
                    isError: false,
                    errorMsg: ''
                };
                if (fld.uom) {
                    uom = fld.uom;
                }
                if (fld.isMandatory && fld.component === 'select' && (!fld.value || (fld.value && !fld.value.name))) {
                    fld.error = {
                        isError: true,
                        errorMsg: 'Required Field'
                    };
                    isWithError = true;
                }
                if (fld.isMandatory && fld.component === 'textfield' && (!fld.value || (fld.type === 'number' && parseInt(fld.value, 10) <= 0))) {
                    fld.error = {
                        isError: true,
                        errorMsg: 'Required Field'
                    };
                    isWithError = true;
                }

                if (fld.name === 'size') {
                    size = fld.value.name;

                }
                if (fld.name === 'flavor') {
                    flavor = fld.value.name;
                }
                if (fld.name === 'quantity') {
                    qty = parseInt(fld.value, 10);

                }
            }
            jsonItems.push({
                category: it.categoryValue.name,
                size,
                qty,
                flavor,
                uom
            })
        }
        if (isWithError) {
            setIsRefresh(!isRefresh);
            return;
        } else {
            //prepare data
            isLoading = true;
            const payload = {
                reference: `DCH-${patient.id}-${moment(new Date()).format('YYYYMMDDHHmm')}`,
                requestor: 'nargel_velasco@yahoo.com',
                items: jsonItems,
                status: 'Order',
                patient_id: patient.id,
                patient_name: patient.name
            }
            console.log('[Payload orders]', payload);
            props.createOrder(payload);

        }


    }
    if (props.createOrderState && props.createOrderState.status === ACTION_STATUSES.SUCCEED) {
        isLoading = false;
        TOAST.ok('Successfully Saved.');
        props.resetCreateOrder();
        props.onPage('List Orders');
    }
    console.log('[Items]', items);
    return (
        <React.Fragment>
            {isLoading ?
                <div><CircularProgress></CircularProgress>Saving...</div>
                :
                <Grid container justifyContent="center" justifyItems="center" style={{ paddingTop: 20 }}>
                    <Grid container spacing={1} direction="row" style={{ paddingBottom: 12, paddingTop: 12 }}>
                        <Grid item xs={12} style={{ paddingBottom: 4 }}>
                            <Typography variant="h5">Request Supply</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SingleWithClearAutoComplete
                                value={patient}

                                name={'patient'}
                                label={'Patient'}
                                placeholder={'Patient'}
                                options={patientList}
                                onSelectHandler={autoCompleteGeneralInputHander}
                                onChangeHandler={onChangeGeneralInputHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider variant="fullWidth" style={{
                                height: '.03em',
                                border: 'solid 1px rgba(0, 0, 0, 0.12)'
                            }} orientation="horizontal" flexItem />
                        </Grid>
                        {patient && patient.name &&
                            <Grid item xs={12} style={{ paddingBottom: 10 }}>
                                <Typography variant="h5">Item</Typography>
                            </Grid>
                        }

                        {/* Loop */}
                        {patient && patient.name && items.map((item, index) => {
                            return (
                                <Grid container spacing={1} direction="row" style={{ paddingBottom: 12, paddingLeft: 2, paddingRight: 2 }} key={`contr-${index}`}>
                                    <Grid item xs={4}>
                                        <div style={{ display: 'inline-flex', gap: 2, paddingTop: 8, marginLeft: 4 }}>
                                            <Avatar sx={{ width: 30, height: 30 }} style={{ color: 'black', background: 'white', border: '1px solid black' }}>{index + 1}</Avatar>
                                            <Tooltip title={<h6 style={{ color: "lightblue" }}><span>Add More Item</span></h6>}>

                                                <AddIcon style={{ color: 'blue', fontSize: 30 }} onClick={() => addItemHandler()}></AddIcon>
                                            </Tooltip>
                                            <Tooltip title={'Delete'}>
                                                <DeleteIcon style={{ color: 'red', fontSize: 30 }}></DeleteIcon>
                                            </Tooltip>
                                        </div>
                                    </Grid>

                                    <Grid item xs={8} style={{ paddingBottom: 4 }}>
                                        <SingleWithClearAutoComplete
                                            source={item}
                                            value={item.categoryValue || DEFAULT_ITEM}
                                            isError={item.error ? item.error.isError : false}
                                            name={'category'}
                                            label={'Category'}
                                            placeholder={'Category'}
                                            errorMsg={item.error ? item.error.errorMsg : ''}
                                            options={item.categoryOptions}
                                            onSelectHandler={autoCompleteDetailInputHander}
                                            onChangeHandler={onChangeDetailInputHandler}
                                        />

                                    </Grid>

                                    {item.categoryValue.name &&

                                        <Grid container direction="row" spacing={2} style={{ paddingTop: 2, marginLeft: 2, paddingRight: 2 }} >
                                            {item.fields.map((field, index) => {
                                                return (
                                                    <React.Fragment key={`field${index}`}>
                                                        {
                                                            field.component === 'select' ?
                                                                <Grid item xs={field.colspan ? field.colspan : 6}>
                                                                    <SingleWithClearAutoComplete
                                                                        {...field}
                                                                        source={field}
                                                                        isError={field.error ? field.error.isError : false}
                                                                        errorMsg={field.error ? field.error.errorMsg : ''}
                                                                        value={field.value || DEFAULT_ITEM}
                                                                        onSelectHandler={autoCompleteDetailInputHander}
                                                                        onChangeHandler={onChangeDetailInputHandler}
                                                                    />
                                                                </Grid>
                                                                : <Grid item xs={field.colspan ? field.colspan : 6}>
                                                                    <RegularTextField isError={field.error ? field.error.isError : false}
                                                                        errorMsg={field.error ? field.error.errorMsg : ''} source={field} {...field} height={40} size={12} value={field.value || ''} onChange={onChangeDetailInputHandler} />
                                                                </Grid>
                                                        }
                                                    </React.Fragment>

                                                )
                                            })}
                                        </Grid>
                                    }
                                    <Grid item xs={12}>
                                        <Divider variant="fullWidth" style={{
                                            height: '.02em',
                                            border: 'solid 1px rgba(0, 0, 0, 0.12)'
                                        }} orientation="horizontal" flexItem />
                                    </Grid>
                                </Grid>
                            )
                        })}
                        {patient && patient.name &&
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" onClick={() => placeHolderHandler()}>Place Your Order</Button>
                            </Grid>
                        }

                    </Grid>

                </Grid>
            }

        </React.Fragment >
    )
}



const mapStateToProps = store => ({
    patients: patientListStateSelector(store),
    orders: orderListStateSelector(store),
    createOrderState: orderCreateStateSelector(store)


});

const mapDispatchToProps = dispatch => ({
    listPatients: (data) => dispatch(attemptToFetchPatient(data)),
    resetListPatients: () => dispatch(resetFetchPatientState()),
    listOrders: (data) => dispatch(attemptToFetchOrder(data)),
    resetListOrders: () => dispatch(resetFetchOrderState()),
    createOrder: (data) => dispatch(attemptToCreateOrder(data)),
    resetCreateOrder: () => dispatch(resetCreateOrderState())

});
export default connect(mapStateToProps, mapDispatchToProps)(Supply);