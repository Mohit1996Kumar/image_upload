let services = require('../services/index')
let responses = require('../commonFunctions.js/responses')
let constants = require('../constants')
const fs = require("fs");
var ExifImage = require('exif').ExifImage;

let welcomePage = (req, res) => {
    res.send("Welcome to image upload home page")
}

let insertImage = async (req, res) => {

    //get default location data, sent by apps
    req.body.location = JSON.parse(req.body.location)

    //upload image in folder and get Exif information
    try {
        let exifData = await saveImageAndGetExifData(req)

        if (exifData && exifData.latitude && exifData.longitude && exifData != 0) {
            req.body.location.latitude = exifData.latitude
            req.body.location.longitude = exifData.longitude
        }

        let dataToInsert = {
            name: req.body.name,
            address: req.body.address,
            location: {
                latitude: req.body.location.latitude,
                longitude: req.body.location.longitude
            }
        }

        let response = await services.imageService.insertImage(dataToInsert)

        //sending success response to the requested user
        responses.sendSuccess(res, constants.SUCCESS_MESSAGE.imageUploadSuccess)
    } catch (error) {
        console.log(error);
        responses.sendError(res, constants.ERROR_MESSAGE.imageUploadError)
    }
}


let findImage = async (req, res) => {
    let criteria = {}
    if (req.query._id)
        criteria._id = req.query._id

    try {
        let response = await services.imageService.findImage(criteria, {})
        if (response)
            responses.sendSuccess(res, constants.SUCCESS_MESSAGE.imageUploadSuccess, response)
    } catch (error) {
        if (error) {
            console.log(error);
            responses.sendError(res, constants.ERROR_MESSAGE.imageUploadError)
        }

    }
}


let saveImageAndGetExifData = (req) => {
    return new Promise((resolve, reject) => {
        const tempPath = req.file.path;
        const targetPath = "./uploads/" + req.file.originalname

        //save and rename image
        fs.rename(tempPath, targetPath, err => {
            if (err)
                resolve(0)
            try {
                //extract exif data from image
                new ExifImage(targetPath, function (error, exifData) {
                    if (error)
                        resolve(0)
                    else {
                        if (exifData && exifData.gps && exifData.gps.GPSLatitude && exifData.gps.GPSLongitude)
                            resolve({ latitude: exifData.gps.GPSLatitude[2], longitude: exifData.gps.GPSLongitude[2] })
                        else
                            resolve(0)
                    }
                });
            } catch (error) {
                resolve(0)
            }

        })
    })
}


module.exports = {
    welcomePage: welcomePage,
    insertImage: insertImage,
    findImage: findImage
}