import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { patientListStateSelector } from "../../../store/selectors/patientSelector";
import {
  attemptToFetchPatient,
  resetFetchPatientState,
} from "../../../store/actions/patientAction";
import { connect } from "react-redux";
import { ACTION_STATUSES, DEFAULT_ITEM } from "../../../utils/constants";

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
import { CameraAlt } from "@mui/icons-material";
import PhotoModal from "./PhotoModal";
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
  const [imgSrc, setImgSrc] = useState("");
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
    setImgSrc("");
    setIsPhotoOpen(true);
  };
  const closePhotoHandler = () => {
    setIsPhotoOpen(false);
  };
  const onUsePhotoHandler = (img) => {
    console.log("[Images]", img);
    setImgSrc(img);
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
              {item.status === "Ready to pickup" && (
                <div
                  style={{
                    display: "inline-flex",
                    gap: 2,
                    paddingBottom: 4,
                    paddingLeft: 4,
                  }}
                >
                  {imgSrc && (
                    <img src={imgSrc} alt="proof" height="50px" width="50px" />
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={takePhotoHandler}
                    startIcon={<CameraAlt />}
                  >
                    Take Photo
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      border: "solid 1px #2196f3",
                      color: "white",
                      background: "green",
                      fontFamily: "Roboto",
                      fontSize: "12px",
                      fontWeight: 500,
                      fontStretch: "normal",
                      fontStyle: "normal",
                      lineHeight: 1.71,
                      letterSpacing: "0.4px",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                    component="span"
                  >
                    Click to Pickup
                  </Button>
                </div>
              )}
              {item.status !== "Ready to pickup" &&
                item.status !== "delivered" && (
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
                    <Button variant="contained" size="small" color="primary">
                      Re-Order
                    </Button>
                    {item.status === "Order" && (
                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                )}
            </Accordion>
          );
        })}
      </div>

      {isPhotoOpen && (
        <PhotoModal
          isOpen={isPhotoOpen}
          closePhotoHandler={closePhotoHandler}
          onUsePhotoHandler={onUsePhotoHandler}
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
