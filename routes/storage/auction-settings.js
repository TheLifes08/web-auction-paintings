const express = require("express");
const passport = require("passport");
const fs = require("fs");
const path = require("path");
const storage = require("../../storage");

const router = express.Router();

router.get("/", passport.authenticationMiddleware(), (request, response) => {
    response.json(storage.auctionSettings);
});

router.post("/filesystem", passport.authenticationMiddleware(), (request, response) => {
    let data = request.body;

    if (data && data.action) {
        if (data.action === "save" && data.settings) {
            let content = JSON.stringify(data.settings);

            fs.writeFile(path.join(__dirname, "../../storage/auction-settings.json"), content, function(error, data) {
                if (!error) {
                    response.json({error: false, message: "Настройки успешно сохранены."});
                } else {
                    response.json({error: false, message: data});
                }
            });
        } else if (data.action === "load") {
            fs.readFile(path.join(__dirname, "../../storage/auction-settings.json"), {encoding: 'utf-8'}, function(error, data) {
                if (!error) {
                    let loadedSettings = JSON.parse(data);

                    storage.auctionSettings.datetime = loadedSettings.datetime;
                    storage.auctionSettings.auctionTimeout = loadedSettings.auctionTimeout;
                    storage.auctionSettings.betTimeout = loadedSettings.betTimeout;
                    storage.auctionSettings.pauseTimeout = loadedSettings.pauseTimeout;

                    response.json({error: false, message: "Настройки успешно загружены."});
                } else {
                    response.json({error: false, message: data});
                }
            });
        } else {
            response.json({error: true, message: "Неизвестное действие."});
        }
    } else {
        response.json({error: true, message: "Пустые данные."});
    }
});

router.put("/", passport.authenticationMiddleware(), (request, response) => {
    let settings = request.body;

    if (settings) {
        if (settings.datetime) {
            storage.auctionSettings.datetime = settings.datetime;
        }
        if (settings.auctionTimeout) {
            storage.auctionSettings.auctionTimeout = Number(settings.auctionTimeout);
        }
        if (settings.betTimeout) {
            storage.auctionSettings.betTimeout = Number(settings.betTimeout);
        }
        if (settings.pauseTimeout) {
            storage.auctionSettings.pauseTimeout = Number(settings.pauseTimeout);
        }

        response.json({error: false, message: "Настройки успешно обновлены."});
    } else {
        response.json({error: true, message: "Переданы пустые настройки."});
    }
});

module.exports = router;