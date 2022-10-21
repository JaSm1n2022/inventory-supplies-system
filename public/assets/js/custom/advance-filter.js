//
// Advvanced  Search  Fillte
//
function advancedSerachFilter() {
	var FieldsRow = `
    <div class="form-row  f-items">
        <div class="col-1">
            <a href="#" class="delete-row"><i class="fas fa-minus-circle"></i></a>
        </div>
        <div class="col">
            <select defaultValue="" class="custom-select mr-sm-2">
                <option>Property</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div>
        <div class="col">
            <select defaultValue="" class="custom-select mr-sm-2">
                <option>Oparent</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div>
        <div class="col">
            <select defaultValue="" class="custom-select mr-sm-2">
                <option>Parameter</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div>
    </div>`;

	var addNewFields = document.querySelector(".add-filter-btn");
	var filterForm = document.querySelector(".filter-form");
	var filterDelBtn = document.querySelector(".filter-btn-delete");
	var filterEditBtn = document.querySelector(".filter-btn-edit");
	var searchTitle = document.querySelector(".searchTitle");
	var TitleFiled = document.querySelector(".TitleFiled");
	var moreSaveBtn = document.querySelector(".more-save-btn");
	var moreSaveList = document.querySelector(".more-search-filter");
	var noticeAdSearch = document.querySelector(".notice-advance-search");

	moreSaveBtn.addEventListener("click", function (e) {
		moreSaveList.classList.toggle("active");
		e.preventDefault();
	});
	addNewFields.addEventListener("click", function (e) {
		filterForm.innerHTML += FieldsRow;
		e.preventDefault();
	});
	filterDelBtn.addEventListener("click", function (e) {
		this.parentNode.parentNode.parentNode.remove();
		e.preventDefault();
	});
	filterEditBtn.addEventListener("click", function (e) {
		var Title = searchTitle.textContent;
		console.log(Title);
		slideDown(".collapse-search");
		TitleFiled.value = Title;
		this.parentNode.parentNode.parentNode.remove();
		e.preventDefault();
	});
	document.querySelector(".new-filter-btn").addEventListener(
		"click",
		function (e) {
			slideDown(".collapse-search");
			noticeAdSearch.style.display = "none";
			TitleFiled.value = "";
			e.preventDefault();
		},
		false
	);
	document.querySelector(".filter-expnad-btn").addEventListener(
		"click",
		function (e) {
			slideUp(".collapse-search");
			noticeAdSearch.style.display = "inline-block";
			e.preventDefault();
		},
		false
	);

	setInterval(() => {
		var removeRows = document.querySelectorAll(".delete-row");
		for (let index = 0; index < removeRows.length; index++) {
			removeRows[index].addEventListener("click", function (e) {
				e.preventDefault();
				var row = this.parentNode.parentNode.remove();
			});
		}
	}, 1000);
}

if (document.querySelectorAll(".filter-form").length > 0) {
	advancedSerachFilter();
}


/**
 * Save Filter list Pin function
 */
let FilterSaveList = document.querySelectorAll("#RegularSerachFilter .save-data-list.pinItems ul li:not(:first-child)");
let FilterSaveListPin = document.querySelectorAll(".filter-list-thumbtack-btn");
FilterSaveListPin.forEach(function (element, index) {
	element.addEventListener('click', function (e) {
		this.classList.toggle('active')
		console.log(element.classList.contains('active'));
		if(element.classList.contains('active')) {
			FilterSaveList[index].style.display = 'none'
		}else{
			FilterSaveList[index].style.display = 'inline-block'
		}
		e.preventDefault()
	})
});
