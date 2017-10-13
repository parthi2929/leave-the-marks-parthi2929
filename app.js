//1. Import 
var express = require("express");
var db = require("./models/db.js");
var userModel = require("./models/userModel.js"); //to register schema
var storyModel = require("./models/storyModel.js"); //to register schema
var routes = require("./routes/route.js");
var session = require("express-session");
var bodyparser = require("body-parser");



//2. Initialize
var app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({     extended: false     }));
app.use(session({   secret:"secret",     resave:"true" ,    saveUninitialized:true      }));

//3. Routing - Paged => Direct to html validating insensitive data (note they are also GET)
app.get("/", routes.index);
app.get("/login", routes.login);
app.get("/register", routes.register);
app.get("/logout",routes.logout);
app.get("/allStories",routes.allStories);
app.get("/allStories/slugStory", routes.slugStory);
app.get("/newStory",routes.newStory);
app.get("/allStories/:slug",routes.slugStory);


//4. Routing - Pageless => Operations involving sensitive data (note, they are also POST)
app.post("/newUser",routes.newUser);    //We will evaluate and register newUser
app.post("/authenticate", routes.authenticate); //We will authenticate if log credentials ok
app.post("/addStoryToDB",routes.addStoryToDB);  //We will store submitted story in DB


//4. Start listening to a port
var port = process.env.PORT || 8080;
var server = app.listen(
    port,
    function(request, response)
    {
        console.log("Catch the action at http://localhost:" + port);
    }
);