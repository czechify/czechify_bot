const mongoose = require("mongoose");

const userWordSchema = mongoose.Schema({
    userID: String,
    wordIds: [String],
    score: Number
});

module.exports = mongoose.model("UserWords", userWordSchema);