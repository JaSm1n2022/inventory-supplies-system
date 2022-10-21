import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, withRouter,Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Layout from "./Layouts/Base";

import Login from "./Layouts/auth/Login";
import Logout from  "./Layouts/auth/Logout";
import * as actions from './store/actions';
import StorageUtil from "./utils/storageUtil";
import SupplyOrder from './Layouts/Pages/SupplyOrder';
import StockRoom from './Layouts/Pages/StockRoom';
import Distribution from './Layouts/Pages/Distribution';
import Invoice from './Layouts/Pages/Invoice';
import Vendor from './Layouts/Settings/Vendor';
import Location from './Layouts/Settings/Location';
import Client from './Layouts/Settings/Client';
import Worker from './Layouts/Settings/Worker';
import Dashboard from './Layouts/Dashboard';

  

class App extends Component {
	componentDidMount() {
		console.log('[StorageUtil.getUser()',StorageUtil.getUser());
		this.props.onTryAutoSignup();
	}


	render() {
		console.log(process.env.NODE_ENV);

		return (
			<Router basename="/">
				<Layout isAuthenticated = {true}>
						<Switch>
							<Route exact path="/" component={withRouter(Login)} />
							<Route exact path="/stockroom" component={withRouter(StockRoom)} />
							<Route exact path="/supplyorder" component={withRouter(SupplyOrder)} />
							<Route exact path="/distribution" component={withRouter(Distribution)} />
							<Route exact path="/invoice" component={withRouter(Invoice)} />
							<Route exact path="/vendor" component={withRouter(Vendor)} />
							<Route exact path="/location" component={withRouter(Location)} />
							<Route exact path="/client" component={withRouter(Client)} />
							<Route exact path="/worker" component={withRouter(Worker)} />
							<Route exact path="/dashboard" component={withRouter(Dashboard)} />
							<Route exact path="/login" component={withRouter(Login)} />
							<Redirect to="/" />
						</Switch>
		
				</Layout>
				
			</Router>
		);
	}

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