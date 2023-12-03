const siteRouter = require('./site')
const table1Router = require('./table1')
function route(app){



    app.use('/table_1',table1Router )

    app.use('/',siteRouter )
    
    
    app.get('/table_2', function (req, res) {
        res.render('table_2');
    })
    
    app.get('/chart', function (req, res) {
        res.render('chart');
    })
    
    app.get('/data', function (req, res) {
        res.render('data');
    })
    
    app.get('/setting', function (req, res) {
        res.render('setting');
    })
    
    app.get('/login', function (req, res) {
        res.render('login');
    })
}



module.exports = route