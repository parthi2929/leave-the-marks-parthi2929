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
    //check if user already exists. If so, go back. If not go to newSavedUser
    response.render(
        "newSavedUser",
        {

        }
    );
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
