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
    //check if user already exists in current session. 
    //If so, go back asking them to re enter.
    var errorMessage = "";
    if (request.session.userName == request.body.userName)
    {
        var message="A user already exists with that username or email";
        response.render(
            "register",
            {
                errorMessage:message
            }
        );
    }
    else // If not save it as sessions' and then go to newSavedUser to welcome him
    {
        request.session.userName = request.body.userName;   //remember, newUser came as POST so we use bodyparser to get this data
        request.session.password = request.body.password;   //since temporary session, lets not encrypt yet
        response.render(
            "newSavedUser",
            {
                sessionForEJS : request.session             //for sidebar update
            }
        );
    }
}

exports.authenticate = function(request, response)
{
    //check if user credentials match in current session.
    var userMatch = ((request.session.userName == request.body.userName) ? true : false);
    var passwordMatch = ((request.session.password == request.body.password) ? true : false);

    //If matches, go to new Story
    if (userMatch && passwordMatch)
    {
        request.session.loggedIn = true;
        response.render(
          "newStory"  ,
          {
            sessionForEJS: request.session  //for sidebar button update and newStory could use it to personalize..
          }
        );
    }
    else  //go back to login throwing error
    {
        var message = "Login Credentials do not match. Please try again";
        response.render(
            "login",
            {
                errorMessage: message
            }
        );
    }
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
