const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WatchaSchema = new Schema({
    wid: { type: String, required: true },
    tag: { type: String, required: true },
    watchas: { type: Array, required: true }
},{
    timestamps: true
});

const Watcha = mongoose.model('Watcha', WatchaSchema);

module.exports = Watcha;
