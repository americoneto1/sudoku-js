(function() {

	var config = {
		rows: 3,
		cols: 3
	};

	createSudoku(config)

	var inputs = document.getElementById("sudoku").getElementsByTagName("input");
	for (var j = inputs.length - 1; j >= 0; j--) {
		inputs[j].addEventListener("keyup", function() {
			validateSudoku(this)
		});
		inputs[j].addEventListener("keypress", function(e) {
			var n = (window.Event) ? e.which : e.keyCode;
			if(n < 49 || n > 57) e.preventDefault();
		});
	}	

	document.getElementById("btnLimpar").addEventListener("click", function() {
		for (var j = inputs.length - 1; j >= 0; j--) {
			inputs[j].value = "";
			inputs[j].setAttribute("class", "");
		}
	});

	function createSudoku(config) {
		var new_table = document.createElement("table");
		for (var i = 1; i <= config.rows * config.rows; i++) {
			var row = document.createElement("tr");
			for (var j = 1; j <= config.cols * config.cols; j++) {
				var col = document.createElement("td");
				var classes = (j % config.cols == 0 && j != config.cols * config.cols) ? " border-right " : "";
				classes += (i % config.cols == 0) ? " border-bottom " : "";
				col.setAttribute("class", "c" + j + " r" + i + " " + classes);
				col.innerHTML = '<input type="text" maxlength="1" />';
				row.appendChild(col);
			};
			new_table.appendChild(row);
		};
		document.getElementById("sudoku").appendChild(new_table);
	} 

	function validateSudoku(input) {
		input.setAttribute("class", "");
		if(input.value == "") return;

		var table = input.parentNode.parentNode.parentNode;
		var input_class_pieces = input.parentNode.getAttribute("class").split(" ");
		var input_col_class = input_class_pieces[0];
		var input_row_class = input_class_pieces[1];
		
		validateColsAndRows(table.getElementsByClassName(input_row_class), input)
		validateColsAndRows(table.getElementsByClassName(input_col_class), input)
	}

	function validateColsAndRows(values_to_validate, input) {
		var invalid_counts = 0;
		for (var i = values_to_validate.length - 1; i >= 0; i--) {
			var input_value = values_to_validate[i].getElementsByTagName("input")[0].value;			
			if(input_value == input.value) {
				invalid_counts++;
				if(invalid_counts == 2) {
					input.setAttribute("class", "invalid");
					return false;
				}
			}
		}
		return true;
	}

	function validateSquare(input) {

	}

})();