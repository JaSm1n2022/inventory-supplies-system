/*
 * Custom Multi Select With check box;
 *
 */

// class check function
function hasClass(element, className) {
	return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
}
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

/*
 * Custom Multi Select With check box;
 *
 */

function CustomMultiSelect(listId, checkboxInput, anchorClass) {
	if (document.querySelectorAll(anchorClass).length > 0) {
		// Selectorss
		const locationLists = document.getElementById(listId);
		var checkList = document.getElementById(listId);
		var locationItems = document.querySelectorAll(checkboxInput);
		var anchor = document.querySelector(anchorClass);
		// console.log(anchor);
		var arr = [];
		var mainArr = [];
		var anchorTxt = anchor.textContent;
		// Hide lcoation outside click;
		if (checkList !== null) {
			document.addEventListener("click", function (event) {
				// If user clicks inside the element, do nothing
				if (event.target.closest("#" + listId)) return;
				// If user clicks outside the element, hide it!
				checkList.classList.remove("visible");
			});
		}

		// Dropdown Hide & show
		if (checkList !== null) {
			// console.log(anchor);
			anchor.addEventListener("click", function () {
				if (checkList.classList.contains("visible"))
					checkList.classList.remove("visible");
				else checkList.classList.add("visible");
			});
		}

		// Checkbox select
		if (locationItems !== null) {
			for (let index = 0; index < locationItems.length; index++) {
				mainArr.push(locationItems[index].textContent);
				locationItems[index].addEventListener("click", function () {
					if (hasClass(this, "active")) {
						this.checked = false;
						const index = arr.indexOf(this.parentElement.textContent);
						if (index > -1) {
							arr.splice(index, 1);
						}
					} else {
						arr.push(this.parentElement.textContent);
						this.checked = true;
					}
					this.classList.toggle("active");
					anchor.innerHTML = arr;
					if (arr === undefined || arr.length == 0) {
						anchor.innerHTML = anchorTxt;
					}
				});
			}
		}
		if (hasClass(checkList, "list")) {
			for (let index = 0; index < locationItems.length; index++) {
				locationItems[index].addEventListener("click", function () {
					if (!hasClass(this, "custom-date")) {
						// console.log('haha');
						var getLiestText = this.textContent;
						anchor.innerHTML = getLiestText;
						if (checkList.classList.contains("visible"))
							checkList.classList.remove("visible");
						else checkList.classList.add("visible");
					}
				});
			}
		}
	}
}
/*
CustomMultiSelect("list1", "#list1 .items li input", ".anchor1");
CustomMultiSelect("list2", "#list2 .items li input", ".anchor2");
CustomMultiSelect("list3", "#list3 .items li", ".anchor3");
CustomMultiSelect("list4", "#list4 .items li", ".anchor4");
*/
/*
var selectTotal = document.querySelectorAll(".cwork-select");

for (let index = 0; index < selectTotal.length; index++) {
	const elementID = selectTotal[index].getAttribute("id");
	const type = selectTotal[index].getAttribute("type");
	const elementChild = selectTotal[index].childNodes[0].className;
	let anchor = elementChild.split(" ").splice(-1)[0];
	if (type == "multi") {
		CustomMultiSelect(
			elementID,
			"#" + elementID + " .items li input",
			"." + anchor
		);
	} else {
		CustomMultiSelect(elementID, "#" + elementID + " .items li", "." + anchor);
	}
}
*/