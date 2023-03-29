import React from "react";
import { connect } from "react-redux";

import Header from "./Header";
import {
  ToastProvider,
  DefaultToastContainer,
} from "react-toast-notifications";

import { Grid } from "@mui/material";
export const CustomToastContainer = (props) => (
  // eslint-disable-next-line
  <DefaultToastContainer {...props} style={{ zIndex: 9999 }} />
);

const Base = (props) => {
  console.log("props.children", props.isSignedIn);

  return (
    <ToastProvider components={{ ToastContainer: CustomToastContainer }}>
      {props.isSignedIn ? (
        <React.Fragment>
          <Header requestor={props.requestor} />
          <main requestor={props.requestor}>{props.children}</main>
        </React.Fragment>
      ) : (
        <main>{props.children}</main>
      )}
    </ToastProvider>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Base);
