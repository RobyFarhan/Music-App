const multer = require('multer');

module.exports = (imageFile)=>{

// function imageFile() { 
    const storage = multer.diskStorage({
        destination: function (req, file, cb) { //cb callback
            cb(null, 'uploads');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '')); //supaya nama image tidak sama
        }
    });

    const fileFilter = function (req, file, cb) {
        if (file.filename === imageFile) {
            if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|mp3)$/)) {
                req.fileValidationError = {
                    message: 'Picture format is not allowed'
                }
                return cb(new Error('Picture format is not allowed'), false);
            }
        }
        cb(null, true);
    };

    const sizeInMb = 10;
    const maxSize = sizeInMb * 1000 * 1000;

    const upload = multer({
        storage,
        fileFilter,
        limits: {
            fileSize: maxSize,
        },
    }).single(imageFile);

    return function (req, res, next) {
        upload(req, res, function (err) {
            if (req.fileValidationError) {
                req.session.message = {
                    type: 'danger',
                    message: 'Please select file to upload',
                };
            return res.redirect(req.originalUrl);
        }
        
        if (err) {
            if (err.code == 'LIMIT_FILE_SIZE') {
                req.session.message = {
                    type: 'danger',
                    message: 'Error, max size is 10MB',
                };
                return res.redirect(req.originalUrl);
            }

            req.session.message = {
                type: 'danger',
                message: err,
            };
            return res.redirect(req.originalUrl);
            }
            return next();
            });
    };
    }

