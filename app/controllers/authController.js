const User = require("../../models/user")
const bcrypt = require("bcrypt")
const authController = {
    //REGISTER
    registerUser: async(req, res) =>{
        try{
            const salt = await bcrypt.genSalt(10) //await là do bất động bộ nên phải chờ từng bước
            const hashed = await bcrypt.hash(req.body.password, salt); //tạo hashed để mã hoá password
            //create new uer
            const newUser = await new User({
                username: req.bod.username,
                email: req.body.email,
                password: hashed,
            })
            //save to db
            const user = await newUser.save();
            res.status(200).json(user);

        }catch(err){
            res.status(500).json(err);
        }
    },
    //LOGIN
    loginUser: async(req, res) =>{
        try{
            const user = await User.findOne({username: req.body.username});
            if(!user){
                res.status(404).json("wrong username");
            }

            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password,
            );
            if(!validPassword){
                res.status(404).json("wrong password");
            }
            if(user && validPassword){
                res.status(200).json(user)
            }
        }catch(err){
            res.status(500).json(err);
        }
    }
};

module.exports = authController;