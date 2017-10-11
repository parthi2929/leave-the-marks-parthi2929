var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;

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

//3.0 Let us define the pre hook for hashing password before saving it in DB
userSchema.pre(
    "save",
    function(next)
    {
        var thisUserModel = this;   //this refers to the model that called save function
        bcrypt.hash(thisUserModel.password, SALT_ROUNDS,
            function(errorHashing, hashedPassword)
            {
                if (errorHashing)
                {
                    return next(errorHashing);  //go to save
                }

                thisUserModel.password = hashedPassword;    //overriding with hashedPassword
                console.log("hashed Password: " + hashedPassword);
                next();
            }
        );
        
    }
);

//3.1 Create a static method to compare passwords to be called from other modules via model
//Reference: http://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
userSchema.methods.comparePassword = 
    function (enteredPassword, callBack)
    {
        var thisUserModel = this;   //this refers to the userModel that was returned by findOne()
        bcrypt.compare(enteredPassword, thisUserModel.password, 
            function(errorComparing, isMatch)
            {
                if (errorComparing || (!isMatch))
                {
                    return callBack(false);
                }
                console.log("Password comparision success");
                return callBack(true);
            }
        );
    };


//4. Create model and export
var userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
