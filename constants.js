let ERROR_MESSAGE = {
    imageUploadError : "Something went wrong while uploading image"
}

let SUCCESS_MESSAGE = {
    imageUploadSuccess : "Image uploaded Successfully"
}

PORT = 3000
DB_URL = "mongodb://@localhost:27017/image_db"

module.exports  = {
    ERROR_MESSAGE   :   ERROR_MESSAGE,
    SUCCESS_MESSAGE :   SUCCESS_MESSAGE,
    PORT            :   PORT,
    DB_URL          :   DB_URL
}