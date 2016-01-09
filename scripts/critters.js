// Contem um objeto critter e seus metodos
define (
	//module name
	"critters",

	//array of dependencies
	["./view", "./utils/helpers"],

	function (view, helpers) {
		// --- Constructor --- //
		//gets a random diretion from the direction names on the helper module
		function BouncingCritter() {
    		this.direction = randomElement(directionNames);
		}

		// at a given turn, the critter will check to see if it can move in the same direction as it was before. If it can, it will do nothing, if it can't it will pick a new one randomly
		BouncingCritter.prototype.act = function(view){
 			if (view.look(this.direction) != " ") {
				this.direction = view.find(" ") || "s";
    		}
    		return {type: "move", direction: this.direction};
		};
	}
);