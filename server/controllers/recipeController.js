// MySQL database connection
const db = require('../../db-connector').pool;

// Read Recipes
exports.read = (req, res) => {

    // Get a connection from the connection pool.
    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).send('An error occurred');
            return;
        }

        // Execute a SQL query to fetch all user data.
        connection.query('SELECT * FROM Recipes ', (err, results) => {
            // Once the query is done and results returned, release 
            // the database connection
            connection.release();

            if (err) {
                console.error('An error occurred while executing the query', err);
                res.status(500).send('An error occurred');
            } else {
                // Pass the fetched user data to the view.
                res.render('recipes', { recipes: results });
            }
        });
    });
};

// Search Recipes
exports.search = (req, res) => {

    // Get a connection from the connection pool.
    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).send('An error occurred');
            return;
        }

        // Create a SQL query to fetch user data that matches the search query.
        const query = 'SELECT * FROM Recipes WHERE title LIKE ?';
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
                res.render('recipes', { recipes: results });
            }
        });
    });
};

exports.create = (req, res) => {
    const { title, description, dietary_restriction, instruction, prep_time, cook_time, serving, userID } = req.body;

    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).json({ success: false, message: 'An error occurred' });
            return;
        }

        // Check if user exists
        connection.query('SELECT * FROM Users WHERE userID = ?', [userID], (err, results) => {
            if (err) {
                console.error('An error occurred while executing the query', err);
                res.status(500).json({ success: false, message: 'An error occurred while checking the user.' });
                return;
            }

            if (results.length == 0) {
                // No user found with the given userID, so release connection and return an error message
                connection.release();
                res.status(400).json({ success: false, message: 'User not found.' });
                return;
            }

            // If user exists, proceed with creating the recipe
            connection.query('INSERT INTO Recipes (title, description, dietary_restriction, instruction, prep_time, cook_time, serving, userID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [title, description, dietary_restriction, instruction, prep_time, cook_time, serving, userID], (err, results) => {
                    connection.release();

                    if (err) {
                        console.error('An error occurred while executing the query', err);
                        res.status(500).json({ success: false, message: 'An error occurred while creating the recipe.' });
                    } else {
                        res.status(200).json({ success: true, message: 'Recipe successfully created!' });
                    }
                });
        });
    });
};

// Update Recipe
exports.update = (req, res) => {
    const { recipeID, title, description, dietary_restriction, instruction, prep_time, cook_time, serving, userID } = req.body;

    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).json({ success: false, message: 'An error occurred' });
            return;
        }

        connection.query('UPDATE Recipes SET title = ?, description = ?, dietary_restriction = ?, instruction = ?, prep_time = ?, cook_time = ?, serving = ? WHERE recipeID = ?',
            [title, description, dietary_restriction, instruction, prep_time, cook_time, serving, recipeID], (err, results) => {
                    connection.release();

                if (err) {
                    console.error('An error occurred while executing the query', err);
                    res.status(500).json({ success: false, message: 'An error occurred while updating the recipe.' });
                } else {
                    res.status(200).json({ success: true, message: 'Recipe successfully updated!' });
                }
            });
    });
};

// Delete Recipe
exports.delete = (req, res) => {
    const id = req.body.id;

    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).json({ success: false, message: 'An error occurred' });
            return;
        }

        connection.query('DELETE FROM Recipes WHERE recipeID = ?',
            [id], (err, results) => {
                connection.release();

                if (err) {
                    console.error('An error occurred while executing the query', err);
                    res.status(500).json({ success: false, message: 'An error occurred while deleting the recipe.' });
                } else {
                    res.status(200).json({ success: true, message: 'Recipe successfully deleted!' });
            }
        });
    });
};