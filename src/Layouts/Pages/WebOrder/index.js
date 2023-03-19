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
import Supply from "./Supply";
import Orders from "./Orders";

let patientList = [];
let isPatientListDone = false;
const WebOrder = (props) => {

    const [patient, setPatient] = useState(DEFAULT_ITEM);
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const [isSupplyPage, setIsSupplyPage] = useState(true);
    const [isListOrderPage, setIsListOrderPage] = useState(false);
    useEffect(() => {
        isPatientListDone = false;
        props.listPatients();

    }, []);

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
    const onPageHandler = (page) => {
        console.log('[OnPage]', page);
        if (page === 'Request Supply') {
            setIsSupplyPage(true);
            setIsListOrderPage(false);
        } else if (page === 'List Orders') {
            setIsSupplyPage(false);
            setIsListOrderPage(true);
        }
    }
    return (
        <React.Fragment>
            {isPatientListDone ?
                <Grid container justifyContent="center" justifyItems="center" style={{ paddingTop: 20 }}>
                    <OrderBar onPage={onPageHandler} />
                    {isSupplyPage &&
                        <Supply patientList={patientList} onPage={onPageHandler} />
                    }
                    {isListOrderPage &&
                        <Orders patientList={patientList} />
                    }

                </Grid>
                : <div><CircularProgress></CircularProgress>Loading...</div>
            }
        </React.Fragment >
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

