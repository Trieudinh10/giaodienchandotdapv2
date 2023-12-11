const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String, //loại kí tự
        required:true, //bắt buộc phải có username
        minlength: 6, //min
        maxlength: 20,
        unique: true, //là duy nhất ko bị trùng
    },
    email:{
        type: String, 
        required:true,
        minlength: 10, 
        maxlength: 50,
        unique: true, 
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
    },
    admin:{
        type: Boolean,
        default: false,

    },
},
{timestamps:true}
);

module.exports = mongoose.model("User", userSchema);