class chartController {
    // GET home
    index (req, res) {
        res.render('chart');
    }
}

module.exports = new chartController