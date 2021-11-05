const express = require("express");
const routesStorage = require("./storage");
const routesLogin = require("./login");
const routesLogout = require("./logout");
const routesRegistration = require("./registration");
const routesPaintings = require("./paintings");
const routesUsers = require("./users");
const passport = require("passport");

const router = express.Router();

router.use("/storage", routesStorage);
router.use("/login", routesLogin);
router.use("/logout", routesLogout);
router.use("/registration", routesRegistration);
router.use("/paintings", routesPaintings);
router.use("/users", routesUsers);

router.get("/", passport.authenticationMiddleware(), (request, response) => {
    response.render("auction", {authenticated: request.isAuthenticated()});
});

router.get("/*", (request, response) => {
    response.status(404);
    response.render("not-found", {authenticated: request.isAuthenticated()});
});

module.exports = router;