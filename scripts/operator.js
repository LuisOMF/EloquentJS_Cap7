// Eletronic Life

// ------------------ //
// --- Utilidades --- //
// ------------------ //


// --------------- //
// --- Objetos --- //
// --------------- //

// --- Grid --- //
// Objeto responsavel por guardar o grid bidimensional que contem o mapa do mundo
function Grid(width, height) {
    this.space = new2dMatrix(width, height);
    this.width = width;
    this.height = height;
}
// Diz se um par de coorenadas esta no grid
Grid.prototype.isInside = function(vector) {
    return vector.x >= 0 && vector.x < this.width && vector.y >= 0 && vector.y < this.height;
};
// Getter e setters
Grid.prototype.get = function(vector) {
    return this.space[vector.x][vector.y];
};
Grid.prototype.set = function(vector, value) {
    this.space[vector.x][vector.y] = value;
};
Grid.prototype.forEach = function(f, context) {
    for (var y = 0; y < this.height; y++) {
	for (var x = 0; x < this.width; x++){
	    var value = this.space[x][y];
	    if (value != null) {
		f.call(context, value, new Vector(x, y));
	    }
	}
    }
};

// --- View --- //
// Objeto que permite ao critter ver os arredores dele, seu construtor recebe a posicao atual do critter (na forma de um Vector)
function View(world, vector) {
    this.world = world;
    this.vector = vector;
}
// Retorna o caractere que descreve o que há naquela direcao
View.prototype.look = function(dir) {
    var target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target)) {
	return charFromElement(this.world.grid.get(target));
    } else {
	return "#";
    }
};
// Retorna todas as direcoes em que um certo caractere pode ser encontrado em relacao ao critter
View.prototype.findAll = function(ch) {
    var found = [];
    for (var dir in directions) {
	if (this.look(dir) == ch) {
	    found.push(dir);
	}
    }
    return found;
};
// Retorna uma direcao em que um certo caractere pode ser encontrado em relacao ao critter
View.prototype.find = function(ch) {
    var found = this.findAll(ch);
    if (found.length == 0) {
	return null;
    }
    return randomElement(found);
};
// --- BouncingCritter --- //
// Objeto que descreve um critter 
function BouncingCritter() {
    this.direction = randomElement(directionNames);
};
// Em um dado turno o critter vai checar se ele pode ir na direcao que estava indo antes, se nao puder ir naquela direcao, escolhe uma direcao nova aleatoriamente
BouncingCritter.prototype.act = function(view) {
    if (view.look(this.direction) != " ") {
	this.direction = view.find(" ") || "s";
    }
    return {type: "move", direction: this.direction};
};

// --- World --- //
// Objeto que representa o mundo, o construtor toma um mapa (uma matriz de caracteres) e uma legenda
function World(map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    map.forEach(function(line, y) {
	for (var x = 0; x < line.length; x++) {
	    grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
	}
    }); 
};
// Transforma o estado atual do mundo em uma string
World.prototype.toString = function() {
    var output = "";
    for (var y = 0; y < this.grid.height; y++) {
	for (var x = 0; x < this.grid.width; x++) {
	    var element = this.grid.get(new Vector(x, y));
	    output += charFromElement(element);
	}
	output += "\n";
    }
    return output;
};
// Metodo que define um turno onde os critter podem realizar suas acoes
World.prototype.turn = function() {
    var acted = [];
    this.grid.forEach(function(critter, vector) {
	if (critter.act && acted.indexOf(critter) == -1) {
	    acted.push(critter);
	    this.letAct(critter, vector);
	}
    }, this);
};
// Metodo que permite ao critter se mover
World.prototype.letAct = function(critter, vector) {
    var action = critter.act(new View(this, vector));
    if (action && action.type == "move") {
	var dest  = this.checkDestination(action, vector);
	if (dest && this.grid.get(dest) == null) {
	    this.grid.set(vector, null);
	    this.grid.set(dest, critter);
	}
    }
};
// Confere se um destino eh valido 
World.prototype.checkDestination = function(action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
	var dest = vector.plus(directions[action.direction]);
	if (this.grid.isInside(dest)) {
	    return dest;
	}
    }
};

// --- Wall --- //
// Objeto simples que nao tem um metodo act
function Wall() {}

// ------------- //
// --- Teste --- //
// ------------- //

var flag = false;

function doStuff () {
    if (flag) {
	document.getElementById("world").innerHTML = world.toString();
	world.turn();
    }
}
var world;
function takeNewWorld () {
    var plan = document.getElementById("newWorld").value.split("\n");
    world = new World (plan, {"#": Wall,
			      "o": BouncingCritter});
    flag = true;
}
function stopSim () {
    flag = false;
}

window.setInterval(doStuff, 333);
