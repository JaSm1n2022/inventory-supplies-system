window.addEventListener("load", function () {
	// setTimeout(function () {

	// ID Selector function
	// function elemId(val) {
	//     return document.getElementById(val);
	// }

	// All Selector Function
	var $ = function (selector) {
		if (!(this instanceof $)) {
			return new $(selector);
		}
		this.el = document.querySelectorAll(selector);
		return this;
	};

	$.prototype.css = function (prop, val) {
		this.el.forEach(function (element) {
			element.style[prop] = val;
		});

		return this;
	};

	$.prototype.click = function (callback) {
		this.el.forEach(function (element) {
			element.addEventListener("click", callback, false);
		});
	};

	// class check function
	function hasClass(element, className) {
		return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
	}

	// Highlight table row on click
	let tableRow = document.querySelectorAll(".table tr");
	tableRow.forEach((row) => {
		row.addEventListener("click", function () {
			tableRow.forEach((item) => {
				if (item !== row) {
					item.classList.remove("active");
				}
			});
			this.classList.toggle("active");
		});
	});

	// Toggle button select
	function toggleBtnSelect(sel) {
		let osdbtn = document.querySelectorAll(sel);
		osdbtn.forEach((el) => {
			el.addEventListener("click", function () {
				osdbtn.forEach((item) => {
					if (item !== el) {
						item.setAttribute("data-label", "");
					}
				});
				// alert(this.innerHTML)
				this.setAttribute("data-label", "selected");
			});
		});
	}

	toggleBtnSelect(".osd-report button");
	toggleBtnSelect(".show-hide button");

	function CustomDropdown(label, listItems, atr) {
		// Close the dropdown if the user clicks outside of it
		var doorBtn = document.querySelectorAll(label);
		var dropdowns = document.querySelectorAll(listItems);
		var doorValue = document.querySelectorAll(listItems + " li");

		for (let dIndex = 0; dIndex < doorBtn.length; dIndex++) {
			doorBtn[dIndex].addEventListener("click", function () {
				for (let drIndex = 0; drIndex < dropdowns.length; drIndex++) {
					dropdowns[drIndex].style.display = "none";
				}
				var el = this.nextElementSibling;

				if (hasClass(el, "block")) {
					this.nextElementSibling.style.display = "none";
					this.nextElementSibling.classList.remove("block");
				} else {
					this.nextElementSibling.style.display = "block";
					this.nextElementSibling.classList.add("block");
				}
			});
		}

		for (let dvavnumber = 0; dvavnumber < doorValue.length; dvavnumber++) {
			doorValue[dvavnumber].addEventListener("click", function () {
				for (let drIndex = 0; drIndex < dropdowns.length; drIndex++) {
					dropdowns[drIndex].style.display = "none";
					dropdowns[drIndex].classList.remove("block");
				}
				var getDoorValue = this.getAttribute(atr);
				var tt = (this.parentElement.previousSibling.previousSibling.textContent = getDoorValue);
			});
		}

		function hasClass(element, cls) {
			return (" " + element.className + " ").indexOf(" " + cls + " ") > -1;
		}
	}

	if (window.innerWidth > 768) {
	}
	CustomDropdown(".desk-door", ".door-list", "data-door");
	CustomDropdown(".priority-label", ".priority-list", "data-priority");

	// Right Panel Settings
	var btns = document.querySelectorAll(".nav-panel");
	var panels = document.querySelectorAll(".right-panel");
	var closeBtn = document.querySelectorAll(".close-btn");
	var tarPanel = document.querySelectorAll(".transparent-panel");

	for (let index = 0; index < btns.length; index++) {
		btns[index].addEventListener("click", function () {
			var attr = this.getAttribute("idatr");
			for (let pIndex = 0; pIndex < panels.length; pIndex++) {
				panels[pIndex].classList.remove("show");
				btns[pIndex].classList.remove("active");
			}
			this.classList.add("active");
			elemId(attr).classList.add("show");
			tarPanel[0].classList.add("show");
		});
	}

	for (let index = 0; index < closeBtn.length; index++) {
		closeBtn[index].addEventListener("click", function () {
			for (let pIndex = 0; pIndex < panels.length; pIndex++) {
				panels[pIndex].classList.remove("show");
				tarPanel[0].classList.remove("show");
				btns[pIndex].classList.remove("active");
			}
		});
	}

	// Inbox tab
	var inboxTabBtn = document.querySelectorAll(".nav-pills li a");
	var inboxtab = document.querySelectorAll(".tab-pane");

	for (
		let inboxInderWrap = 0;
		inboxInderWrap < inboxTabBtn.length;
		inboxInderWrap++
	) {
		inboxTabBtn[inboxInderWrap].addEventListener("click", function () {
			var tabAttr = this.getAttribute("data-toggle");
			for (
				let inboxIndexInner = 0;
				inboxIndexInner < inboxtab.length;
				inboxIndexInner++
			) {
				inboxtab[inboxIndexInner].classList.remove("active", "show");
				inboxTabBtn[inboxIndexInner].classList.remove("active");
			}
			this.classList.add("active");
			elemId(tabAttr).classList.add("active", "show");
		});
	}

	// drop-down

	var dropMenuBtn = document.querySelectorAll(".dropdownMenuButton");
	// var dropdownMenu = document.querySelectorAll('.dropdown-menu')

	const navLinks = document.querySelectorAll(".nav-link");
	navLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			navLinks.forEach((oLink) => {
				if (oLink !== link && oLink.nextElementSibling !== null) {
					oLink.nextElementSibling.classList.remove("show");
				}
			});
			if (this.nextElementSibling !== null)
				this.nextElementSibling.classList.toggle("show");
		});
	});

	// setTimeout(function () {
	$(".dropdownMenuButton").click(function (e) {
		// console.log("clicked");
		if (
			this.classList.contains("active") == true ||
			this.nextElementSibling.style.display == "block"
		) {
			this.classList.remove("active");
			this.nextElementSibling.style.display = "none";
		} else if (this.nextElementSibling.style.display == "") {
			this.nextElementSibling.style.display = "block";
			this.classList.add("active");
		} else {
			this.nextElementSibling.style.display = "block";
			this.classList.add("active");
		}
		// console.log(this.nextElementSibling.style.display);
		// e.stopPropagation();
		e.preventDefault();
	});

	// },5000)

	//     for (let index = 0; index < dropMenuBtn.length; index++) {
	//         dropMenuBtn[index].addEventListener('click', function () {

	//         })

	//     }
	//  console.log('clicked');

	// Check/Uncheck checkboxes
	if (document.querySelectorAll("#checkAll").length > 0) {
		const checkAllBtn = document.getElementById("checkAll");
		const checkBoxes = document.querySelectorAll(
			'.dnd-moved input[type="checkbox"'
		);

		checkAllBtn.addEventListener("click", function () {
			checkBoxes.forEach((cb) => {
				cb.toggleAttribute("checked");
			});
			this.nextElementSibling.classList.toggle("show");
			// console.log("testing");
		});

		const unmarkReadBtns = document.querySelectorAll(".unmarkread");
		unmarkReadBtns.forEach((btn) => {
			btn.addEventListener("click", function () {
				this.classList.toggle("markread");
			});
		});
	}

	// Autocomplate Search
	function autoComp(sel) {
		if (document.querySelectorAll(sel).length > 0) {
			new autoComplete({
				selector: sel,
				minChars: 0,
				source: function (term, suggest) {
					term = term.toLowerCase();
					var choices = [
						["Shipment", "boxes"],
						["Location", "map-marker-alt"],
						["Company", "building"],
						["Person", "address-card"],
						["Carrier", "truck-moving"],
						["Document", "list-alt"],
						["Equipment", "list-alt"],
					];
					var suggestions = [];
					for (i = 0; i < choices.length; i++)
						if (
							~(choices[i][0] + " " + choices[i][1]).toLowerCase().indexOf(term)
						)
							suggestions.push(choices[i]);
					suggest(suggestions);
				},
				renderItem: function (item, search) {
					search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&amp;");
					var re = new RegExp("(" + search.split(" ").join("|") + ")", "gi");
					return (
						'<div class="autocomplete-suggestion" data-langname="' +
						item[0] +
						'" data-lang="' +
						item[1] +
						'" data-val="' +
						search +
						'"><img src="images/icons/' +
						item[1] +
						'.svg"> ' +
						item[0].replace(re, "<b>$1</b>") +
						"</div>"
					);
				},
				onSelect: function (e, term, item) {
					console.log(
						'Item "' +
							item.getAttribute("data-langname") +
							" (" +
							item.getAttribute("data-lang") +
							')" selected by ' +
							(e.type == "keydown" ? "pressing enter" : "mouse click") +
							"."
					);
					document.querySelector(sel).value =
						item.getAttribute("data-langname") +
						" (" +
						item.getAttribute("data-lang") +
						")";
				},
			});
		}
	}
	autoComp("#search");
	autoComp("#search-mbl");

	/**
	 * getHeight - for elements with display:none
	 */
	if (document.querySelectorAll("#navbtn").length > 0) {
		var getHeight = function (el) {
				var el_style = window.getComputedStyle(el),
					el_display = el_style.display,
					el_position = el_style.position,
					el_visibility = el_style.visibility,
					el_max_height = el_style.maxHeight.replace("px", "").replace("%", ""),
					wanted_height = 0;

				// if its not hidden we just return normal height
				if (el_display !== "none" && el_max_height !== "0") {
					return el.offsetHeight;
				}

				// the element is hidden so:
				// making the el block so we can meassure its height but still be hidden
				el.style.position = "absolute";
				el.style.visibility = "hidden";
				el.style.display = "block";

				wanted_height = el.offsetHeight;

				// reverting to the original values
				el.style.display = el_display;
				el.style.position = el_position;
				el.style.visibility = el_visibility;

				return wanted_height;
			},
			/**
			 * toggleSlide mimics the jQuery version of slideDown and slideUp
			 * all in one function comparing the max-heigth to 0
			 */
			toggleSlide = function (el) {
				var el_max_height = 0;

				if (el.getAttribute("data-max-height")) {
					// we've already used this before, so everything is setup
					if (el.style.maxHeight.replace("px", "").replace("%", "") === "0") {
						el.style.maxHeight = el.getAttribute("data-max-height");
					} else {
						el.style.maxHeight = "0";
					}
				} else {
					el_max_height = getHeight(el) + "px";
					el.style["transition"] = "max-height 0.5s ease-in-out";
					el.style.overflowY = "hidden";
					el.style.maxHeight = "0";
					el.setAttribute("data-max-height", el_max_height);
					el.style.display = "block";

					// we use setTimeout to modify maxHeight later than display (to we have the transition effect)
					setTimeout(function () {
						el.style.maxHeight = el_max_height;
						el.style.maxHeight = el_max_height;
					}, 10);
				}
			};

		document.querySelector("#navbtn").addEventListener(
			"click",
			function (e) {
				toggleSlide(document.querySelector("#navbarSupportedContent"));
			},
			false
		);

		if (
			document.querySelectorAll("#cwMap").length > 0 &&
			document.querySelectorAll(".m-map-toggler").length > 0
		) {
			/*
			document.querySelector(".m-map-toggler").addEventListener(
				"click",
				function (e) {
					toggleSlide(document.querySelector(".map-wrap-inner"));
					this.classList.toggle("active");
				},
				false
			);
			*/
		}

		if (
			document.querySelectorAll("#filterBtn").length > 0 &&
			document.querySelectorAll("#filterBtn").length > 0
		) {
			document.querySelector("#filterBtn").addEventListener(
				"click",
				function (e) {
					toggleSlide(document.querySelector(".search-filtter"));
					this.classList.toggle("active");
				},
				false
			);
		}
		/*
		if (
			document.querySelectorAll("#mapToggle").length > 0 &&
			document.querySelectorAll(".m-map-toggler").length > 0
		) {
			document.querySelector("#mapToggle").addEventListener(
				"click",
				function (e) {
					this.classList.toggle("active");
					if (this.innerHTML === '<i class="fas fa-map-marker-alt"></i> Hide') {
						this.innerHTML = '<i class="fas fa-map-marker-alt"></i> Show';
					} else {
						this.innerHTML = '<i class="fas fa-map-marker-alt"></i> Hide';
					}
					document
						.querySelector(".table-content-col")
						.classList.toggle("col-md-12");
					document.querySelector(".map-col").classList.toggle("d-none");
				},
				false
			);
		}
		*/

		var profileTab = document.querySelector("#profiletab");
		if (profileTab !== null && window.innerWidth < 992) {
			profileTab.addEventListener(
				"click",
				function (e) {
					toggleSlide(document.querySelector(".profile-dropdown"));
				},
				false
			);
		}
	}

	// Multicheck Dropdown
	if (
		document.querySelectorAll(".mutiCheckDrop").length > 0 &&
		document.querySelectorAll(".mutiCheckDrop").length > 0
	) {
		document.querySelector(".mutiCheckDrop").addEventListener(
			"click",
			function (e) {
				toggleSlide(document.querySelector(".mutiCheckDropArea"));
				this.classList.toggle("active");
			},
			false
		);
	}

	// Apply/Clear controls
	if (document.querySelectorAll(".shipmentList").length > 0) {
		var countChecked = function () {
			var n = document.querySelectorAll(".shipmentList input:checked").length;
			var controls = document.querySelector("#shipment-actions");
			if (n >= 1) {
				controls.classList.add("show");
			} else {
				controls.classList.remove("show");
			}
		};
		countChecked();

		var checkboxes = document.querySelectorAll(
			".shipmentList input[type=checkbox]"
		);
		// console.log(checkboxes);
		checkboxes.forEach((elem) => {
			elem.addEventListener("click", countChecked);
		});
	}

	// Accordion
	var acc = document.querySelectorAll(".acc-toggler");
	var i;
	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function () {
			this.classList.toggle("active");
			var panel = this.nextElementSibling;
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
		});
	}

	let trackBtns = document.querySelectorAll(".track-item");
	let msgbox = document.querySelector("#popupPanel");
	let msgboxclose = document.querySelector(".msgbox-panel .close-btn");
	var msgtarPanel = document.querySelector(".transparent-panel");
	for (let m = 0; m < trackBtns.length; m++) {
		trackBtns[m].addEventListener("click", function (e) {
			e.preventDefault();
			msgbox.classList.toggle("show");
			tarPanel[0].classList.add("show");
		});
	}
	if (msgboxclose != null) {
		msgboxclose.addEventListener("click", function () {
			msgbox.classList.remove("show");
		});
	}

	if (msgtarPanel !== null) {
		msgtarPanel.addEventListener("click", function () {
			msgbox.classList.remove("show");
		});
	}

	// Location Box
