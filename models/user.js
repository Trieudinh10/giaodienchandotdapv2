const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String, //loại kí tự
        require:true, //bắt buộc phải có username
        minlength: 6, //min
        maxlength: 20,
        unique: true, //là duy nhất ko bị trùng
    },
    email:{
        type: String, 
        require:true,
        minlength: 10, 
        maxlength: 100,
        unique: true, 
    },
    password:{
        type: String,
        require: true,
        minlength: 8,
    },
    admin:{
        type: Boolean,
        default: false,

    },
},{timestams:true}
);

module.exports = mongoose.model("User", userSchema);