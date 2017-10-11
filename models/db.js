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

//3. Create Schema
var userSchema = mongoose.Schema(
    {
        userName: {type:String, unique: true},
        password: String
    }
);

//3.1 Create a static method to compare passwords to be called from other modules via model
//Reference: http://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
userSchema.methods.comparePassword = 
    function (enteredPassword, callBack)
    {
        if (this.password == enteredPassword) return callBack(true);    //this refers to model's instance
        else return callBack(false);
    };


//4. Create model and export
var userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
