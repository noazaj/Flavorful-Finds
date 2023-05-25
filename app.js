// SETUP
const express   = require('express');       // We are using the express library for the web server
const app       = express();                // We need to instantiate an express object to interact with the server in our code
const PORT      = 7070;                     // Set a port number at the top so it's easy to change in the future

// HANDLEBARS
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
// const { query } = require('express');
app.engine('hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');

// BODY PARSING MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));


// DATABASE
// MySQL database connection
const db = require('./db-connector.js')

// ROUTES
app.get('/', (req, res) => {
    // Render the index.hbs template
    res.render('index');
});


app.get('/users', function(req, res){
    // Query for returning Users
    let query1 = 'SELECT * FROM Users;';
    db.pool.query(query1, function(err, rows, fields){
        // Send the results to the browser
        if(err) {
            // Handle the error
            console.error(err);
            res.status(500).send('Internal server error');
        } else {
            // Render handlebars template with data
            res.render('users', { users: rows});
        }
    });
});

// Use static files if not found in routes
app.use(express.static('public'));

// LISTENER
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});