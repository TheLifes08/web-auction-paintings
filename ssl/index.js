const fs = require("fs");

const privateKey = fs.readFileSync(__dirname + "/example.key", "utf8");
const certificate = fs.readFileSync(__dirname + "/example.crt", "utf8");

module.exports = { privateKey, certificate };