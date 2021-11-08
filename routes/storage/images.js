const express = require("express");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const settings = require("../../storage").settings;
const paintings = require("../../storage").paintings;

const router = express.Router();
const storage = multer.diskStorage({
    destination: function destination(request, file, callback) {
        callback(null, settings.paintings_storage_dir);
    },
    filename: function filename(request, file, callback) {
        if (request.body.id) {
            let extension = path.extname(file.originalname).toString();
            callback(null, request.body.id + extension);
        }
    }
});
const upload = multer({
    storage: storage
});

function getPainting(id) {
    return paintings.find((painting) => {
        return painting.id.toString() === id.toString();
    });
}

router.put("/", passport.authenticationMiddleware(), upload.single("file"), (request, response) => {
    if (request.body.id) {
        let painting = getPainting(request.body.id);
        painting.imageName = request.file.filename;
        response.json({error: false, filename: request.file.filename});
    } else {
        response.json({error: true, filename: null});
    }
});

module.exports = router;