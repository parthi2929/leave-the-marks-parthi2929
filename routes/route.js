var userModel = require("../models/db.js");


exports.index = function(request, response)
{
    //render
    response.render(
        "index",
        {
            title: "Leave the Mark",
            headline: "We believe everyone has a story to tell",
            sessionForEJS: request.session  //for sidebar update
        }
    );
}

exports.login = function(request, response)
{
    //render
    response.render(
        "login",
        {

        }
    );
}

exports.register = function(request, response)
{
    //render
    response.render(
        "register",
        {

        }
    );
}

exports.logout = function(request, response)
{
    //Destroy current session 
    var loggedOutUser = request.session.userName;
    request.session.destroy();
    //Show log out page, saying bye to user
    response.render(
        "logout",
        {
            loggedOutUserForEJS: loggedOutUser
        }
    );
}


exports.newUser = function(request, response)
{    
    //1. Get signup credentials from body  (its a POST so thank body-parser)
    var enteredUserName = request.body.userName;
    var enteredPassword = request.body.password;

    //2. Create a model instance
    var newUserModel = new userModel();
    newUserModel.userName = enteredUserName;
    newUserModel.password = enteredPassword;

    //3. Save the model. 
    newUserModel.save(
        function(saveError, savedUser)
        {
            if (saveError)  //if error saving
            {
                var message = "User already exists. Please try again";
                response.render(
                    "register",
                    {
                        errorMessage: message
                    }
                );
            }
            else    //if success
            {                   
                console.log(savedUser.userName + " was successfully saved");
                request.session.userName = savedUser.userName;  //storing saved userName for next purpose
                response.render(
                    "newSavedUser",
                    {
                        sessionForEJS : request.session 
                    }
                );
            }
        }
    );
    
}

exports.authenticate = function(request, response)
{
    //1. Get signup credentials from body  (its a POST so thank body-parser)
    var enteredUserName = request.body.userName;
    var enteredPassword = request.body.password;

    //2. Find matching userName in DB using model
    userModel.findOne(
        {
            userName: enteredUserName
        },
        function(error, foundUser)
        {
            if (error)
            {
                var message = "Login Credentials do not match. Please try again";
                response.render(
                    "login",
                    {
                        errorMessage: message
                    }
                );
                return; //nothing more to do
            }
            else    //if userName matches, lets compare password next..
            {
                foundUser.comparePassword(
                    enteredPassword, 
                    function(isMatch)
                    {
                        if (isMatch)
                        {
                            request.session.userName = foundUser.userName;
                            request.session.loggedIn = true;
                            response.render(
                              "newStory"  ,
                              {
                                sessionForEJS: request.session  //for sidebar button update and newStory could use it to personalize..
                              }
                            );
                        }
                        else
                        {
                            var message = "Login Credentials do not match. Please try again";
                            response.render(
                                "login",
                                {
                                    errorMessage: message
                                }
                            );
                            return; //nothing more to do
                        }
                    }
                );
            }
        }
    );
}





exports.allStories = function(request, response)
{
    
    response.render(
        "allStories",
        {
            sessionForEJS: request.session  //for sidebar update
        }
    );
}

exports.addStoryToDB = function(request, response)
{
    //save the story in DB. If successfull, redirect to all stories page
    response.redirect(
        "/allStories"
    );
}

exports.slugStory = function(request, response)
{
    //find the story int he DB and route there..
    response.render(
        "slugStory",
        {
            sessionForEJS: request.session //for sidebar update
        }
    );
}

exports.newStory = function(request, response)
{
    //This might be reachable directly without logging in but should not be allowed.
    //Check if already logged in. If so, proceed. 
    if(request.session.loggedIn)
    {
        response.render(
            "newStory",
            {
                sessionForEJS: request.session
            }
        );
    }
    else //If not, go to login
    {
        response.redirect(
            "/login"
        );
    }

}
