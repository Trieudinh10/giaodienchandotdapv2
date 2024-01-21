const User = require('../models/User');

const userController = {
    //GET ALL USER
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            console.log('All users:', users); // In danh sách người dùng lên terminal
            res.status(200).json(users);
        } catch (err) {
            console.error('Error:', err);
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