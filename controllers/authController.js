const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'Email is not registered!';
  }

  // incorrect pasword
  if (err.message === 'incorrect password') {
    errors.password = 'Password is incorrect!';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'That email is already registered';
    return errors;
  }

  //validation
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}
// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      admin: user.admin
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: maxAge }
  );
};

// module.exports.signup_get = (req, res) => {
//   res.render('signup');
// }

// module.exports.login_get = (req, res) => {
//   res.render('login');
// }

// module.exports.signup_post = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.create({ email, password });
//     res.status(201).json(user);
//     return user;
//   }
//   catch (err) {
//     const errors = handleErrors(err
      
      
//       );
//     res.status(400).send({ errors });
//   }
// }

// module.exports.login_post = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.login(email, password);
//     const accessToken = createToken(user);
//     res.cookie('jwt', accessToken, {
//       httpOnly: true,
//       secure: false,
//       path: "/",
//       sameSite: "strict",
//       maxAge: maxAge * 1000
//     });
//     res.status(200).json({ user, accessToken });
//   }
//   catch (err) {
//     const errors = handleErrors(err);
//     res.status(400).json({ errors });
//   }

// }

// module.exports.logout_get = (req, res) => {
//   res.cookie('jwt', '', { maxAge: 1 });
//   res.redirect('/');
// }
const connection = require('../config/database');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
// const {getAllUser, getUserById,upDateUserById,deleteUserById} = require('../service/CRUD')

const login_get = (req, res) => {
  res.render('login.ejs');
}


const login_post = (req, res) => {
  const { email, password } = req.body;
  
  if (email && password) {
      User.findByEmail(email, (err, user) => {
          if (!user) {
              res.redirect('/login');
          } else {
              bcrypt.compare(password, user.password, (err, result) => {
                  if (result == true) {
                      req.session.loggedin = true;
                      req.session.user = user;
                      res.redirect('/home');
                  } else {
                      // A user with that email address does not exists
                      const conflictError = 'User credentials are not valid.';
                      res.render('auth/login', { email, password, conflictError });
                  }
              })
          }
      })
  } else {
      // A user with that email address does not exists
      const conflictError = 'User credentials are not valid.';
      res.render('/login', { email, password, conflictError });
  }
}


// const login_post = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.login(email, password);
//     const accessToken = createToken(user);
//     res.cookie('jwt', accessToken, {
//       httpOnly: true,
//       secure: false,
//       path: "/",
//       sameSite: "strict",
//       maxAge: maxAge * 1000
//     });
//     res.status(200).json({ user, accessToken });
//   }
//   catch (err) {
//     const errors = handleErrors(err);
//     res.status(400).json({ errors });
//   }

// }

const getCreatePage = (req, res) => {
    res.render('signup.ejs')
}

const postCreateuser =  async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    let role = req.body.role;
  
    console.log('reqbody',  email, password, name, role);
  
    let [results, fields] = await connection.query(
        'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, "user")',
        [email, password, name, role]
    );

    console.log('ket qua', results)
    res.redirect('/');
    // res.send('create success!');
}


  
module.exports = {
    getCreatePage,
    postCreateuser,
    login_get,
    login_post
  };