//	let pickupControl = document.getElementById("pickupControl");
//	let pickupSelectBox = document.getElementById("pickupSelectBox");
	let pickupSave = document.querySelector(
		"#pickupSelectBox button.btn.btn-success"
	);
	let pickupCancel = document.querySelector(
		"#pickupSelectBox button.btn.btn-danger"
	);
	/*
	if (pickupControl !== null) {
		pickupControl.addEventListener("click", function () {
			// console.log('clicked');
			pickupSelectBox.classList.toggle("show");
			this.classList.toggle("active");
		});
		pickupSave.addEventListener("click", function () {
			var prarents = this.closest("#pickupSelectBox");
			// console.log(prarents);
			pickupSelectBox.classList.toggle("show");
			this.classList.toggle("active");
		});
		pickupCancel.addEventListener("click", function () {
			var prarents = this.closest("#pickupSelectBox");
			// console.log(prarents);
			pickupSelectBox.classList.toggle("show");
			this.classList.toggle("active");
		});
	}
	*/

	/**
	 *
	 * Show column on select - Task 04
	 *
	 */
	/*
	var cbtns = document.querySelectorAll(".colunm-btn");
	for (let index = 0; index < cbtns.length; index++) {
		cbtns[index].addEventListener("click", function () {
			var attr = this.getAttribute("data-check");
			var id = document.querySelectorAll(attr);
			if (this.checked) {
				for (let pIndex = 0; pIndex < id.length; pIndex++) {
					id[pIndex].style.display = "table-cell";
				}
			} else {
				for (let pIndex = 0; pIndex < id.length; pIndex++) {
					id[pIndex].style.display = "none";
				}
			}
		});
	}

	var viewbtn = document.getElementById("view_switch");
	var columnBTN = document.querySelectorAll(".colunm-btn");
	var SelDataCheck = document.querySelectorAll(".selbox");
	var TableOptions = document.querySelectorAll(".popup");
	var allTableData = document.querySelectorAll(".dnd-moved td");
	var allTableHead = document.querySelectorAll(".dnd-moved th");
	var deliveryLabel = document.querySelector(".delivery-view-label");
	var pickupLabel = document.querySelector(".pickup-view-label");

	if (viewbtn !== null) {
		// console.log('check view');
		viewbtn.addEventListener("click", function () {
			Viewpanel(this);
			if (viewbtn.checked) {
				deliveryLabel.classList.add("active");
				pickupLabel.classList.remove("active");
			} else {
				pickupLabel.classList.add("active");
				deliveryLabel.classList.remove("active");
			}
		});
	}

	var pickupView = document.getElementById("pickupView");
	var deliveryView = document.getElementById("deliveryView");

	if (pickupView !== null) {
		window.addEventListener("load", function () {
			// console.log('view load');
		});
		Viewpanel(this);

		pickupView.addEventListener("click", function () {
			viewbtn.checked = false;
			this.classList.add("active");
			deliveryView.classList.remove("active");
			Viewpanel(viewbtn);
		});
	}
	if (deliveryView !== null) {
		deliveryView.addEventListener("click", function () {
			viewbtn.checked = true;
			this.classList.add("active");
			pickupView.classList.remove("active");
			Viewpanel(viewbtn);
		});
	}
	

	function Viewpanel(data) {
		// console.log(data);
		var tableHeadTd = document.querySelectorAll(".rowt");
		for (i = 0; i < columnBTN.length; i++) {
			columnBTN[i].checked = false;
			tableHeadTd[i].style.display = "none";
		}
		for (i = 0; i < allTableData.length; i++) {
			allTableData[i].style.display = "none";
		}

		// console.log(data.checked);
		if (data.checked) {
			// Default Total value => 53
			// Default value => 12
			for (let pIndex = 0; pIndex < 53; pIndex++) {
				tableHeadTd[pIndex].style.display = "table-cell";
				columnBTN[pIndex].checked = true;

				var attr = columnBTN[pIndex].getAttribute("data-check");
				var id = document.querySelectorAll(attr);

				for (var pInnerIndex = 0; pInnerIndex < id.length - 1; pInnerIndex++) {
					id[pInnerIndex + 1].style.display = "table-cell";
					SelDataCheck[pInnerIndex].style.display = "table-cell";
					TableOptions[pInnerIndex].style.display = "table-cell";
				}
			}
		} else {
			// Default value => 10
			// console.log('testing');
			for (let pIndex = 0; pIndex < 15; pIndex++) {
				tableHeadTd[pIndex].style.display = "table-cell";
				columnBTN[pIndex].checked = true;

				var attr = columnBTN[pIndex].getAttribute("data-check");
				var id = document.querySelectorAll(attr);
				for (var pInnerIndex = 0; pInnerIndex < id.length - 1; pInnerIndex++) {
					id[pInnerIndex + 1].style.display = "table-cell";
					SelDataCheck[pInnerIndex].style.display = "table-cell";
					TableOptions[pInnerIndex].style.display = "table-cell";
				}
			}
		}
	}
*/
	// Profile tab - Editable input field
	function editableFieldFunc(input, save, close) {
		const editInput = document.querySelectorAll(input);
		const editbtn = document.querySelectorAll(".editable-field-btns");
		const saveData = document.querySelectorAll(save);
		const closeField = document.querySelectorAll(close);

		// Input Field Click funtion
		for (let index = 0; index < editInput.length; index++) {
			editInput[index].addEventListener("click", function () {
				for (let index = 0; index < editbtn.length; index++) {
					editbtn[index].classList.remove("show");
				}
				this.nextElementSibling.classList.add("show");
			});
		}

		// Save Field Click funtion
		for (let index = 0; index < saveData.length; index++) {
			saveData[index].addEventListener("click", function () {
				this.parentElement.classList.remove("show");
			});
		}

		// Close Field Click funtion
		for (let index = 0; index < closeField.length; index++) {
			closeField[index].addEventListener("click", function () {
				this.parentElement.classList.remove("show");
			});
		}
	}

	const editableField = document.querySelector(".editable-field");
	if (editableField !== null) {
		editableFieldFunc(".editable-field input", ".saveData", ".closeField");
	}

	// Modal

	const actionBtns = document.querySelectorAll(".dropdown-item");
	const popUpModal = document.getElementById("exampleModal");
	const closePopup = document.querySelector(".close");
	const bodyElement = document.querySelector("body");
	for (btn of actionBtns) {
		const btnAttr = btn.getAttribute("data-target");
		if (btnAttr !== null && btnAttr === "#exampleModal") {
			btn.addEventListener("click", function () {
				popUpModal.style.display = "block";
				this.parentElement.style.display = "none";
				tarPanel[0].classList.add("show");
				bodyElement.classList.add("popup-activated");
			});
		}
	}

	function closeFunc(btn, container) {
		if (btn !== null) {
			btn.addEventListener("click", function () {
				container.style.display = "none";
				tarPanel[0].classList.remove("show");
				bodyElement.classList.remove("popup-activated");
			});
		}
	}
	closePopup ? closeFunc(closePopup, popUpModal) : null;
	popUpModal ? closeFunc(popUpModal, popUpModal) : null;

	const cardEditBtns = document.querySelectorAll(".btn-edit");
	const accModal = document.getElementById("accountModal");
	for (let btn of cardEditBtns) {
		btn.addEventListener("click", function () {
			accModal.style.display = "block";
			tarPanel[0].classList.add("show");
		});
	}
	closeFunc(closePopup, accModal);

	// JS - Custom Accordions
	const accordionItems = document.querySelectorAll(".sub-hierarchy");
	const accoerdingBtn = document.querySelectorAll(".accordion-item");

	if (accordionItems !== null) {
		for (let index = 0; index < accoerdingBtn.length; index++) {
			accoerdingBtn[index].addEventListener("click", () => {
				accoerdingBtn[index].nextElementSibling.height = 0;
				if (accoerdingBtn[index].nextElementSibling) {
					accoerdingBtn[index].classList.toggle("active");
					accoerdingBtn[index].nextElementSibling.classList.toggle("active");
				}
			});
		}
	}

	const spToggler = document.querySelector(".search-panel-toggler");
	const sp = document.querySelector(".search-panel-wrap");

	if (spToggler !== null && sp !== null) {
		spToggler.addEventListener("click", function () {
			sp.classList.toggle("show");
			this.children[0].classList.toggle("fa-caret-left");
		});
	}

	const hozardous_cargo = document.querySelector("#hozardous_cargo");
	// console.log(hozardous_cargo.checked);

	if (hozardous_cargo !== null) {
		const hozardous_cargo_field = document.querySelector(
			"#hozardous_cargo_field"
		);
		hozardous_cargo.addEventListener("click", function () {
			if (hozardous_cargo.checked) {
				hozardous_cargo_field.style.display = "block";
			} else {
				hozardous_cargo_field.style.display = "none";
			}
		});
	}

	// Save / Update address book - Search panel
	const cargoItems = document.querySelectorAll(".cargo-item");
	if (cargoItems !== null) {
		var addCargoBtn = document.querySelector(".add-cargo");
		var submitBtn = document.querySelectorAll(".submit-cargo");
		for (let index = 0; index < submitBtn.length; index++) {
			submitBtn[index].addEventListener("click", function () {
				if (hasClass(this.closest(".cargo-item"), "active")) {
					this.closest(".cargo-item").classList.remove("active");
				} else {
					this.closest(".cargo-item").classList.add("active");
				}
			});
		}
	}

	var input = document.querySelector("#country_code");
	if (input !== null) {
		window.intlTelInput(input, {
			placeholderNumberType: "MOBILE",
			separateDialCode: true,
			utilsScript: "js/intlTelInput.js",
		});
	}

	// Here In Slide Up and down function.
	if (document.querySelectorAll(".collapse-search").length > 0) {
		var elem = document.querySelector(".collapse-search");
		var elemHeight = elem.offsetHeight;
		elem.style.display = "none";
		elem.style.height = 0;
		elem.style.overflowY = "scroll";
	}

	function slideUp(el) {
		var elem = document.querySelector(el);
		elem.style.transition = "all .5s ease-in-out";
		elem.style.height = "0px";
		setTimeout(function () {
			elem.style.display = "none";
		}, 510);
	}

	function slideDown(el) {
		var elem = document.querySelector(el);
		elem.style.display = "block";
		elem.style.transition = "all .5s ease-in-out";
		setTimeout(function () {
			elem.style.height = elemHeight + "px";
		}, 5);
	}

	var TitleFiled = document.querySelector(".TitleFiled");

	// Categore Search
	function listSearch(id1, id2, id3) {
		var clearSearchField = document.querySelector(id3);
		var input, filter, ul, li, a, i, txtValue;
		input = document.getElementById(id1);
		input.addEventListener("keyup", CategorySearch, false);
		function CategorySearch() {
			filter = input.value.toUpperCase();
			ul = document.getElementById(id2);
			// console.log(ul);
			li = ul.getElementsByTagName("li");
			for (i = 0; i < li.length; i++) {
				span = li[i].getElementsByTagName("span")[0];
				txtValue = span.textContent || span.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					li[i].style.display = "";
				} else {
					li[i].style.display = "none";
				}
			}

			clearSearchField.addEventListener("click", function () {
				input.value = "";
				for (let index = 0; index < li.length; index++) {
					li[index].style.display = "";
				}
			});
		}
	}
	
	if (document.querySelectorAll(".clearSearchList").length > 0) {
		listSearch("searchForField", "CategoeySearchBox", ".clearSearchField");
		listSearch("seachSaveInput", "saveSearchLists", ".clearSearchList");
		listSearch(
			"locationSearchForField",
			"LocationSearchBox",
			".clearLocationSearchField"
		);
		listSearch(
			"PartySearchForField",
			"ParthSearchBox",
			".clearPartySearchField"
		);
		listSearch(
			"PersonSearchForField",
			"PersonSearchBox",
			".clearPersonSearchField"
		);
	}

	// Serach Filter Toggle Button
	/*
	if (document.querySelectorAll(".Search-filter-btn").length > 0) {
		var SerachToggleBtn = document.querySelector(".Search-filter-btn");
		SerachToggleBtn.addEventListener("click", function () {
			slideToggle(document.getElementById("RegularSerachFilter"), 200);
			this.classList.toggle("active");
			if (hasClass(this, "active")) {
				this.firstChild.innerText = "Expand Filters ";
			} else {
				this.firstChild.innerText = "Hide Filters ";
			}
		});
	}
	*/

	let slideUps = (target, duration = 500) => {
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + "ms";
		target.style.boxSizing = "border-box";
		target.style.height = target.offsetHeight + "px";
		target.offsetHeight;
		target.style.overflow = "hidden";
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.style.display = "none";
			target.style.removeProperty("height");
			target.style.removeProperty("padding-top");
			target.style.removeProperty("padding-bottom");
			target.style.removeProperty("margin-top");
			target.style.removeProperty("margin-bottom");
			target.style.removeProperty("overflow");
			target.style.removeProperty("transition-duration");
			target.style.removeProperty("transition-property");
			//alert("!");
		}, duration);
	};

	let slideDowns = (target, duration = 500) => {
		target.style.removeProperty("display");
		let display = window.getComputedStyle(target).display;

		if (display === "none") display = "block";

		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = "hidden";
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.boxSizing = "border-box";
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + "ms";
		target.style.height = height + "px";
		target.style.removeProperty("padding-top");
		target.style.removeProperty("padding-bottom");
		target.style.removeProperty("margin-top");
		target.style.removeProperty("margin-bottom");
		window.setTimeout(() => {
			target.style.removeProperty("height");
			target.style.removeProperty("overflow");
			target.style.removeProperty("transition-duration");
			target.style.removeProperty("transition-property");
		}, duration);
	};
	var slideToggle = (target, duration = 500) => {
		if (window.getComputedStyle(target).display === "none") {
			return slideDowns(target, duration);
		} else {
			return slideUps(target, duration);
		}
	};

	/* 
    Date Picker
    */
	if (document.querySelectorAll("#datepicker").length > 0) {
		var picker = new Lightpick({
			field: document.getElementById("datepicker"),
			singleDate: false,
			onSelect: function (start, end) {
				var str = "";
				str += start ? start.format("Do MMMM YYYY") + " to " : "";
				str += end ? end.format("Do MMMM YYYY") : "...";
				document.getElementById("datepicker").innerHTML = str;
				document.querySelector(".anchor4").innerHTML = str;
			},
		});
	}

	if (document.querySelectorAll("#dateBoth").length > 0) {
		var picker = new Lightpick({
			field: document.getElementById("dateBoth"),
			singleDate: true,
			onSelect: function (start, end) {
				var str = "";
				str += start ? start.format("Do MMMM YYYY") + " to " : "";
				str += end ? end.format("Do MMMM YYYY") : "...";
				str = start || new Date().format("Do MMMM YYYY");
				document.getElementById("dateBoth").setAttribute("value", str);
			},
		});
	}
	if (document.querySelectorAll("#dateBothTo").length > 0) {
		var picker = new Lightpick({
			field: document.getElementById("dateBothTo"),
			singleDate: true,
			onSelect: function (start, end) {
				var str = "";
				str += start ? start.format("Do MMMM YYYY") + " to " : "";
				str += end ? end.format("Do MMMM YYYY") : "...";
				str = start || new Date().format("Do MMMM YYYY");
				document.getElementById("dateBothTo").setAttribute("value", str);
			},
		});
	}

	/* 
    Horizental Scroll 
    */
	// document.querySelectorAll(".table-responsive").forEach(n => {
	//     n.addEventListener("mousewheel", e => {
	//     e.preventDefault();
	//     n.scrollBy(-e.wheelDeltaY, 0);
	//     });
	// });

	// console.log('load');

	// }, 5000)

	const tableHeadingAll = document.querySelectorAll("#arrive-table th");
	const tableRows = document.querySelectorAll("#arrive-table tr");


	tableHeadingAll.forEach((element, index) => {
		element.addEventListener("click", function () {
			let self = this;
			this.classList.toggle("active");
			setTimeout(function () {
				tableRows.forEach((element) => {
					let tdIndex = index+1;
					let tds = element.querySelectorAll("td:nth-of-type("+tdIndex+") .calender-area .date-time-box.to");
					tds.forEach(element => {
						if (hasClass(self, 'active')) {
							console.log('yes');
							element.classList.add("active");
						}else{
							element.classList.remove("active");
							console.log('no');
						}
					});					
				});
			},10)
		});
	});
});
