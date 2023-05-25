// SETUP
const express   = require('express');       // We are using the express library for the web server
const app       = express();                // We need to instantiate an express object to interact with the server in our code
const PORT      = 7070;                     // Set a port number at the top so it's easy to change in the future

// ROUTES
const userRoutes = require('./server/routes/user');
const indexRoutes = require('./server/routes/index');

// HANDLEBARS
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
app.engine('hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');

// BODY PARSING MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));

// DATABASE
// MySQL database connection
const db = require('./db-connector.js')

// Use routes
app.use('/', indexRoutes);
app.use('/users', userRoutes);

// Use static files if not found in routes
app.use(express.static('public'));

// LISTENER
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});