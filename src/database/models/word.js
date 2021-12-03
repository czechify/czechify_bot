const mongoose = require("mongoose");

const wordSchema = mongoose.Schema({
    wordCzech: String,
    wordEnglish: String,
    value: Number
});

module.exports = mongoose.model("Word", wordSchema);