exports.index = function(request, response)
{
    //render
    response.render(
        "index",
        {
            title: "Leave the Mark",
            headline: "We believe everyone has a story to tell"
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
    //render
    response.render(
        "logout",
        {

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
                sessionObjectForEJS : request.session             //just to differentiate 
            }
        );
    }
}

exports.authenticate = function(request, response)
{
    //authenticate if user credentials match in DB.If not go back. If matches, go to new Story 
    response.redirect(
        "/newStory"
    );
}

exports.allStories = function(request, response)
{
    
    response.render(
        "allStories",
        {

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
            
        }
    );
}

exports.newStory = function(request, response)
{
    //authenticate if user credentials match in DB.If not go back. If matches, go to new Story 
    response.render(
        "newStory",
        {

        }
    );
}
