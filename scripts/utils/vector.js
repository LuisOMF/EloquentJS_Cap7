
define(
	//Name of the module
	"vector", 

	//Array of dependencies (in this case, null)

	// the function to execute after all dependencies have loaded
	function() {
		// --- Constructor --- //
		
		//contructor of the Vector object, which simply contains a set of (x,y) coordinates
		function Vector(x, y) {
	    	this.x = x;
	    	this.y = y;
		}

		// --- Methods --- //

		// A simple addition of the (x,y) coordinates
		Vector.prototype.plus = function(other) {
	    	return new Vector(this.x + other.x, this.y + other.y);
	    };

	    return Vector;
	}
);


