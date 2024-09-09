const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const multer = require("multer")
const path = require("path")
const { FileDirectoryType, AllowedFileType } = require('../utils/const')

const { S3Client } = require('@aws-sdk/client-s3')

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESSKEY,
    secretAccessKey: process.env.AWS_SECRETKEY,
})



const s3Storge = multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    contentType: (req, file, cb) => {
        cb(null, file.mimetype);
    },
    metadata: (req, file, cb) => {
        cb(null, { fileType: req.query.type })
    },
    key: (req, file, cb) => {
        cb(null, req.query.type + "/" + file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})


const uploads3 = multer({ storage: s3Storge });
module.exports = uploads3