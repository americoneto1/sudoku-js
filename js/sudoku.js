(function() {

	var container = "sudoku";
	var levels = {
		easy: 1,
		medium: 2,
		hard: 3
	}

	createSudoku();
	fillInputs(levels.easy);

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

	document.getElementById("btnEasy").addEventListener("click", function() {		
		clearInputs(inputs);
		fillInputs(levels.easy);
	});

	document.getElementById("btnMedium").addEventListener("click", function() {		
		clearInputs(inputs);
		fillInputs(levels.medium);
	});

	document.getElementById("btnHard").addEventListener("click", function() {		
		clearInputs(inputs);		
		fillInputs(levels.hard);
	});

	document.getElementById("btnClose").addEventListener("click", function() {			
		document.getElementById("final_message").className = 'hide';
		var inputs = document.getElementById("sudoku").getElementsByTagName("input");		
		for (var j = inputs.length - 1; j >= 0; j--) {
			inputs[j].removeAttribute("disabled");	
		}
		var buttons = document.getElementsByClassName("levels")[0].getElementsByTagName("button");
		for (var j = buttons.length - 1; j >= 0; j--) {
			buttons[j].removeAttribute("disabled");	
		}
		clearInputs(inputs);
		fillInputs(levels.easy);	
	});
	
	function clearInputs(inputs) {
		for (var j = inputs.length - 1; j >= 0; j--) {
			inputs[j].value = "";
			inputs[j].setAttribute("class", "");
		}
	}

	function createSudoku() {
		var new_table = document.createElement("table");
		new_table.id = "main_table";
		for (var i = 1; i <= 9; i++) {
			var row = document.createElement("tr");
			for (var j = 1; j <= 9; j++) {
				var col = document.createElement("td");
				var classes = (j % 3 == 0 && j != 9) ? "border-right" : "";
				classes += (i % 3 == 0) ? " border-bottom" : "";
				col.setAttribute("class", classes);
				col.setAttribute("data-col", j);
				col.setAttribute("data-row", i);
				col.innerHTML = '<input type="text" maxlength="1" />';
				setSquare(col);
				row.appendChild(col);
			};
			new_table.appendChild(row);
		};
		document.getElementById(container).appendChild(new_table);
	} 

	function validateSudoku(input) {
		input.setAttribute("class", "");
		if(input.value == "") return;

		var table = input.parentNode.parentNode.parentNode;
		var input_col_class = '[data-col="' + input.parentNode.getAttribute("data-col") + '"]';
		var input_row_class = '[data-row="' + input.parentNode.getAttribute("data-row") + '"]';
		
		validateColsAndRows(table.querySelectorAll(input_row_class), input);
		validateColsAndRows(table.querySelectorAll(input_col_class), input);

		validateSquare(input);

		if(isSuccess()) {
			document.getElementById("final_message").className = '';
			var inputs = document.getElementById("sudoku").getElementsByTagName("input");
			for (var j = inputs.length - 1; j >= 0; j--) {
				inputs[j].setAttribute("disabled", "disabled");	
			}
			var buttons = document.getElementsByClassName("levels")[0].getElementsByTagName("button");
			for (var j = buttons.length - 1; j >= 0; j--) {
				buttons[j].setAttribute("disabled", "disabled");	
			}
		}
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
		var square = input.parentNode.getAttribute("data-square");
		var tds_square = document.querySelectorAll('[data-square="' + square + '"');
		validateColsAndRows(tds_square, input);	
	}

	function isSuccess() {
		var inputs = document.getElementById("sudoku").getElementsByTagName("input");
		for (var j = inputs.length - 1; j >= 0; j--) {
			if(inputs[j].value == "" && inputs[j].getAttribute("class") != "invalid") return false;
		}
		return true;
	}

	function setSquare(td) {

		var data_col = td.getAttribute("data-col");
		var data_row = td.getAttribute("data-row");
		var square = 0;

		if(data_row <= 3) {
			if(data_col <= 3) {
				square = 1;
			} else {
				if(data_col <= 6) {
					square = 2;
				} else {
					if(data_col <= 9) {
						square = 3;
					}
				}
			}	
		} else {
			if(data_row <= 6) {
				if(data_col <= 3) {
					square = 4;
				} else {
					if(data_col <= 6) {
						square = 5;
					} else {
						if(data_col <= 9) {
							square = 6;
						}
					}
				}	
			} else {
				if(data_row <= 9) {
					if(data_col <= 3) {
						square = 7;
					} else {
						if(data_col <= 6) {
							square = 8;
						} else {
							if(data_col <= 9) {
								square = 9;
							}
						}
					}	
				}
			}
		}
		td.setAttribute("data-square", square);
	}


	function fillInputs(level) {

		var table = document.getElementById(container).getElementsByTagName("table")[0];
		var trs = table.getElementsByTagName("tr");
		var n = 3;

		for (var i = trs.length - 1; i >= 0; i--) {
			var tds = trs[i].getElementsByTagName("td");
			for (var j = tds.length - 1; j >= 0; j--) {
				if( Math.floor(Math.random() * (level * 2)) == 1 ) {
					tds[j].getElementsByTagName("input")[0].value = parseInt((i*n + i/n + j) % (n*n) + 1);
				}
			};
		};
	}

})();