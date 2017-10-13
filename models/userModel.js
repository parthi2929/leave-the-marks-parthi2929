var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;

//1. Create Schema
var userSchema = mongoose.Schema(
    {
        userName: {type:String, unique: true},
        password: String
    }
);

//2. Let us define the pre hook for hashing password before saving it in DB
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

//3 Create a static method to compare passwords to be called from other modules via model
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


//4. Create model and NEED NOT EXPORT
mongoose.model("userModel", userSchema);
