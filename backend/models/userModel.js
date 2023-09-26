const mongoose = require('mongoose');

 const userSchema = new mongoose.Schema(
    {
       firstName: {
        type: String,
        required: true
       },
       lastName: {
        type: String,
        required: true
       },
       phoneNumber: Number,
       emailAddress: String,
       gender: {
        type: String,
        required: true
        },
       password: {
        type: String,
        required: true
       },
       role: String
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;