function authenticationMiddleware() {
    return (request, response, next) => {
        if (request.isAuthenticated()) {
            console.log("authed")
            return next();
        }
        console.log("not authed")
        response.redirect("/login");
    };
}

module.exports = authenticationMiddleware;