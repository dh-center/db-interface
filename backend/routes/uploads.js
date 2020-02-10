const router = require('express').Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');
const uuid = require('uuid/v4');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

/**
 * Allow onlu JPEG and PNG images
 * @param {Request} req - Express request for processing
 * @param {Object} file - file info to upload
 * @param {function} cb - callback function
 */
function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
}

/**
 * Get Multer middleware for image uploading in certain directory
 * @param {string} folder - folder in S3 bucket to store in
 * @return {Multer}
 */
function getUploadMiddleware(folder) {
  return multer({
    fileFilter,
    storage: multerS3({
      s3,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      bucket: 'st-retrospect-images',
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        const key = folder + '/' + uuid() + path.extname(file.originalname);

        cb(null, key);
      }
    })
  });
}

/**
 * Returns array of uploaded images
 * @param {Request} req - Express request for processing
 * @param {Response} res - file info to upload
 */
function filesProcessMiddleware(req, res) {
  res.json({
    payload: {
      urls: req.files.map(file => {
        const requestForImage = {
          bucket: 'st-retrospect-images',
          key: file.key
        };

        return process.env.IMAGE_HOSTING_ENDPOINT + Buffer.from(JSON.stringify(requestForImage)).toString('base64');
      })
    }
  });
}

/**
 * Upload persons images
 */
router.post('/persons/images', getUploadMiddleware('persons').array('images'), filesProcessMiddleware);

/**
 * Upload locations images
 */
router.post('/locations/images', getUploadMiddleware('locations').array('images'), filesProcessMiddleware);

module.exports = router;
