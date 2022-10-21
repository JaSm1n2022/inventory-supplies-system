/*
 * All Selectors
 */

if (document.querySelectorAll(".quick-edit-btn").length > 0) {
	var EditFieldsRow = document.querySelectorAll(".editable");
	var QuickEditButton = document.querySelectorAll(".quick-edit-btn");
	var DropdownMenuButton = document.querySelectorAll(".dropdownMenuButton");
	var CelendarBtn = document.querySelectorAll(".celendar-btn");
	var dateBtn = document.querySelectorAll(".date-btn");
	var locationEditBtn = document.querySelectorAll(".location-edit-btn");
	var PartyEditBtn = document.querySelectorAll(".party-edit-btn");
	var PersonEditBtn = document.querySelectorAll(".person-edit-btn");
	var dateFromBtn = document.querySelectorAll(".date-time-box.from p");
	var celendarClose = document.querySelectorAll(".celendar-close");
	var LocationCanel = document.querySelectorAll(".location-cancel");
	var BtnToday = document.querySelectorAll(".btn-today");
	var BtnTomrrow = document.querySelectorAll(".btn-tomorrow");
	var BtnYesterday = document.querySelectorAll(".btn-yesterday");
	var MoreDetailsDot = document.querySelectorAll(
		".more-info i.fas.fa-ellipsis-h"
	);
	var DateTimeSave = document.querySelector(".dateTime-btn-save");
	var DateTimeCancel = document.querySelector(".dateTime-btn-cancel");
	var DateTimeClear = document.querySelector(".dateTime-btn-clear");
	var DateSave = document.querySelector(".date-btn-save");
	var DateCancel = document.querySelector(".date-btn-cancel");
	var DateClear = document.querySelector(".date-btn-clear");

	var LocationSave = document.querySelector(".location-save");
	var PartySave = document.querySelector(".party-save");
	var PersonSave = document.querySelector(".person-save");
	var ALlTd = document.querySelectorAll("td");
	var AllLocationList = document.querySelectorAll("#LocationSearchBox li span");
	var AllPartyList = document.querySelectorAll("#ParthSearchBox li span");
	var AllPersonList = document.querySelectorAll("#PersonSearchBox li span");

	var LocaaToolTipMsg = ` <p><b>ASML NEWTOWN</b> (WAREHOUSE)</p>
                            <p>77 DANBURY RA WILTON, CT 06897 USA</p>
                            <p>(908) 555-5555</p>
                            <p><b>Contact</b></p>
                            <p>Connie Rice</p>
                            <p><a href="mailto:crice@asml.com">crice@asml.com</a></p>
                            <p>(908) 555-5555</p>`;
	var CalendarToolTipMsg = ` <p>Last Update on <b>1/9/2021</b><br></p>
                            <p>By <b>Steven Brown</b> from Advanced Transportation <br></p>
                            <p>Previous ETD was <b>1/8/2021 OS:OO PM</b></p>`;
	var PartyToolTipMsg = ` <p>SPLENDID COURIER</p>
                            <p><b>SPLENDID COURIER SERVICES LTD</b></p>
                            <p>01 MAIN ST, NEWARK, NJ 07128</p>
                            <p>(908) 555-5555</p><br>
                            <p><b>Contact</b></p>
                            <p>Robert Smythe</p>
                            <p><a href="mailto:robert@splenidcourier.com">robert@splenidcourier.com</a></p>
                            <p>(908) 555-5555</p>`;

	// function parents(selector) {
	//     document.querySelectorAll(selector);
	// }
	var id = 0;
	ALlTd.forEach((element) => {
		element.setAttribute("table-id", "adata" + id++);
	});

	// Quick Edit Button for Full row
	for (let RowIndex = 0; RowIndex < QuickEditButton.length; RowIndex++) {
		QuickEditButton[RowIndex].addEventListener("click", function (event) {
			this.parentElement.style.display = "none";
			var outers = this.parentElement.parentElement.parentNode;
			var AllRow = outers.querySelectorAll(" .editable");

			for (let index = 0; index < AllRow.length; index++) {
				AllRow[index].classList.toggle("edit");
			}

			// console.log(AllRow);
			for (var i = 0; i < outers.length; i++) {
				var elements_in_outer = outers[i].querySelectorAll(".editable");
				elements_in_outer = Array.prototype.slice.call(elements_in_outer);

				found_elements = found_elements.concat(elements_in_outer);
				console.log(found_elements);
			}
			event.preventDefault();
		});
	}

	/* Calendar Popup */
	for (let index = 0; index < DropdownMenuButton.length; index++) {
		DropdownMenuButton[index].addEventListener("click", function (e) {
			console.log("popup");
			// var CheckSelector = this.closest(".date-time-box").className;
			// // console.log(CheckSelector);
			DataPassingInPopup(this, ".viewVerfiy", "");
			getPosition(e, ".viewVerfiy", this);
		//	e.stopPropagation();
		});
	}

	/* Row Popup */
	for (let index = 0; index < CelendarBtn.length; index++) {
		CelendarBtn[index].addEventListener("click", function (e) {
			var CheckSelector = this.closest(".date-time-box").className;
			// console.log(CheckSelector);
			console.log("calender check");
			DataPassingInPopup(this, ".dateTime", CheckSelector);
			getPosition(e, ".dateTime", this);
		//	e.stopPropagation();
		});
	}

	Onchangefunction("#dateBoth");
	//Onchangefunction("#timeBoth");
	Onchangefunction("#date");

	// Date
	// if(CelendarBtn.length > 0){}
	for (let index = 0; index < dateBtn.length; index++) {
		dateBtn[index].addEventListener("click", function (e) {
			var CheckSelector = this.closest(".date-time-box").className;
			DataPassingInPopup(this, ".onlydate", CheckSelector);
			getPosition(e, ".onlydate", this);
			e.stopPropagation();
		});
	}

	/* Location Popup */
	for (let index = 0; index < locationEditBtn.length; index++) {
		locationEditBtn[index].addEventListener("click", function (e) {
			var CheckSelector = this.closest(".date-time-box").className;
			DataPassingInPopup(this, ".table-location-items ", CheckSelector);
			getPosition(e, ".table-location-items", this);
		//	e.stopPropagation();
		});
	}
	//
	

	/* Party Popup */
	for (let index = 0; index < PartyEditBtn.length; index++) {
		PartyEditBtn[index].addEventListener("click", function (e) {
			var CheckSelector = this.closest(".date-time-box").className;
			DataPassingInPopup(this, ".party-popup ", CheckSelector);
			getPosition(e, ".party-popup", this);
			e.stopPropagation();
		});
	}

	/* Person Popup */
	for (let index = 0; index < PersonEditBtn.length; index++) {
		PersonEditBtn[index].addEventListener("click", function (e) {
			var CheckSelector = this.closest(".date-time-box").className;
			DataPassingInPopup(this, ".person-popup ", CheckSelector);
			getPosition(e, ".person-popup", this);
		//	e.stopPropagation();
		});
	}

	/* Table Item Content Expand */
	for (let index = 0; index < dateFromBtn.length; index++) {
		dateFromBtn[index].addEventListener("click", function (e) {
			if (
				hasClass(
					this.parentElement.parentElement.parentElement.parentElement,
					"edit"
				)
			) {
				this.parentElement.nextElementSibling.classList.toggle("active");
			} else {
				this.parentElement.classList.toggle("active");
			}
			e.stopPropagation();
		});
	}

	/* More Details after clicking the dotted button */
	for (let index = 0; index < MoreDetailsDot.length; index++) {
		MoreDetailsDot[index].addEventListener("click", function (e) {
			if (
				this.parentElement.parentElement.previousElementSibling.querySelectorAll(
					".date-time-box.to"
				).length > 0
			) {
				this.parentElement.parentElement.previousElementSibling
					.querySelector(".date-time-box.to")
					.classList.toggle("active");
				console.log("yes");
			} else {
				this.parentElement.classList.toggle("active");
				this.parentElement.parentElement.previousElementSibling.classList.toggle(
					"active"
				);
				console.log("no");
			}
			e.stopPropagation();
		});
	}

	/* Calendar Close Button */
	for (let index = 0; index < celendarClose.length; index++) {
		celendarClose[index].addEventListener("click", function (e) {
			this.parentElement.classList.remove("active");
			ClaseRemoveDataChanging(this, ".calender-popup");
		//	e.stopPropagation();
		});
	}

	/* Calendar Date/Time Save Function */
	DateTimeSave.addEventListener("click", function (e) {
		var Date = this.parentElement.previousElementSibling.previousElementSibling
			.value;
		var Time = this.parentElement.previousElementSibling.value;
		// console.log(Date);
		// console.log(Time);
		ClaseRemoveDataChanging(this, ".calender-popup");
		this.parentElement.parentElement.classList.remove("active");
		//e.stopPropagation();
	});

	/* Calendar Date/Time Cancel Function */
	DateTimeCancel.addEventListener("click", function (e) {
		this.parentElement.parentElement.classList.remove("active");
		ClaseRemoveDataChanging(this, ".calender-popup");
	//	e.stopPropagation();
	});

	/* Calendar Date Save Function */
	DateSave.addEventListener("click", function (e) {
		this.parentElement.parentElement.classList.remove("active");
		ClaseRemoveDataChanging(this, ".calender-popup");
	//	e.stopPropagation();
	});

	/* Calendar Date Cancel Function */
	DateCancel.addEventListener("click", function (e) {
		this.parentElement.parentElement.classList.remove("active");
		ClaseRemoveDataChanging(this, ".calender-popup");
	//	e.stopPropagation();
	});

	/* Location Close Button */
	for (let index = 0; index < LocationCanel.length; index++) {
		LocationCanel[index].addEventListener("click", function (e) {
			this.parentElement.parentElement.classList.remove("active");
			ClaseRemoveDataChanging(this, ".table-popup-items");
		//	e.stopPropagation();
		});
	}

	/* Location Save function */
	LocationSave.addEventListener("click", function (e) {
		this.parentElement.parentElement.classList.remove("active");
		ClaseRemoveDataChanging(this, ".table-location-items");
		//e.stopPropagation();
	});

	/* Party Save Function */
	PartySave.addEventListener("click", function (e) {
		this.parentElement.parentElement.classList.remove("active");
		ClaseRemoveDataChanging(this, ".party-popup");
		e.stopPropagation();
	});

	/* Person Save function */
	PersonSave.addEventListener("click", function (e) {
		this.parentElement.parentElement.classList.remove("active");
		ClaseRemoveDataChanging(this, ".person-popup");
	//	e.stopPropagation();
	});

	/* Date/Time Fields on change */
	function Onchangefunction(seletor) {
		document.querySelector(seletor).addEventListener("change", function () {
			var FieldValue = this.value;
			DataChanging(this, ".calender-popup", FieldValue);
		});
	}

	DatePassingFromButton(
		BtnToday,
		"dateBoth",
		getdate(0)
	); /* Today  This button function DATE/TIME*/
	DatePassingFromButton(
		BtnTomrrow,
		"dateBoth",
		getdate(1)
	); /* Tomorrow  This button function DATE/TIME*/
	DatePassingFromButton(
		BtnYesterday,
		"dateBoth",
		getdate(-1)
	); /* Yeasterday  This button function DATE/TIME*/

	DatePassingFromButton(
		BtnToday,
		"dateBothTo",
		getdate(0)
	); /* Today  This button function DATE/TIME*/
	DatePassingFromButton(
		BtnTomrrow,
		"dateBothTo",
		getdate(1)
	); /* Tomorrow  This button function DATE/TIME*/
	DatePassingFromButton(
		BtnYesterday,
		"dateBothTo",
		getdate(-1)
	); /* Yeasterday  This button function DATE/TIME*/

	DatePassingFromButton(
		BtnToday,
		"date",
		getdate(0)
	); /* Today  This button function DATE */
	DatePassingFromButton(
		BtnTomrrow,
		"date",
		getdate(1)
	); /* Tomorrow  This button function DATE */
	DatePassingFromButton(
		BtnYesterday,
		"date",
		getdate(-1)
	); /* Yeasterday  This button function DATE */

	DataPassingFromList(
		AllLocationList,
		".table-location-items"
	); /* Data  This button function DATE */
	DataPassingFromList(
		AllPartyList,
		".party-popup"
	); /* Data  This button function DATE */
	DataPassingFromList(
		AllPersonList,
		".person-popup"
	); /* Data  This button function DATE */

	/* 
    This Dynamic Date Put from Buttons
    #Today
    #Tomorrow
    #Yeasterday
*/
	function DatePassingFromButton(ButtonSelector, PutSelectorId, callback) {
		for (let index = 0; index < ButtonSelector.length; index++) {
			ButtonSelector[index].addEventListener("click", function (e) {
				document
					.querySelectorAll(".calender-popup .fields-list ul li a")
					.forEach((element) => {
						element.classList.remove("active");
					});
				this.classList.add("active");

				var FieldValue = callback || new Date(); 
				document.getElementById(PutSelectorId).value = callback;
				DataChanging(this, ".calender-popup", FieldValue);
			//e.preventDefault();
			});
		}
	}
	/* Data pasing fromList*/
	function DataPassingFromList(Selector, PopupSelector) {
		Selector.forEach((element) => {
			element.addEventListener("click", function () {
				Selector.forEach((elements) => {
					elements.classList.remove("active");
				});
				// console.log(element);
				this.classList.add("active");
				var ListValue = this.textContent;
				DataChanging(this, PopupSelector, ListValue);
			});
		});
	}

	// Popup Position
	function getPosition(e, el, btn) {
		var el = document.querySelector(el);
		var tableWidth = document.querySelector(".shipmentList");
		const target = document.querySelector("body");
		var wWidth = tableWidth.offsetWidth;
		var eLHeight = btn.offsetHeight;
		var eLWidth = btn.offsetWidth;
		var xSize = e.clientX;
		var ySize = e.clientY;
		const targetRect = target.getBoundingClientRect();
		const anchorRect = btn.getBoundingClientRect();
		const popoverRect = btn.getBoundingClientRect();
		const top = anchorRect.top - targetRect.top + popoverRect.height;
		var RightPosition = screen.width - xSize;

		if (wWidth / 2 < xSize) {
			el.style.right = RightPosition - eLWidth + "px";
			el.style.left = "auto";
		} else {
			el.style.left = xSize - 7 + "px";
			el.style.right = "auto";
		}

		el.style.top = top + "px";
		el.classList.add("active");
	}

	// Get Dynamic Date function
	function getdate(number) {
		var currentDate = new Date();
		var day = currentDate.getDate() + number;
		var month = currentDate.getMonth() + 1;
		var year = currentDate.getFullYear();

		if (month < 9) {
			var month = "0" + month;
		} else {
			var month = month;
		}
		if (day < 9) {
			var day = "0" + day;
		} else {
			var day = day;
		}
		return (today = "" + year + "-" + month + "-" + day + "");
	}

	/* Data Changing */
	function DataChanging(selector, parent, FieldValue) {
		var gatTableValueAttr = selector
			.closest(parent)
			.getAttribute("table-value");
		var attSelector = document.querySelector(
			'[table-id="' + gatTableValueAttr + '"]'
		);
		// console.log(FieldValue);
		// console.log(parent);
		// console.log(attSelector);
		if (
			attSelector.getAttribute("table-data-type") == "from" &&
			selector.type == "date"
		) {
			var TextAddField = attSelector.querySelector(".from p:first-child");
			TextAddField.innerText = FieldValue;
		} else if (
			attSelector.getAttribute("table-data-type") == "from" &&
			selector.nodeName == "A"
		) {
			var TextAddField = attSelector.querySelector(".from p:first-child");
			TextAddField.innerText = FieldValue;
		} else if (
			attSelector.getAttribute("table-data-type") == "from" &&
			selector.type == "time"
		) {
			var TextAddField = attSelector.querySelector(".from p b");
			if (Math.floor(FieldValue.replace(/\:/g, ".")) < 12) {
				FieldValue = FieldValue + " AM";
			} else {
				FieldValue = FieldValue + " PM";
			}
			TextAddField.innerText = FieldValue;
		} else if (
			attSelector.getAttribute("table-data-type") == "to" &&
			selector.type == "date"
		) {
			var TextAddField = attSelector.querySelector(".to p");
			console.log(TextAddField);
			TextAddField.innerText = FieldValue;
		} else if (
			attSelector.getAttribute("table-data-type") == "to" &&
			selector.nodeName == "A"
		) {
			var TextAddField = attSelector.querySelector(".to p");
			TextAddField.innerText = FieldValue;
		} else if (
			attSelector.getAttribute("table-data-type") == "to" &&
			selector.type == "time"
		) {
			var TextAddField = attSelector.querySelector(".to p b");
			if (Math.floor(FieldValue.replace(/\:/g, ".")) < 12) {
				FieldValue = FieldValue + " AM";
			} else {
				FieldValue = FieldValue + " PM";
			}
			TextAddField.innerText = FieldValue;
		} else if (
			attSelector.getAttribute("table-data-type") == "from" &&
			selector.nodeName == "SPAN"
		) {
			var TextAddField = attSelector.querySelector(".from p:first-child");
			TextAddField.innerText = FieldValue;
			if (attSelector.querySelector(".btn-assign")) {
				attSelector.querySelector(".btn-assign").remove();
				attSelector.querySelector(
					".from"
				).innerHTML += `<div class="celendar-box">																														 
            <span class="tbl-item-btn party-edit-btn"><i class="fas fa-pencil-alt"></i></span>																
       </div>`;
			}
		}

		attSelector.classList.add("changing");
	}

	/* Class Remove after Data changing */
	function ClaseRemoveDataChanging(selector, parent) {
		var gatTableValueAttr = selector
			.closest(parent)
			.getAttribute("table-value");
		var attSelector = document.querySelector(
			'[table-id="' + gatTableValueAttr + '"]'
		);
		attSelector.classList.remove("changing");
	}

	/* Data Passing Funtion */
	function DataPassingInPopup(PassSelector, GetSelector, CheckSelector) {
		// console.log(PassSelector);
		var id = PassSelector.closest("td");
		var GetIdAttr = id.getAttribute("table-id");
		document.querySelector(GetSelector).setAttribute("table-value", GetIdAttr);
		// console.log(CheckSelector);
		if (CheckSelector == "date-time-box from") {
			id.setAttribute("table-data-type", "from");
		} else if (CheckSelector == "date-time-box to active") {
			id.setAttribute("table-data-type", "to");
		}
	}
}




