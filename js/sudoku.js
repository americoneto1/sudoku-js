(function() {

	var config = {
		rows: 3,
		cols: 3
	};

	var new_table = document.createElement("table");
	new_table.id = "main_table";
	for (var i = config.rows; i > 0; i--) {
		var row = document.createElement("tr");
		for (var j = config.cols; j > 0; j--) {
			var col = document.createElement("td");
			var sub_table = document.querySelector(".table_template").cloneNode(true);
			col.appendChild(sub_table);
			row.appendChild(col);
		};
		new_table.appendChild(row);
	};
	document.getElementById("sudoku").appendChild(new_table);

	var inputs = getAllInputs();
	for (var j = inputs.length - 1; j >= 0; j--) {
		inputs[j].addEventListener("keyup", function() {
			validateSudoku(this)
		});
		inputs[j].addEventListener("keypress", function(e) {
			var n = (window.Event) ? e.which : e.keyCode;
			if(n < 49 || n > 57) {
				e.preventDefault();
			}
		});
	}	

	document.getElementById("btnLimpar").addEventListener("click", function() {
		for (var j = inputs.length - 1; j >= 0; j--) {
			inputs[j].value = "";
			inputs[j].setAttribute("class", "");
		}
	});

	function validateSudoku(input) {
		if(input.value == "") return;

		var table_parent = input.parentNode.parentNode.parentNode;
		var inputs_of_table = table_parent.getElementsByTagName("input");
		var invalid_counts = 0;

		for (var i = inputs_of_table.length - 1; i >= 0; i--) {
			input.setAttribute("class", "");
			if(inputs_of_table[i].value == input.value) {
				invalid_counts++;
				if(invalid_counts == 2) {
					input.setAttribute("class", "invalid");
					break;
				}				
			}
		};

		var input_class_pieces = input.parentNode.getAttribute("class").split(" ");
		var input_col_class = input_class_pieces[0];
		var input_row_class = input_class_pieces[1];

		var table_main_tr = table_parent.parentNode.parentNode.parentNode;
		var values_to_validate_per_row = table_main_tr.getElementsByClassName(input_row_class);

		var invalid_counts = 0;
		for (var i = values_to_validate_per_row.length - 1; i >= 0; i--) {
			var input_value_row = values_to_validate_per_row[i].getElementsByTagName("input")[0].value;
			if(input_value_row == input.value) {
				invalid_counts++;
				if(invalid_counts == 2) {
					input.setAttribute("class", "invalid");
					break;
				}	
			}
		};

	}

	function getAllInputs() {
		var arrinputs = [];
		var tables = document.getElementById("sudoku").getElementsByClassName("table_template");
		for (var i = tables.length - 1; i >= 0; i--) {
			var inputs = tables[i].getElementsByTagName("input");
			for (var j = inputs.length - 1; j >= 0; j--) {
				arrinputs.push(inputs[j]);
			}
		}
		return arrinputs;
	}

})();