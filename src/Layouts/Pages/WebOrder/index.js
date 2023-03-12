import { Avatar, Button, CircularProgress, Divider, Grid, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RegularSelect from "../../../Common/components/Select/RegularSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { patientListStateSelector } from "../../../store/selectors/patientSelector";
import { attemptToFetchPatient, resetFetchPatientState } from "../../../store/actions/patientAction";
import { connect } from "react-redux";
import { ACTION_STATUSES, DEFAULT_ITEM, ORDER_FORM } from "../../../utils/constants";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import RegularTextField from "../../../Common/components/TextField/RegularTextField";
let patientList = [];
let isPatientListDone = false;
const WebOrder = (props) => {
    const [patient, setPatient] = useState(DEFAULT_ITEM);
    const [patientError, setPatientError] = useState({ isError: false, message: '' });
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);

    useEffect(() => {
        isPatientListDone = false;
        console.log('[ORDER_FORM]', ORDER_FORM)
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
        props.listPatients();

    }, []);
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
    if (props.patients && props.patients.status === ACTION_STATUSES.SUCCEED) {
        patientList = [...props.patients.data];
        patientList.forEach(item => {
            item.name = item.name.toUpperCase();
            item.value = item.name.toUpperCase();
            item.label = item.name.toUpperCase();
            item.categoryType = 'patient'
        });
        isPatientListDone = true;
        props.resetListPatients();
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
        source.value = e.target.value;
        if (!e.target.value) {
            source[e.target.name] = undefined;

        } else {

        }
        setIsRefresh(!isRefresh);
    }
    console.log('[Items]', items);
    return (
        <React.Fragment>
            {isPatientListDone ?
                <Grid container justifyContent="center" justifyItems="center" style={{ paddingTop: 20 }}>
                    <div>
                        <Typography>CNA ORDER FORM</Typography>
                    </div>
                    <Grid container spacing={1} direction="row" style={{ paddingBottom: 12, paddingTop: 12 }}>
                        <Grid item xs={12}>
                            <SingleWithClearAutoComplete
                                value={patient}
                                isError={patient.isError}
                                name={'patient'}
                                label={'Patient'}
                                placeholder={'Patient'}
                                errorMsg={patient.message}
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
                                <Typography variant="h5">Order</Typography>
                            </Grid>
                        }

                        {/* Loop */}
                        {items.map((item, index) => {
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
                                            isError={item.isCategoryError}
                                            name={'category'}
                                            label={'Category'}
                                            placeholder={'Category'}
                                            errorMsg={item.categoryErrorMessage}
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
                                                                        value={field.value || DEFAULT_ITEM}
                                                                        onSelectHandler={autoCompleteDetailInputHander}
                                                                        onChangeHandler={onChangeDetailInputHandler}
                                                                    />
                                                                </Grid>
                                                                : <Grid item xs={field.colspan ? field.colspan : 6}>
                                                                    <RegularTextField source={field} {...field} height={40} size={12} value={field.value || ''} onChange={onChangeDetailInputHandler} />
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
                                <Button variant="contained" color="primary">Place Your Order</Button>
                            </Grid>
                        }
                    </Grid>
                </Grid>
                : <div><CircularProgress></CircularProgress>Loading...</div>
            }
        </React.Fragment>
    )
}



const mapStateToProps = store => ({
    patients: patientListStateSelector(store),


});

const mapDispatchToProps = dispatch => ({
    listPatients: (data) => dispatch(attemptToFetchPatient(data)),
    resetListPatients: () => dispatch(resetFetchPatientState()),

});
export default connect(mapStateToProps, mapDispatchToProps)(WebOrder);

