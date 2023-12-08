const siteRouter = require('./site')
const table1Router = require('./table1')
const chartRouter = require('./chart')
const authMiddleware = require('../middlewares/auth.middleware');
function route(app){

    app.use('/chart',chartRouter )

    app.use('/table_1',authMiddleware.loggedin, table1Router )

    app.use('/',siteRouter )

    app.get('/table_2', function (req, res) {
        res.render('table_2');
    })
    
    app.get('/data', function (req, res) {
        res.render('data');
    })
    
    app.get('/setting', function (req, res) {
        res.render('setting');
    })
    
}



module.exports = route