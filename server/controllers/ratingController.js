// MySQL database connection
const db = require('../../db-connector').pool;

// Read Ratings
exports.read = (req, res) => {

    // Get a connection from the connection pool.
    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).send('An error occurred');
            return;
        }

        // Execute a SQL query to fetch all user data.
        connection.query('SELECT * FROM Ratings ', (err, results) => {
            // Once the query is done and results returned, release 
            // the database connection
            connection.release();

            if (err) {
                console.error('An error occurred while executing the query', err);
                res.status(500).send('An error occurred');
            } else {
                // Pass the fetched user data to the view.
                res.render('ratings', { ratings: results });
            }
        });
    });
};

// Search Ratings
exports.search = (req, res) => {

    // Get a connection from the connection pool.
    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).send('An error occurred');
            return;
        }

        // Create a SQL query to fetch user data that matches the search query.
        const query = 'SELECT * FROM Ratings WHERE rating LIKE ?';
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
                res.render('ratings', { ratings: results });
            }
        });
    });
};

// Create Ratings
exports.create = (req, res) => {
    const { rating, review, userID, recipeID } = req.body;

    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).json({ success: false, message: 'An error occurred' });
            return;
        }

        // Check if user exists
        connection.query('SELECT * FROM Users WHERE userID = ?', [userID], (err, userResults) => {
            if (err) {
                console.error('An error occurred while executing the query', err);
                res.status(500).json({ success: false, message: 'An error occurred while checking the user.' });
                return;
            }

            if (userResults.length == 0) {
                // No user found with the given userID, so release connection and return an error message
                connection.release();
                res.status(400).json({ success: false, message: 'User not found.' });
                return;
            }

            // Check if recipe exists
            connection.query('SELECT * FROM Recipes WHERE recipeID = ?', [recipeID], (err, recipeResults) => {
                if (err) {
                    console.error('An error occurred while executing the query', err);
                    res.status(500).json({ success: false, message: 'An error occurred while checking the recipe.' });
                    return;
                }

                if (recipeResults.length == 0) {
                    // No recipe found with the given recipeID, so release connection and return an error message
                    connection.release();
                    res.status(400).json({ success: false, message: 'Recipe not found.' });
                    return;
                }

                // If user and recipe exist, proceed with creating the rating
                connection.query('INSERT INTO Ratings (rating, review, userID, recipeID) VALUES (?, ?, ?, ?)',
                    [rating, review, userID, recipeID], (err, results) => {
                        connection.release();

                        if (err) {
                            console.error('An error occurred while executing the query', err);
                            res.status(500).json({ success: false, message: 'An error occurred while creating the rating.' });
                        } else {
                            res.status(200).json({ success: true, message: 'Rating successfully created!' });
                        }
                    });
            });
        });
    });
};

// Update Rating
exports.update = (req, res) => {
    const { rating, review, ratingID } = req.body;

    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).json({ success: false, message: 'An error occurred' });
            return;
        }

        connection.query('UPDATE Ratings SET rating = ?, review = ? WHERE ratingID = ?',
            [rating, review, ratingID], (err, results) => {
                    connection.release();

                if (err) {
                    console.error('An error occurred while executing the query', err);
                    res.status(500).json({ success: false, message: 'An error occurred while updating the rating.' });
                } else {
                    res.status(200).json({ success: true, message: 'Rating successfully updated!' });
                }
            });
    });
};

// Delete Rating
exports.delete = (req, res) => {
    const ratingID = req.body.id;

    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).json({ success: false, message: 'An error occurred' });
            return;
        }

        connection.query('DELETE FROM Ratings WHERE ratingID = ?',
            [ratingID], (err, results) => {
                connection.release();

                if (err) {
                    console.error('An error occurred while executing the query', err);
                    res.status(500).json({ success: false, message: 'An error occurred while deleting the rating.' });
                } else {
                    res.status(200).json({ success: true, message: 'Rating successfully deleted!' });
            }
        });
    });
};