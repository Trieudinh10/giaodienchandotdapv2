const User = require('../models/User');

const userController = {
    //GET ALL USER
<<<<<<< HEAD
    getAllUsers: async(req, res) =>{
        try{
            const user = await User.find();
            res.status(200).json(user);
            return res.render('user',{list : user})
        }catch(err){
=======
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            console.log('All users:', users); // In danh sách người dùng lên terminal
            res.status(200).json(users);
        } catch (err) {
            console.error('Error:', err);
>>>>>>> 8a8d722dd911d8e15fd18a403698d8b3777d2aec
            res.status(500).json(err);
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