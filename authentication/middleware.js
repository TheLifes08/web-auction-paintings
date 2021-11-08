function authenticationMiddleware() {
    return (request, response, next) => {
        if (request.isAuthenticated()) {
            return next();
        }
        console.log("Not authorized.");
        response.redirect("/login");
    };
}

module.exports = authenticationMiddleware;