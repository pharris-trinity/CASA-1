const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum : ['ADMIN', 'COACH', 'STUDENT', 'MENTOR'],
        default: 'STUDENT'
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;