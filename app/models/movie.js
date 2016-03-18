// app/models/movie.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MovieSchema   = new Schema({
    title: String,
    author: String,
    year: String
});

module.exports = mongoose.model('Movie', MovieSchema);