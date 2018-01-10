var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    publisher: {type: String, required: true},
    publicationDate: {type: String, required: true},
    genre: {type: String, required: true},
    price: {type: Number, required: true}
});

model.exports = mongoose.model('Book',schema);