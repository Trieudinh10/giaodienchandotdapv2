const User = require('../models/User');

const userController = {
    //GET ALL USER
    getAllUsers: async (req, res) => {
        try {
            const list = await User.find();
            // console.log( 'req.params:', list )
            return list;
            
            // Kiểm tra nếu res là undefined, tránh lỗi
            // if (!res) {
            //     console.error('Error: Response object is undefined.');
            //     return;
            // }
    
            // res.status(200).json(user);
            // return res.render('user', { list: user });
        } catch (err) {
            console.error(err);
            // Kiểm tra nếu res là undefined, tránh lỗi
            if (!res) {
                console.error('Error: Response object is undefined.');
                return;
            }
            return res.status(500).json(err);
        }
    },




    //DELETE USER
    deleteUser: async(req, res) =>{
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully");

        }catch(err){
            res.status(500).json(err);
        }
    }
}

module.exports = userController;