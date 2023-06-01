// MySQL database connection
const db = require('../../db-connector').pool;

// Read Ingredients
exports.read = (req, res) => {

    // Get a connection from the connection pool.
    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).send('An error occurred');
            return;
        }

        // Execute a SQL query to fetch all user data.
        connection.query('SELECT * FROM Ingredients ', (err, results) => {
            // Once the query is done and results returned, release 
            // the database connection
            connection.release();

            if (err) {
                console.error('An error occurred while executing the query', err);
                res.status(500).send('An error occurred');
            } else {
                // Pass the fetched user data to the view.
                res.render('ingredients', { ingredients: results });
            }
        });
    });
};

// Search Ingredients
exports.search = (req, res) => {

    // Get a connection from the connection pool.
    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).send('An error occurred');
            return;
        }

        // Create a SQL query to fetch user data that matches the search query.
        const query = 'SELECT * FROM Ingredients WHERE name LIKE ?';
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
                res.render('ingredients', { ingredients: results });
            }
        });
    });
};

// Create Ingredient
exports.create = (req, res) => {
    const { name, category } = req.body; // extract ingredient details from request body
  
    db.getConnection((err, connection) => {
      	if (err) {
        	console.error('An error occurred while getting the connection', err);
        	res.status(500).json({ success: false, message: 'An error occurred' });
        	return;
      	}
  
      	connection.query('INSERT INTO Ingredients (name, category) VALUES (?, ?)',
        	[name, category], (err, results) => {
          		connection.release();
  
          		if (err) {
            		console.error('An error occurred while executing the query', err);
            		res.status(500).json({ success: false, message: 'An error occurred while creating the ingredient.' });
          		} else {
            		res.status(200).json({ success: true, message: 'Ingredient successfully created!' });
          	}
        });
    });
};

// Update Ingredient
exports.update = (req, res) => {
    const { id, name, category } = req.body;

    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).json({ success: false, message: 'An error occurred' });
            return;
        }

        connection.query('UPDATE Ingredients SET name = ?, category = ? WHERE ingredientID = ?',
            [name, category, id], (err, results) => {
                connection.release();

                if (err) {
                    console.error('An error occurred while executing the query', err);
                    res.status(500).json({ success: false, message: 'An error occurred while updating the ingredient.' });
                } else {
                    res.status(200).json({ success: true, message: 'Ingredient successfully updated!' });
            }
        });
    });
};

// Delete Ingredient
exports.delete = (req, res) => {
    const id = req.body.id;

    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).json({ success: false, message: 'An error occurred' });
            return;
        }

        connection.query('DELETE FROM Ingredients WHERE ingredientID = ?',
            [id], (err, results) => {
                connection.release();

                if (err) {
                    console.error('An error occurred while executing the query', err);
                    res.status(500).json({ success: false, message: 'An error occurred while deleting the ingredient.' });
                } else {
                    res.status(200).json({ success: true, message: 'Ingredient successfully deleted!' });
            }
        });
    });
};
