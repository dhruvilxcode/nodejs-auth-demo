const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        default: undefined,
    },
    lastname: {
        type: String,
        default: undefined,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: [6, 'Password is too weak, minimum 6 character are required!'],
    },
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;