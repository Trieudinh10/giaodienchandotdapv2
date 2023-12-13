const {requireAuth, checkUser} = require('../middleware/authMiddleware');

function route(app){

app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/table_1', requireAuth, (req, res) => res.render('table_1'));
app.get('/chart', requireAuth, (req, res) => res.render('chart'));
app.get('/setting', requireAuth, (req, res) => res.render('setting'));
app.get('/table_2', requireAuth, (req, res) => res.render('table_2'));
app.get('/data', requireAuth, (req, res) => res.render('data'));
    
}

module.exports = route