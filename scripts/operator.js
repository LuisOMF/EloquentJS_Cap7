// Eletronic Life

define (
    //name of the module (in this case our main)
    "operators",

    //array of dependencies
    ["./wall", "./world", "./critters"],

    //code
    function (wall, world, critters) {
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
    }
);
