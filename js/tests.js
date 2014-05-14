test("testCalculateAliveNeighbours", function() {
	var world = [
		[0, 1, 0],
		[0, 1, 1],
		[1, 1, 0]
	];
	var gol = new Gol({world: world});
	var cell = new Cell(0, 2, 0);
	var result = (gol.calculateAliveNeighbours(cell) == 3);
	ok(result == true, "Has 3 alive neighbours");
});

test("testWorldValid", function() {
	var gol = new Gol({});
	gol.generateRandomWorld();
	ok(typeof gol.getWorld() != undefined, "World is Valid");
});

test("testIsAlive", function() {
	var world = [
		[0, 1, 0],
		[0, 1, 1],
		[1, 1, 0]
	];
	var gol = new Gol({
		world: world
	});
	var result = gol.isAlive(0, 1);
	ok(result == 1, "Cell is alive");
});
