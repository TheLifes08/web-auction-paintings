const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const http = require("http");
const https = require("https");
const ssl = require("./ssl");
const storage = require("./storage");

require("./authentication").init();
const routesIndex = require("./routes/index");

const server = express();

server.set("view engine", "pug");
server.set("views", "./views");

server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(expressSession({ secret: storage.settings.session_secret, resave: false, saveUninitialized: false }));
server.use(passport.initialize({}));
server.use(passport.session({}));

server.use("/public", express.static('public'));
server.use("/", routesIndex);

const httpServer = http.createServer(server);
const httpsServer = https.createServer({key: ssl.privateKey, cert: ssl.certificate}, server);

httpServer.listen(storage.settings.listen_http_port, storage.settings.listen_ip, listeningListener = function() {
    console.log(`Server started at http://${storage.settings.listen_ip}:${storage.settings.listen_http_port}`);
});

httpsServer.listen(storage.settings.listen_https_port, storage.settings.listen_ip,listeningListener = function() {
    console.log(`Server started at https://${storage.settings.listen_ip}:${storage.settings.listen_https_port}`);
});
