// MySQL database connection
const db = require('../../db-connector').pool

// Read Users
exports.read = (req, res) => {
    res.render('index')
};