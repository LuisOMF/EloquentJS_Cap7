// Eletronic Life

// ------------------ //
// --- Utilidades --- //
// ------------------ //

// Cria um vetor que guarda coordenadas bidimensionais x e y
function Vector(x, y) {
    this.x = x;
    this.y = y;
}

// Funcao que soma o vetor a um outro vetor
Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
};

// Retorna um elemento aleatorio
function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Variavel que cria um vetor com todas as direcoes cardinais
var directionNames = "n ne e se s sw w nw ".split(" ");

// Funcao que retorna um elemento baseado em um caractere e uma legenda
function elementFromChar(legend, ch) {
    if (ch == " ") {
	return null;
    }
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
}

// Funcao que traduz um element para um char
function charFromElement(element) {
    if (element == null) {
	return " ";
    } else {
	return element.originChar;
    }
}
// Objeto que traduz direcoes cardinais em um vetor bidimensional
var directions = {
    "n": new Vector(0, -1),
    "ne": new Vector(1, -1),
    "e": new Vector(1, 0),
    "se": new Vector(1, 1),
    "s": new Vector(0, 1), 
    "sw": new Vector(-1, 1),
    "w": new Vector(-1, 0),
    "nw": new Vector(-1, -1)
};

// --------------- //
// --- Objetos --- //
// --------------- //



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
