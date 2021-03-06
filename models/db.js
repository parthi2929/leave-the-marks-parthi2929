var mongoose = require("mongoose");
var chalk = require("chalk");

//1. Connect to DB
//var dbURI = "mongodb://localhost:27017/test";
var dbURI = "mongodb://parthi2929:test1234@ds121575.mlab.com:21575/leave-the-marks";
var dbConnection = mongoose.connect(dbURI,
    {
        useMongoClient: true
    }
);

//2. Setup Connection Events in case of issue.
mongoose.connection.on(
    "connected",
    function()
    {
        console.log(chalk.yellow("Mongoose connected to DB successfully"));
    }
);
mongoose.connection.on(
    "error",
    function()
    {
        console.log(chalk.red("DB error"));
    }
);
mongoose.connection.on(
    "disconnected",
    function()
    {
        console.log(chalk.red("Mongoose disconnected from DB"));
    }
);

