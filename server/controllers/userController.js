// MySQL database connection
const db = require('../../db-connector').pool

// Read Users
exports.read = (req, res) => {
    
    // Execute a SQL query to fetch all user data.
    db.query('SELECT * FROM Users;', (err, results) => {
        // Once the query is done and results returned, release 
        // the database connection
        db.release();

        if (err) {
            console.error('An error occurred while executing the query', err);
            res.status(500).send('An error occurred');
        } else {
            // Pass the fetched user data to the view.
            res.render('users', { users: results });
        }
    });
};
