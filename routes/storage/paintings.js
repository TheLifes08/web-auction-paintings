const express = require("express");
const passport = require("passport");
let storage = require("../../storage");

const router = express.Router();

function getPainting(id) {
    return storage.paintings.find((painting) => {
        return painting.id.toString() === id.toString();
    });
}

router.get("/", passport.authenticationMiddleware(), (request, response) => {
    response.json(storage.paintings);
});

router.get("/:paintingId([0-9]{1,})", passport.authenticationMiddleware(), (request, response) => {
    let painting = getPainting(request.params.paintingId);

    if (painting) {
        response.json(painting);
    } else {
        response.json(null);
    }
});

router.put("/", passport.authenticationMiddleware(), (request, response) => {
    let paintingData = request.body;

    if (paintingData && paintingData.id) {
        let painting = getPainting(paintingData.id);

        if (paintingData.title) {
            painting.title = paintingData.title;
        }
        if (paintingData.author) {
            painting.author = paintingData.author;
        }
        if (paintingData.description) {
            painting.description = paintingData.description;
        }
        if (paintingData.startPrice) {
            painting.startPrice = Number(paintingData.startPrice);
        }
        if (paintingData.minimalPriceStep) {
            painting.minimalPriceStep = Number(paintingData.minimalPriceStep);
        }
        if (paintingData.maximumPriceStep) {
            painting.maximumPriceStep = Number(paintingData.maximumPriceStep);
        }
        if (paintingData.placedOnAuction) {
            painting.placedOnAuction = paintingData.placedOnAuction === "true";
        }

        response.json({error: false, message: "Информация о картине успешно обновлена."});
    } else {
        response.json({error: true, message: "Картина не найдена."});
    }
});

module.exports = router;