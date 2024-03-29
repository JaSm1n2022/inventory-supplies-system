import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./Layouts/Base";

import Login from "./Layouts/auth/Login";
import * as actions from "./store/actions";
import StockRoom from "./Layouts/Pages/StockRoom";
import Transaction from "./Layouts/Pages/Transaction";
import Distribution from "./Layouts/Pages/Distribution";
import Invoice from "./Layouts/Pages/InvoiceV2";
import Vendor from "./Layouts/Settings/Vendor";
import Product from "./Layouts/Settings/Product";
import Location from "./Layouts/Settings/Location";
import Patient from "./Layouts/Settings/Patient";
import Threshold from "./Layouts/Settings/Threshold";
import Employee from "./Layouts/Settings/Employee";
import Dashboard from "./Layouts/Dashboard";
import ClientExpensesReport from "./Layouts/Pages/Reports/Distribution";
import OfficeExpensesReport from "./Layouts/Pages/Reports/Transaction/office";
import MedicalExpensesReport from "./Layouts/Pages/Reports/Transaction/medical";
import InvoiceExpensesReport from "./Layouts/Pages/Reports/Transaction/invoice";
import ComponentToPrint from "./Layouts/Document/PrintComponent";
import WebOrder from "./Layouts/Pages/WebOrder";
import { supabaseClient } from "./config/SupabaseClient";

// date-fns

// or for Day.js
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// or for Luxon
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
// or for Moment.js
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
const isTrue = true;
const App = (props) => {
  const [session, setSession] = useState(null);
  const [signedIn, setSignedIn] = useState(true);
  const [requestor, setRequestor] = useState("");
  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log("[application]", event, session);
      if (event === "SIGNED_OUT") {
        setSignedIn(false);
      } else {
        setSignedIn(true);
      }
    });
  }, []);

  useEffect(() => {
    //	props.onTryAutoSignup();
    supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log("[application]", event, session);
      if (event === "SIGNED_OUT") {
        setSignedIn(false);
      } else {
        setRequestor(session.user.email);
        setSignedIn(true);
      }
    });
  }, [session]);

  console.log("[signed/session]", signedIn, session);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <Router basename="/">
        <Layout isSignedIn={signedIn && session} requestor={requestor}>
          {!signedIn || !session ? (
            <Switch>
              <Route exact path="/" component={withRouter(Login)} />
            </Switch>
          ) : !isTrue ? (
            <Route exact path="/" component={withRouter(WebOrder)} />
          ) : (
            <Switch>
              <Route
                exact
                path="/stockroom"
                component={withRouter(StockRoom)}
              />
              <Route
                exact
                path="/transaction"
                component={withRouter(Transaction)}
              />
              <Route
                exact
                path="/distribution"
                component={withRouter(Distribution)}
              />
              <Route exact path="/invoice" component={withRouter(Invoice)} />
              <Route exact path="/vendor" component={withRouter(Vendor)} />
              <Route exact path="/location" component={withRouter(Location)} />
              <Route exact path="/patient" component={withRouter(Patient)} />
              <Route
                exact
                path="/threshold"
                component={withRouter(Threshold)}
              />
              <Route exact path="/employee" component={withRouter(Employee)} />
              <Route exact path="/product" component={withRouter(Product)} />
              <Route
                exact
                path="/document"
                component={withRouter(ComponentToPrint)}
              />
              <Route
                exact
                path="/dashboard"
                component={withRouter(Dashboard)}
              />
              <Route
                exact
                path="/clientexpensereport"
                component={withRouter(ClientExpensesReport)}
              />
              <Route
                exact
                path="/officeexpensereport"
                component={withRouter(OfficeExpensesReport)}
              />
              <Route
                exact
                path="/medicalexpensereport"
                component={withRouter(MedicalExpensesReport)}
              />
              <Route
                exact
                path="/invoiceexpensereport"
                component={withRouter(InvoiceExpensesReport)}
              />
              <Route exact path="/login" component={withRouter(Login)} />
              <Route exact path="/" component={withRouter(Invoice)} />
            </Switch>
          )}
        </Layout>
      </Router>
    </LocalizationProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    isInboxOpen: false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
