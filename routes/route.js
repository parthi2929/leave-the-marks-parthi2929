var mongoose = require("mongoose");
var userModel = mongoose.model("userModel");
var storyModel = mongoose.model("storyModel");


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
    //1. Retrieve Stories
    storyModel.find(
        {
            //no condition as we are extracting all stories in DB
        },
        function(errorFind, savedStories)
        {
            //After all, if no stories, we simply display none
            response.render(
                "allStories",
                {
                    sessionForEJS: request.session,  //for sidebar update
                    storiesForEJS: savedStories      //for stories update
                }
            );           
        }
    );
}


exports.addStoryToDB = function(request, response)
{
    //1. Get the story data: title, author, content, and create slug
    var title = request.body.title;
    var author = request.session.userName; //yeah, can get from session..
    var content = request.body.storyContent;


    var newStory = new storyModel();
    newStory.title = title;
    newStory.author = author;
    newStory.content = content;
    newStory.slug =  newStory.title
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");    //Thanks to: https://andrew.stwrt.ca/posts/js-slugify/

    //2. Save using Model. If success, redirect to allStories page.
    newStory.save(
        function(errorSaving, savedStory)
        {
            if (errorSaving)
            {
                var message = "Error Saving DB";
                console.log(message);
                //later throw 500
            }
            else //if successfully stored, show all stories page
            {
                response.redirect(
                    "/allStories"
                );
            }
        }
    );
}



exports.slugStory = function(request, response)
{
    //1. Search in DB with given slug
    var slugToSearch = request.params.slug;

    //2. Pass on that story to EJS
    storyModel.findOne(
        {
            slug: slugToSearch  //field: value to be matched
        },
        function(errorFinding, savedStory)
        {
            response.render(
                "slugStory",
                {
                    sessionForEJS: request.session, //for sidebar update
                    storyForEJS: savedStory
                }
            );
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
