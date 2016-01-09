// Objeto que permite ao critter ver os arredores dele, seu construtor recebe a posicao atual do critter (na forma de um Vector)

define (
    // Nome do Modulo
    "view",

    // Array de dependencias
    ["./utils/helpers", "world", "./utils/vector"],

    // Executa todas as dependencias quando carregada
    function (helpers, world, vector) {
	// Construtor que apenas inicializa o objeto
	function View(world, vector) {
	    this.world = world;
	    this.vector = vector;
	}

	// --- Metodos --- //
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
	return View;
    }
);
