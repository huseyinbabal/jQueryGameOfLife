var Gol = function(params) {
	return {
		world: (typeof params["world"] != 'undefined')? params["world"]: [],
		getWorld: function() {
			return this.world;
		},
		calculateAliveNeighbours: function(cell) {
			var count = 0;
			var world = this.getWorld();
			var xPos = cell.getX();
			var yPos = cell.getY();
			for (var k = (xPos -1); k <= (xPos +1); k++) {
				for (var l = (yPos -1); l <= (yPos +1); l++) {
					if (k >= 0 && l >= 0) {
						if (typeof world[k] != 'undefined' && typeof world[k][l] != 'undefined' 
							&& world[k][l] == 1 && !(xPos == k && yPos == l)) {
							count++;
						}
					}
					
				}
			}	
			return count;
		},
		generateRandomWorld: function(n) {
			for (var k = 0; k < n; k++) {
				for (var l = 0; l < n; l++) {
					var random = Math.random() % 2;
					world[k][l] = random;
				}
			}
		},
		getNextState: function(aliveNeighbours, currentState) {
			if (currentState == 0) {
				if (aliveNeighbours == 3) {
					return 1;
				} else {
					return 0;
				}
			} else {
				if (aliveNeighbours < 2 || aliveNeighbours > 3) {
					return 0;
				} else {
					return 1;
				}
			}
		}

	};
};

var Cell = function(x, y, state) {
	return {
		xPos: x,
		yPos: y,
		cellState: state,
		getX: function() {
			return this.xPos;
		},
		getY: function() {
			return this.yPos;
		},
		getState: function() {
			return this.cellState;
		}
	};
};