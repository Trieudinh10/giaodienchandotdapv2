const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {getAllUsers} = require('../controllers/userController')
const requireAuth = (req, res, next) => {
  const accessToken = req.cookies.jwt;

  // check json web token exists & is verified
  if (accessToken) {
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, token) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(token);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check current user
const checkUser = (req, res, next) => {
    const accessToken = req.cookies.jwt;
    if (accessToken) {
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, async (err, token) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(token.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };

  const getHomepage = async(req, res) => { 
    let list = await getAllUsers();
      return res.render('user', {listUser: list});
    };
module.exports = {requireAuth ,checkUser, getHomepage};