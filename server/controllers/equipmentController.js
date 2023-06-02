// MySQL database connection
const db = require('../../db-connector').pool;

// Read Equipment
exports.read = (req, res) => {

    // Get a connection from the connection pool.
    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).send('An error occurred');
            return;
        }

        // Execute a SQL query to fetch all user data.
        connection.query('SELECT * FROM Equipment ', (err, results) => {
            // Once the query is done and results returned, release 
            // the database connection
            connection.release();

            if (err) {
                console.error('An error occurred while executing the query', err);
                res.status(500).send('An error occurred');
            } else {
                // Pass the fetched user data to the view.
                res.render('equipment', { equipment: results });
            }
        });
    });
};

// Search Equipment
exports.search = (req, res) => {

    // Get a connection from the connection pool.
    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).send('An error occurred');
            return;
        }

        // Create a SQL query to fetch user data that matches the search query.
        const query = 'SELECT * FROM Equipment WHERE name LIKE ?';
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
                res.render('equipment', { equipment: results });
            }
        });
    });
};

// Create Equipment
exports.create = (req, res) => {
    const { name, description } = req.body; // extract equipment details from request body
  
    db.getConnection((err, connection) => {
      	if (err) {
        	console.error('An error occurred while getting the connection', err);
        	res.status(500).json({ success: false, message: 'An error occurred' });
        	return;
      	}
  
      	connection.query('INSERT INTO Equipment (name, description) VALUES (?, ?)',
        	[name, description], (err, results) => {
          		connection.release();
  
          		if (err) {
            		console.error('An error occurred while executing the query', err);
            		res.status(500).json({ success: false, message: 'An error occurred while creating the equipment.' });
          		} else {
            		res.status(200).json({ success: true, message: 'Equipment successfully created!' });
          	}
        });
    });
};

// Update Equipment
exports.update = (req, res) => {
    const { id, name, description } = req.body;

    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).json({ success: false, message: 'An error occurred' });
            return;
        }

        connection.query('UPDATE Equipment SET name = ?, description = ? WHERE equipmentID = ?',
            [name, description, id], (err, results) => {
                connection.release();

                if (err) {
                    console.error('An error occurred while executing the query', err);
                    res.status(500).json({ success: false, message: 'An error occurred while updating the equipment.' });
                } else {
                    res.status(200).json({ success: true, message: 'Equipment successfully updated!' });
            }
        });
    });
};

// Delete Equipment
exports.delete = (req, res) => {
    const id = req.body.id;

    db.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while getting the connection', err);
            res.status(500).json({ success: false, message: 'An error occurred' });
            return;
        }

        connection.query('DELETE FROM Equipment WHERE equipmentID = ?',
            [id], (err, results) => {
                connection.release();

                if (err) {
                    console.error('An error occurred while executing the query', err);
                    res.status(500).json({ success: false, message: 'An error occurred while deleting the equipment.' });
                } else {
                    res.status(200).json({ success: true, message: 'Equipment successfully deleted!' });
            }
        });
    });
};