const multer = require('multer');
const path = require('path');

// Cấu hình Multer
const storageService = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/assets/images/services/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Tạo middleware upload
const uploadService = multer({ storage: storageService });

module.exports = uploadService;
