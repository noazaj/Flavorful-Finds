// MySQL database connection
const db = require('../../db-connector').pool;

// Read Users
exports.read = (req, res) => {

    // Get a connection from the connection pool.
    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).send('An error occurred');
            return;
        }

        // Execute a SQL query to fetch all user data.
        connection.query('SELECT * FROM Users ', (err, results) => {
            // Once the query is done and results returned, release 
            // the database connection
            connection.release();

            if (err) {
                console.error('An error occurred while executing the query', err);
                res.status(500).send('An error occurred');
            } else {
                // Pass the fetched user data to the view.
                res.render('users', { users: results });
            }
        });
    });
};

// Search users
exports.search = (req, res) => {

    // Get a connection from the connection pool.
    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).send('An error occurred');
            return;
        }

        // Create a SQL query to fetch user data that matches the search query.
        const query = 'SELECT * FROM Users WHERE username LIKE ?';
        const queryData = ['%' + req.query.q + '%'];

        connection.query(query, queryData, (err, results) => {
            // Once the query is done and results returned, release 
            // the database connection
            connection.release();

            if (err) {
                console.error('An error occurred while executing the query', err);
                res.status(500).send('An error occurred');
            } else {
                // Pass the fetched user data to the view.
                res.render('users', { users: results });
            }
        });
    });
};

// CREATE User
exports.create = (req, res) => {
    const { username, email, password } = req.body; // extract user details from request body

    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).send('An error occurred');
            return;
        }

        connection.query('INSERT INTO Users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password], (err, results) => {
                connection.release();

                if (err) {
                    console.error('An error occurred while executing the query', err);
                    res.status(500).send('An error occurred');
                } else {
                    res.send('User successfully created!');
                }
            });
    });
};


exports.update = (req, res) => {
    const { id, username, email, password } = req.body; // example fields

    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).send('An error occurred');
            return;
        }

        connection.query('UPDATE Users SET username = ?, email = ?, password = ? WHERE userID = ?', [username, email, password, id], (err, results) => {
            connection.release();

            if (err) {
                console.error('An error occurred while executing the query', err);
                res.status(500).send('An error occurred');
            } else {
                res.send('User successfully updated!');
            }
        });
    });
};



// DELETE User
exports.delete = (req, res) => {
    const { userID } = req.body; // example fields

    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).send('An error occurred');
            return;
        }

        connection.query('DELETE FROM Users WHERE id = ?', [userID], (err, results) => {
            connection.release();

            if (err) {
                console.error('An error occurred while executing the query', err);
                res.status(500).send('An error occurred');
            } else {
                res.send('User successfully deleted!');
            }
        });
    });
};

