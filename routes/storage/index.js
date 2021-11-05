const express = require("express");
const routerPaintings = require("./paintings");
const routerUsers = require("./users");

const router = express.Router();

router.use("/paintings", routerPaintings);
router.use("/users", routerUsers);

module.exports = router;