const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const authenticationMiddleware = require("./middleware");
const storage = require("../storage");

function findUser(username, callback) {
    for (let user of storage.users) {
        if (user.name === username) {
            return callback(null, user);
        }
    }
    return callback(null);
}

function initPassport() {
    passport.serializeUser((user, callback) => {
        callback(null, user.name);
    });

    passport.deserializeUser((username, callback) => {
        findUser(username, callback);
    });

    passport.use("local", new LocalStrategy({}, (username, password, done) => {
        findUser(username, (error, user) => {
            if (error) {
                return done(error, null);
            }

            if (!user) {
                console.log(`An attempt to log with the username '${username}': Wrong username.`);
                return done("Неверное имя пользователя.", null);
            }

            bcrypt.compare(password, user.passwordHash, (error, isValid) => {
                if (error) {
                    return done(error, null);
                }
                if (isValid) {
                    console.log(`Logged with the username '${user.name}'.`);
                    return done(null, user);
                } else {
                    console.log(`An attempt to log with the username '${user.name}': Wrong password.`);
                    return done("Неверный пароль.", null);
                }
            });
        });
    }));

    passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;