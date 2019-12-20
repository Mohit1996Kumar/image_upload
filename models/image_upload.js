var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var imageSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  img: { data: Buffer, contentType: String },
  location: {
    latitude: Number,
    longitude: Number
  },
  date: { type: Date, default: Date.now },
});

exports.upload_image = mongoose.model('Image', imageSchema)