const auctionSettings = require("./auction-settings");
const paintings = require("./paintings");
const users = require("./users");
const settings = require("./settings");

let storage = {
    auctionSettings,
    paintings,
    users,
    settings
};

module.exports = storage;