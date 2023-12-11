const User = require("../../models/user");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

let refreshTokens = [];


const authController = {
        // GET home
        index (req, res) {
            res.render('login');
        },

    //REGISTER
    registerUser: async(req, res) =>{
        try{
            const salt = await bcrypt.genSalt(10) //await là do bất động bộ nên phải chờ từng bước
            const hashed = await bcrypt.hash(req.body.password, salt); //tạo hashed để mã hoá password
            //create new uer
            const newUser = await new User({
                username: req.body.username,
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

    //GENERATE ACCESS TOKEN
    generateAccessToken: (user)=>{
        return jwt.sign(  
            {
                id: user.id,
                admin: user.admin 
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "1000s" }
            );
    },
    //GENERATE REFRESH TOKEN
    generateRefreshToken: (user)=> {
        return jwt.sign(  // refresh token
            {
                id: user.id,
                admin: user.admin 
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
            );
    },


    //LOGIN
    loginUser: async(req, res) =>{

        try{
            const user = await User.findOne({username: req.body.username});
            if(!user){
                return res.status(404).json("wrong username");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if(!validPassword){
                return res.status(404).json("wrong password");
            }
            if(user && validPassword){   //dùng jsonwebtoken
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly:true,
                    secure:false,
                    path:"/",
                    sameSite:"strict",
                })
                const {password, ...other} = user._doc;  //loại password ra khỏi thông tin 
                res.status(200).json({...other, accessToken});
            }
        }catch(err){
            res.status(500).json(err);
        }
       
    },

    requestRefreshToken:  async(req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json("You're not authenticated");
        if(!refreshTokens.includes(refreshToken)){
            return res.status(403).json("Refresh your token invalid");
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if(err){
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            // tạo newaccessToken, newrefreshToken
            const newaccessToken = authController.generateAccessToken(user);
            const newrefreshToken = authController.generateRefreshToken(user);
            res.cookie("refreshToken", newrefreshToken, {
                httpOnly: true,
                secure:false,
                path:"/",
                sameSite: "strict",
            });
            res.status(200).json({accessToken: newaccessToken});
        })
    },

    //LOG OUT
    userLogout: async(req, res) => {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
        res.status(200).json("Logged out!");
    }
};

module.exports = authController;