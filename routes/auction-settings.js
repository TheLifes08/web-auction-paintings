const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/", passport.authenticationMiddleware(), (request, response) => {
    response.render("auction-settings", {authenticated: request.isAuthenticated()});
});

module.exports = router;