const login = require('../app/controllers/login.controller');
const register = require('../app/controllers/register.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const forgotPassword = require('../controllers/auth/forgotPassword.controller');

function route(app){

    app.get('/login', authMiddleware.isAuth, login.showLoginForm)
    .post('/login', login.login)

    .get('/register', authMiddleware.isAuth, register.create)
    .post('/register', register.register)

    .get('/logout', authMiddleware.loggedin, login.logout)

    .get('/verify', register.verify)

    .get('/password/reset', forgotPassword.showForgotForm)
    .post('/password/email', forgotPassword.sendResetLinkEmail)

    .get('/password/reset/:email', forgotPassword.showResetForm)
    .post('/password/reset', forgotPassword.reset)
}

module.exports = route