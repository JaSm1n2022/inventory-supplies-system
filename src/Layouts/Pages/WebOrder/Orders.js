import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { patientListStateSelector } from "../../../store/selectors/patientSelector";
import {
  attemptToFetchPatient,
  resetFetchPatientState,
} from "../../../store/actions/patientAction";
import { connect } from "react-redux";
import {
  ACTION_STATUSES,
  DEFAULT_ITEM,
  ORDER_FORM,
} from "../../../utils/constants";
import SingleWithClearAutoComplete from "../../../Common/components/AutoComplete/SingleWithClearAutoComplete";
import RegularTextField from "../../../Common/components/TextField/RegularTextField";
import OrderBar from "../../OrderBar";
import moment from "moment";
import {
  orderCreateStateSelector,
  orderListStateSelector,
} from "../../../store/selectors/orderSelector";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  attemptToCreateOrder,
  attemptToFetchOrder,
  resetCreateOrderState,
  resetFetchOrderState,
} from "../../../store/actions/orderAction";
import Helper from "../../../utils/helper";
import { makeStyles } from "@mui/styles";
import Proof from "./Proof";
import { CameraAlt } from "@mui/icons-material";
import Photo from "./Photo";
import PhotoSimple from "./PhotoSimple";
let orderList = [];
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    padding: 2,
    width: "100%",
  },

  tickSize: {
    transform: "scale(1.5)",
  },
}));
const Orders = (props) => {
  const classes = useStyles();
  const [patient, setPatient] = useState(DEFAULT_ITEM);
  const [patientList, setPatientList] = useState([]);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [isPhotoOpen2, setIsPhotoOpen2] = useState(false);
  useEffect(() => {
    const dateRange = Helper.formatDateRangeByCriteriaV2(
      "last7Days",
      "created"
    );

    props.listOrders({ from: dateRange.from, to: dateRange.to });
  }, []);

  if (props.orders && props.orders.status === ACTION_STATUSES.SUCCEED) {
    console.log("[Orders props]", props.orders);
    orderList = props.orders.data || [];
    props.resetListOrders();
  }

  const takePhotoHandler = () => {
    setIsPhotoOpen(true);
  };
  const closePhotoHandler = () => {
    setIsPhotoOpen(false);
  };
  const takePhotoHandler2 = () => {
    setIsPhotoOpen2(true);
  };
  const closePhotoHandler2 = () => {
    setIsPhotoOpen(false);
  };
  const onUsePhotoHandler = (img) => {
    console.log("[Images]", img);
    setIsPhotoOpen(false);
  };
  const onUsePhotoHandler2 = (img) => {
    console.log("[Images]", img);
    setIsPhotoOpen(false);
  };
  return (
    <React.Fragment>
      <div className={classes.root} style={{ paddingTop: 10 }}>
        <Typography variant="h6">Orders</Typography>

        {orderList.map((item) => {
          return (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
              >
                <Grid justifyContent="space-between" container>
                  <div style={{ display: "inline-flex", gap: 4 }}>
                    <Typography variant="body2">
                      {moment(item.created_at).format("MM/DD/YY")}
                    </Typography>
                    <Typography variant="body2" style={{ fontWeight: "bold" }}>
                      {item.patient_name || ""}
                    </Typography>
                  </div>
                  <Typography variant="body2" style={{ fontWeight: "bold" }}>
                    {item.status}
                  </Typography>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="row" spacing={1}>
                  <Grid item xs={4}>
                    <div>
                      <Typography>Category</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Description</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Quantity</Typography>
                  </Grid>
                </Grid>
                {item.items.map((i, indx) => {
                  return (
                    <Grid container direction="row" spacing={1}>
                      <Grid item xs={4}>
                        <div style={{ display: "inline-flex", gap: 4 }}>
                          <Typography>{indx + 1}. </Typography>
                          <Typography>{i.category}</Typography>
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>{i.flavor || i.size}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>
                          {i.qty} {i.uom || ""}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                })}
              </AccordionDetails>
              <div
                style={{
                  display: "inline-flex",
                  gap: 4,
                  paddingBottom: 2,
                  paddingLeft: 4,
                }}
              >
                <CameraAlt
                  style={{ display: "none", fontSize: "24pt" }}
                  onClick={() => takePhotoHandler()}
                />
                <CameraAlt
                  style={{ fontSize: "24pt" }}
                  onClick={() => takePhotoHandler2()}
                />
                <Button variant="contained" size="small" color="primary">
                  Re-Order
                </Button>
                {item.status === "Order" && (
                  <Button variant="contained" size="small" color="secondary">
                    Cancel
                  </Button>
                )}
              </div>
            </Accordion>
          );
        })}
      </div>
      {isPhotoOpen && (
        <Photo
          isOpen={isPhotoOpen}
          closePhotoHandler={closePhotoHandler}
          onUsePhotoHandler={onUsePhotoHandler}
        />
      )}
      {isPhotoOpen2 && (
        <PhotoSimple
          isOpen={isPhotoOpen2}
          closePhotoHandler={closePhotoHandler2}
          onUsePhotoHandler={onUsePhotoHandler2}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (store) => ({
  patients: patientListStateSelector(store),
  orders: orderListStateSelector(store),
  createOrderState: orderCreateStateSelector(store),
});

const mapDispatchToProps = (dispatch) => ({
  listPatients: (data) => dispatch(attemptToFetchPatient(data)),
  resetListPatients: () => dispatch(resetFetchPatientState()),
  listOrders: (data) => dispatch(attemptToFetchOrder(data)),
  resetListOrders: () => dispatch(resetFetchOrderState()),
  createOrder: (data) => dispatch(attemptToCreateOrder(data)),
  resetCreateOrder: () => dispatch(resetCreateOrderState()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
