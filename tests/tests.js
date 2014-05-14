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

test("testUnderPopulation", function() {
	var world = [
		[0, 1, 0],
		[0, 1, 1],
		[1, 1, 0]
	];
	var gol = new Gol({
		world: world
	});
	var result = gol.getNextState(1, 1);
	ok(result == 0, "Cell died due to Under Population");
});

test("testReproduction", function() {
	var world = [
		[0, 1, 0],
		[0, 1, 1],
		[1, 1, 0]
	];
	var gol = new Gol({
		world: world
	});
	var result = gol.getNextState(3, 0);
	ok(result == 1, "Cell borned");
});

test("testSurvial2", function() {
	var world = [
		[0, 1, 0],
		[0, 1, 1],
		[1, 1, 0]
	];
	var gol = new Gol({
		world: world
	});
	var result = gol.getNextState(2, 1);
	ok(result == 1, "Cell survived with 2 neighbours");
});

test("testSurvial3", function() {
	var world = [
		[0, 1, 0],
		[0, 1, 1],
		[1, 1, 0]
	];
	var gol = new Gol({
		world: world
	});
	var result = gol.getNextState(3, 1);
	ok(result == 1, "Cell survived with 3 neighbours");
});

test("testOverCrowding", function() {
	var world = [
		[0, 1, 0],
		[0, 1, 1],
		[1, 1, 0]
	];
	var gol = new Gol({
		world: world
	});
	var result = gol.getNextState(4, 1);
	ok(result == 0, "Cell died due to overcrowding");
});