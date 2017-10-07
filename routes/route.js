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

exports.newUser = function(request, response)
{
    //render
    response.render(
        "newUser",
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