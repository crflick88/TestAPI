// app/models/bear.js
var mongoose    = require('mongoose');
var schema      = mongoose.Schema;

var BearSchema = new schema({
    name: String,
    age: Number,
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bear',BearSchema);
