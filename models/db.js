var mongoose = require("mongoose");

//1. Connect to DB
var dbURI = "mongodb://localhost:27017/test";
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
        console.log("Mongoose connected to DB successfully");
    }
);
mongoose.connection.on(
    "error",
    function()
    {
        console.log("DB error");
    }
);
mongoose.connection.on(
    "disconnected",
    function()
    {
        console.log("Mongoose disconnected from DB");
    }
);

