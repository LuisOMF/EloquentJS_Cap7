define (
	//Name of the Module
	"helpers",

	//array of dependencies
	["./vector"],

	// return the object with all the methods of helper
	//function(vector) {
		return {
			//creates a 2d Matrix
			new2dMatrix: function (x, y) {
			    var matrix = new Array(x);

			    for(var i = 0; i < x; i++) {
				matrix[i] = new Array(y);
			    }

			    return matrix;
			};

			// returns a random element inside an given array
			randomElement: function (array){
			    return array[Math.floor(Math.random() * array.length)];
			};

			// variable that creates an array with the cardinal directions

			directionNames: "n ne e se s sw w nw ".split(" "),

			// method that retunrs an element based on a given char in the Grid object contained in the World object and a legend (that will be defined in the World object)
			elementFromChar: function (legend, ch) {
			    if (ch == " ") {
					return null;
			    }
			    var element = new legend[ch]();
			    element.originChar = ch;
			    return element;
			}

			
			// translate an element to a char
			function charFromElement(element) {
			    if (element == null) {
					return " ";
			    } else {
					return element.originChar;
			    }
			}

			// translate the cardinal diretions to vectors
			var directions = {
			    "n" : new Vector(0, -1),
			    "ne": new Vector(1, -1),
			    "e" : new Vector(1,  0),
			    "se": new Vector(1,  1),
			    "s" : new Vector(0,  1), 
			    "sw": new Vector(-1, 1),
			    "w" : new Vector(-1, 0),
			    "nw": new Vector(-1, -1)
			};
		}
	//}
);