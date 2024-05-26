const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        unique: true
    },
    password: {
        type: String,
        minlength: 2,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false
    }

}, { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);