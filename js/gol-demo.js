var GameOfLife = function() {
	return {
		board: [],
		boardSize: 60,
		refreshIntervalId: null,
		init: function(n) {
			var n = (typeof n != 'undefined')? n: 50;
			GameOfLife.boardSize = n
			var html = '<table>';
			for (var i = 0; i < n; i++) {
				var row = [];
				html += '<tr>';
				for (var j = 0; j < n; j++) {
					html += '<td class="cell" data-x="' + i + '" data-y="' + j + '"></td>';	
					row[j] = 0;
				}	
				html += '</tr>';
				GameOfLife.board[i] = row;
			}
			html += '</table>';
			
			$("#golBoard").append(html);

			GameOfLife.initBoardClick();
			GameOfLife.initRun();
			GameOfLife.initStep();
			GameOfLife.initStop();
		},
		initBoardClick: function() {
			$(".cell").on("click", function() {
				var xPos = $(this).data("x");
				var yPos = $(this).data("y");
				if ($(this).hasClass("alive")) {
					$(this).removeClass("alive");
					$(this).css("background-color", "#FFFFFF");
					GameOfLife.board[xPos][yPos] = 0;
				} else {
					$(this).css("background-color", "#000000");
					GameOfLife.board[xPos][yPos] = 1;
					$(this).addClass("alive");
				}
			})
		},
		step: function() {
			var world = GameOfLife.board;
			var worldSize = GameOfLife.boardSize;
			var gol = new Gol({world: world});
			var worldNew = [];
			for (var i = 0; i < worldSize; i++) {
				var row = [];
				for (var j = 0; j < worldSize; j++) {
					var cell = new Cell(i, j, world[i][j]);
					var c = gol.calculateAliveNeighbours(cell);
					var result = gol.getNextState(c, world[i][j]);
					row[j] = result;		
					$('td[data-x="' + i + '"][data-y="' + j + '"]').css("background-color", (result == 0)? "white": "black");
				}	
				worldNew[i] = row;
			}
			GameOfLife.board = worldNew;
		},
		initRun: function() {
			$("#play").on("click", function() {
				refreshIntervalId = setInterval(function() {
					GameOfLife.step();
				}, 100);
			});
		},
		initStep: function() {
			$("#step").on("click", function() {
				GameOfLife.step();
			});
		},
		initStop: function() {
			$("#stop").on("click", function() {
				clearInterval(refreshIntervalId);

			});
		}
	};
}();