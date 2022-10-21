import React, { useState, useEffect, Component } from "react";
import { loadImg } from "../Components/Util/loadImg";
import FooterLogo from '../assets/images/cwFooter.png';
import StorageUtil from '../utils/storageUtil';

class Footer extends Component {
	state = {
		time: "15:36",
		date: "2021-02-19",
	};

	handleTimeChange = (e) => {
		let valueTime = e.target.value;
		this.setState({
			...this.state,
			time: e.target.value,
		});
		console.log(this.state);
	};

	handleDateChange = (e) => {
		let valueDate = e.target.vat;
		this.setState({
			...this.state,
			date: e.target.value,
		});
		console.log(this.state);
		console.log(valueDate);
		console.log("changews");
	};

	handInputCheckedChange = (e) => {
		console.log(e);
	};

	render() {
		// console.log(this.state);
		const user = StorageUtil.getUser()
	
		return (
			<React.Fragment>
				<footer className="footer" style={{display:StorageUtil.getUser() !== null ? 'none':''}}>
					<div className="container">
						<div className="row">
							<div className="col-md-4">
								<div className="foo-widget foo-textblock">
									<a href="index.html">
										<img src={loadImg(FooterLogo)} alt="Logo" />
									</a>
								</div>
							</div>
							<div className="col-md-3 offset-md-1">
								<div className="foo-widget foo-nav">
									<h3 className="widget-title">More Links</h3>
									<ul>
										<li>
											<a href="#">About</a>
										</li>
										<li>
											<a href="#">Privacy Policy</a>
										</li>
										<li>
											<a href="#">Terms & Conditions</a>
										</li>
										<li>
											<a href="#">Contact</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="col-md-4">
								<div className="foo-widget newsletter">
									<h3 className="widget-title">Newsletter</h3>
									<form action="index.html">
										<input type="text" placeholder="Sign up for our newsletter" />
										<button type="submit">Submit</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</footer>

				{/* <!-- Footer for Mobile --> */}
				<div className="mobile-footer">
					<ul className="mobile-footer-menu">
						<li>
							<a href="#">
								<i className="fas fa-home"></i>
								<span>Home</span>
							</a>
						</li>
						<li>
							<a href="#">
								<i className="fas fa-comments"></i>
								<span>Delivery</span>
							</a>
						</li>
						<li>
							<a href="#" className="m-map-toggler">
								<i className="fas fa-map-marker-alt"></i> Map
							</a>
						</li>
						<li>
							<a href="#">
								<i className="fas fa-clock"></i>
								<span>About</span>
							</a>
						</li>
					</ul>
				</div>

				<div className="transparent-panel close-btn"></div>

				
				<div className="notification-panel settings-panel right-panel" id="settingsToggler">
					<h4 className="panel-title">Settings</h4>
					<button className="close-btn">
						<i className="fas fa-times"></i>
					</button>
					<a href="settings.html" className="settings-btn">
						<i className="fas fa-cog"></i>
					</a>
					<div className="tab-panel">
						<div className="thread">
							<h5 className="thread-title">Account Settings</h5>
							<div className="custom-control custom-switch">
								<input type="checkbox" className="custom-control-input" id="settings-switch1" onChange={() => this.handInputCheckedChange} checked />
								<label className="custom-control-label" htmlFor="settings-switch1">
									Auto updates
								</label>
							</div>
							<div className="custom-control custom-switch">
								<input type="checkbox" className="custom-control-input" id="settings-switch2" />
								<label className="custom-control-label" htmlFor="settings-switch2">
									Location Permission
								</label>
							</div>
							<div className="custom-control custom-switch">
								<input type="checkbox" className="custom-control-input" id="settings-switch3" />
								<label className="custom-control-label" htmlFor="settings-switch3">
									Show offline Contacts
								</label>
							</div>
						</div>
						<div className="thread">
							<h5 className="thread-title">General Settings</h5>
							<div className="custom-control custom-switch">
								<input type="checkbox" className="custom-control-input" id="settings-switch4" onChange={() => this.handInputCheckedChange} checked />
								<label className="custom-control-label" htmlFor="settings-switch4">
									Show me Online
								</label>
							</div>
							<div className="custom-control custom-switch">
								<input type="checkbox" className="custom-control-input" id="settings-switch5" onChange={() => this.handInputCheckedChange} checked />
								<label className="custom-control-label" htmlFor="settings-switch5">
									Status visible to all
								</label>
							</div>
							<div className="custom-control custom-switch">
								<input type="checkbox" className="custom-control-input" id="settings-switch6" />
								<label className="custom-control-label" htmlFor="settings-switch6">
									Notifications Popup
								</label>
							</div>
						</div>
					</div>
				</div>

				<div className="notification-panel mobile-search-panel right-panel" id="searchPanel">
					<button className="close-btn">
						<i className="fas fa-times"></i>
					</button>
					<form className="form-inline my-2 my-lg-0">
						<input id="search-mbl" className="form-control mr-sm-2" placeholder="Search for a shipment" />
						<button className="search-btn" type="submit">
							<i className="fas fa-search"></i>
						</button>
					</form>
				</div>

			
				{/* <!-- Modal --> */}
				<div className="modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">
									Shipment Details - Shipment <strong>18924930</strong>
								</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<ul className="shipment-state">
									<li>
										<strong>Booked</strong>
										5/09/2019
										<br />
										09:30 AM (Actual)
									</li>
									<li>
										<strong>Confirmed</strong>
										5/09/2019
										<br />
										09:30 AM (Actual)
									</li>
									<li>
										<strong>Driver Assigned</strong>
										5/09/2019
										<br />
										09:30 AM (Actual)
									</li>
									<li>
										<strong>Apporoach Pick up</strong>
										5/09/2019
										<br />
										09:30 AM (Actual)
									</li>
									<li>
										<strong>Picked up</strong>
										5/09/2019
										<br />
										09:30 AM (Actual)
									</li>
									<li>
										<strong>Approach Delivery</strong>
										5/09/2019
										<br />
										09:30 AM (Actual)
									</li>
									<li className="disabled">
										<strong>Delivered</strong>
										5/09/2019
										<br />
										09:30 AM (Actual)
									</li>
								</ul>

								<div className="row">
									<div className="col-md-6">
										<div className="s-block">
											<h3 className="title">Shipment Parties</h3>
											<div className="row">
												<div className="col-md-6">
													<p className="text">
														Expected Ship Date <span>5/13/2019</span>
													</p>
													<p className="text">
														Shipper <span>Global Distribution</span>
													</p>
													<p className="text">
														Origin{" "}
														<span>
															<b>617 Springfield Ave, Springfield, NJ 07094 USA</b>
														</span>
													</p>
												</div>
												<div className="col-md-6">
													<p className="text">
														Est. Delivered Date <span>5/13/2019</span>
													</p>
													<p className="text">Consignee ACME Corp</p>
													<p className="text">
														<span>
															<b>1952 Rt. 28, Newark NJ 0101 USA</b>
														</span>
													</p>
												</div>
											</div>
										</div>
										<div className="s-block">
											<h3 className="title">Product Details</h3>
											<div className="row">
												<div className="col-md-6">
													<p className="text">
														Product Description
														<span>Portable Air conditioners</span>
													</p>
													<p className="text">
														Shipped Quantity <span>5</span>
													</p>
												</div>
												<div className="col-md-6">
													<p className="text">
														Weight<span>328</span>
													</p>
													<p className="text">
														Weight UOM <span>LBS</span>
													</p>
												</div>
											</div>
										</div>
										<div className="s-block">
											<h3 className="title">Reference</h3>
											<div className="row">
												<div className="col-md-6">
													<p className="text">
														Shipment Number
														<span>203942013</span>
													</p>
													<p className="text">
														Ref 1: Manifest <span>67890357</span>
													</p>
												</div>
												<div className="col-md-6">
													<p className="text">
														Ref 2: Shipper Ref
														<span>LO928301</span>
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="s-block">
											<h3 className="title">Receiving</h3>
											<div className="row">
												<div className="col-lg-6">
													<div className="s-innerBlock">
														<label htmlFor="">Received Qty.</label>
														<input type="number" min="0" name="" />
													</div>
													<div className="s-innerBlock">
														<label htmlFor="">Receipt Notes</label>
														<textarea name=""></textarea>
													</div>
													<div className="s-innerBlock">
														<label htmlFor="">Proof of Delivery Images</label>
														<p>NONE</p>
													</div>
												</div>
												<div className="col-lg-6">
													<div className="s-innerBlock">
														<label htmlFor="">QS&D</label>
														<input type="checkbox" name="" />
													</div>
													<div className="s-innerBlock">
														<label htmlFor="">QS&D Reason</label>
														<select name="">
															<option value=""></option>
														</select>
													</div>
													<div className="s-innerBlock">
														<label htmlFor="">QS&D Notes</label>
														<textarea name=""></textarea>
													</div>
													<div className="s-innerBlock">
														<label htmlFor="">Proof of Delivery Signature</label>
														<p>NONE</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

						</React.Fragment>
		);
	}
}

export default Footer;
