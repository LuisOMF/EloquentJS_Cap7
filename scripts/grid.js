define(
    "grid",

    ["./utils/helpers"]

    function(helpers) {
	// Construtor
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
	// Realiza uma funcao em f em todos os elementos do grid
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
	return Grid;
    }
);
