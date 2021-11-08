const express = require("express");
const routesAuctionSettings = require("./auction-settings");
const routesStorage = require("./storage");
const routesLogin = require("./login");
const routesLogout = require("./logout");
const routesRegistration = require("./registration");
const routesPaintings = require("./paintings");
const routesUsers = require("./users");
const passport = require("passport");
const storage = require("../storage");

const router = express.Router();

router.use("/auction/settings", routesAuctionSettings);
router.use("/storage", routesStorage);
router.use("/login", routesLogin);
router.use("/logout", routesLogout);
router.use("/registration", routesRegistration);
router.use("/paintings", routesPaintings);
router.use("/users", routesUsers);

router.get("/auction", passport.authenticationMiddleware(), (request, response) => {
    response.render("auction", {authenticated: request.isAuthenticated(), auctionSettings: storage.auctionSettings});
});

router.get("/", passport.authenticationMiddleware(), (request, response) => {
    response.render("auction", {authenticated: request.isAuthenticated(), auctionSettings: storage.auctionSettings});
});

router.get("/*", (request, response) => {
    response.status(404);
    response.render("not-found", {authenticated: request.isAuthenticated()});
});

module.exports = router;