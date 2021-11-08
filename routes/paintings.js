const express = require("express");
const passport = require("passport");
const storage = require("../storage");

const router = express.Router();

function getPainting(id) {
    return storage.paintings.find((painting) => {
        return painting.id.toString() === id.toString();
    });
}

router.get("/", passport.authenticationMiddleware(), (request, response) => {
    response.render("paintings", {authenticated: request.isAuthenticated()});
});

router.get("/:paintingId([0-9]{1,})", passport.authenticationMiddleware(), (request, response) => {
    let painting = getPainting(request.params.paintingId);

    if (painting) {
        response.render("painting-card", {painting: painting, authenticated: request.isAuthenticated()});
    } else {
        response.status(404);
        response.render("not-found", {authenticated: request.isAuthenticated()});
    }
});

module.exports = router;