import React, { Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import Layout from "./Layouts/Base";

import Login from "./Layouts/auth/Login";
import * as actions from './store/actions';
import StockRoom from './Layouts/Pages/StockRoom';
import Transaction from './Layouts/Pages/Transaction';
import Distribution from './Layouts/Pages/Distribution';
import Invoice from './Layouts/Pages/InvoiceV2';
import Vendor from './Layouts/Settings/Vendor';
import Product from './Layouts/Settings/Product';
import Location from './Layouts/Settings/Location';
import Patient from './Layouts/Settings/Patient';
import Employee from './Layouts/Settings/Employee';
import Dashboard from './Layouts/Dashboard';
import ComponentToPrint from './Layouts/Document/PrintComponent';
import { supabaseClient } from "./config/SupabaseClient";

// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// or for Day.js
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// or for Luxon
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
// or for Moment.js
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';	
import { LocalizationProvider } from "@mui/x-date-pickers";
const App = (props) => {
	const [session, setSession] = useState(null)
	const [signedIn, setSignedIn] = useState(true);
	useEffect(() => {
	  supabaseClient.auth.getSession().then(({ data: { session } }) => {
		setSession(session)
	  })
  
	  supabaseClient.auth.onAuthStateChange((event, session) => {
			  console.log('[application]',event, session)
			  if (event === 'SIGNED_OUT') {
				  setSignedIn(false)
			  }else {
				  setSignedIn(true);
			  }
		  })
	}, [])



	useEffect(() => {
		//	props.onTryAutoSignup();
		supabaseClient.auth.onAuthStateChange((event, session) => {
			console.log('[application]',event, session)
			if (event === 'SIGNED_OUT') {
				setSignedIn(false)
			}else {
				setSignedIn(true);
			}
		})
	}, [session]);

	console.log('[signed/session]',signedIn,session);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
		<Router basename="/">

			<Layout isSignedIn={signedIn && session}>
					{!signedIn || !session ? 
					<Switch>
						<Route exact path="/" component={withRouter(Login)} />
					</Switch>
					:
					<Switch>
						<Route exact path="/stockroom" component={withRouter(StockRoom)} />
						<Route exact path="/transaction" component={withRouter(Transaction)} />
						<Route exact path="/distribution" component={withRouter(Distribution)} />
						<Route exact path="/invoice" component={withRouter(Invoice)} />
						<Route exact path="/vendor" component={withRouter(Vendor)} />
						<Route exact path="/location" component={withRouter(Location)} />
						<Route exact path="/patient" component={withRouter(Patient)} />
						<Route exact path="/employee" component={withRouter(Employee)} />
						<Route exact path="/product" component={withRouter(Product)} />
						<Route exact path="/document" component={withRouter(ComponentToPrint)} />
						<Route exact path="/dashboard" component={withRouter(Dashboard)} />
						<Route exact path="/login" component={withRouter(Login)} />
						<Route exact path="/" component={withRouter(Invoice)} />
						
					</Switch>
}
				
			</Layout>

		</Router>
		</LocalizationProvider>
	);
}




const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
		isInboxOpen: false
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));