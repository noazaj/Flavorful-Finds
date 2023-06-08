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
        const query = 'SELECT * FROM Recipes WHERE name LIKE ?';
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

// Create Equipment
exports.create = (req, res) => {
    const { title, description, dietary_restriction, instructions, prep_time, cook_time, serving } = req.body; // extract recipe details from request body
  
    db.getConnection((err, connection) => {
      	if (err) {
        	console.error('An error occurred while getting the connection', err);
        	res.status(500).json({ success: false, message: 'An error occurred' });
        	return;
      	}
  
      	connection.query('INSERT INTO Recipes (title, description, dietary_restriction, instructions, prep_time, cook_time, serving) VALUES (?, ?, ?, ?, ?, ?, ?)',
        	[title, description, dietary_restriction, instructions, prep_time, cook_time, serving], (err, results) => {
          		connection.release();
  
          		if (err) {
            		console.error('An error occurred while executing the query', err);
            		res.status(500).json({ success: false, message: 'An error occurred while creating the recipe.' });
          		} else {
            		res.status(200).json({ success: true, message: 'Recipe successfully created!' });
          	}
        });
    });
};