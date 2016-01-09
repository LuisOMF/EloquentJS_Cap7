// Objeto que representa o mundo, o construtor toma um mapa (uma matriz de caracteres) e uma legenda
define(
    // Nome da funcao
    "world",

    // Dependencias
    ["critters", "grid", "./utils/vector", "./utils/helpers"],
    
    function (critters, grid, vector, helper) {
	function World(map, legend) {
	    var grid = new Grid(map[0].length, map.length);
	    this.grid = grid;
	    this.legend = legend;

	    map.forEach(function(line, y) {
		for (var x = 0; x < line.length; x++) {
		    grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
		}
	    });
	    // --- Metodos privados --- //
	    // Normalmente declarar os metodos privados no construtor seria ineficiente, pois cada instancia de world teria uma versao do metodo. No entanto, como no caso so usamos uma instancia logo nao precisamos nos preocupar com isso. A outra opcao em Js seria manter os metodos publicos
	    // Metodo que permite ao critter se mover
	    this.letAct = function(critter, vector) {
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
	    this.checkDestination = function(action, vector) {
		if (directions.hasOwnProperty(action.direction)) {
		    var dest = vector.plus(directions[action.direction]);
		    if (this.grid.isInside(dest)) {
			return dest;
		    }
		}
	    };
	    
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
	return World;
    }
);
