const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DbSchema = new Schema({
    document: { type: String, required: true },
    uid: { type: Number, required: true }
},{
    timestamps: true
});

const Db = mongoose.model('Db', DbSchema);

module.exports = Db;