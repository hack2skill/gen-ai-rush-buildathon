const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    prediction: {
        type: String,
    },
    personality: { 
        type: String,
    },
});

module.exports = mongoose.model("User", userSchema);
