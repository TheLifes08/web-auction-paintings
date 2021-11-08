const express = require("express");
const routerAuctionSettings = require("./auction-settings");
const routerPaintings = require("./paintings");
const routerUsers = require("./users");
const routerImages = require("./images");

const router = express.Router();

router.use("/auction/settings", routerAuctionSettings);
router.use("/paintings", routerPaintings);
router.use("/users", routerUsers);
router.use("/images", routerImages);

module.exports = router;