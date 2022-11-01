const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    password: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true
    }
});


const LoginUser = new mongoose.model("LoginUser", loginSchema);

module.exports = LoginUser;