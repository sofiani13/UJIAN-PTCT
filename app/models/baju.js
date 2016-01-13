'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bajuSchema = new Schema({
    merek : String,
    ukuran : String,
    warna : String,
});

module.exports = mongoose.model('Baju', bajuSchema);
