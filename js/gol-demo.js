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
            GameOfLife.initRefresh();
            GameOfLife.initExample1();
            GameOfLife.initExample2();
            GameOfLife.initExample3();
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
		},
        initRefresh: function() {
            $("#refresh").on("click", function() {
                window.location.reload(true);
            });
        },
        initExample1: function() {
            $("#example1").on("click", function() {
                var coords = [
                    [0, 0],
                    [0, 1],
                    [1, 0],
                    [1, 1],
                    [3, 7],
                    [3, 8],
                    [4, 6],
                    [4, 9],
                    [5, 6],
                    [5, 9],
                    [6, 7],
                    [6, 8]
                ];

                for (var i in coords) {
                    GameOfLife.board[coords[i][0]][coords[i][1]] = 1;
                    $('td[data-x="' + coords[i][0] + '"][data-y="' + coords[i][1] + '"]').css("background-color", "black").addClass("alive");
                }
            });
        },
        initExample2: function() {
            $("#example2").on("click", function() {
                var coords = [
                    [3, 24],
                    [4, 22],[4, 24],
                    [5, 12], [5, 13], [5, 20], [5, 21], [5, 34], [5, 35],
                    [6, 11], [6, 15], [6, 20], [6, 21], [6, 34], [6, 35],
                    [7, 0], [7, 1], [7, 10], [7, 16], [7, 20], [7, 21],
                    [8, 0], [8, 1], [8, 10], [8, 14], [8, 16], [8, 17], [8, 22], [8, 24],
                    [9, 10], [9, 16], [9, 24],
                    [10, 11], [10, 15],
                    [11, 12], [11, 13]
                ];

                for (var i in coords) {
                    GameOfLife.board[coords[i][0]][coords[i][1]] = 1;
                    $('td[data-x="' + coords[i][0] + '"][data-y="' + coords[i][1] + '"]').css("background-color", "black").addClass("alive");
                }
            });
        },
        initExample3: function() {
            $("#example3").on("click", function() {
                var coords = [
                    [24, 27],
                    [25, 29],
                    [26, 26], [26, 27], [26, 30], [26, 31], [26, 32]
                ];

                for (var i in coords) {
                    GameOfLife.board[coords[i][0]][coords[i][1]] = 1;
                    $('td[data-x="' + coords[i][0] + '"][data-y="' + coords[i][1] + '"]').css("background-color", "black").addClass("alive");
                }
            });
        }
	};
}();