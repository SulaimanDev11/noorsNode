var express = require('express');
var router = express.Router();
const fileController = require('../controllers/fileController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Get folder name from the body of the request
        const folderName = req.body.folderName || 'images'; // Default folder is 'images' if none is provided
        const folderPath = path.join(__dirname, `../public/${folderName}`);

        // Create the directory if it doesn't exist
        const fs = require('fs');
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        console.log(`Storing file in folder: ${folderPath}`);
        cb(null, folderPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(
            null,
            file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
        );
    },
});

const upload = multer({
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'));
        }
        callback(null, true);
    },
    storage: storage,
});

// Update the route to receive folder name as a part of the form-data
router.post('/api/uploadImage', upload.array("image", 50), fileController.upload);

module.exports = router;
