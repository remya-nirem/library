const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    age :{
        type : String
    },
    gender: {
        type : String
    },
    role: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const userInfo = mongoose.model('user',userSchema);

module.exports = userInfo;