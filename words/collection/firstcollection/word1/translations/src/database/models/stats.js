const mongoose = require("mongoose");

const statsSchema = mongoose.Schema({
    userID: String,
    timeInVoiceChatGeneral: Number,
    timeInVoiceChatCzech: Number,
    questions: Number,
    answers: Number
});

module.exports = mongoose.model("Stats", statsSchema);