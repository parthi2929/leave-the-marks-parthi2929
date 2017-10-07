//1. Import 
var express = require("express");
var routes = require("./routes/route.js");

//2. Initialize
var app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//3. Routing
app.get("/", routes.index);

//4. Start listening to a port
var port = process.env.PORT || 8080;
var server = app.listen(
    port,
    function(request, response)
    {
        console.log("Catch the action at http://localhost:" + port);
    }
);