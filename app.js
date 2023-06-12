// SETUP
const express   = require('express');       // We are using the express library for the web server
const app       = express();                // We need to instantiate an express object to interact with the server in our code
const PORT      = 3030;                     // Set a port number at the top so it's easy to change in the future

// ROUTES
const userRoutes = require('./server/routes/user');
const indexRoutes = require('./server/routes/index');
const ingredientRoutes = require('./server/routes/ingredient');
const equipmentRoutes = require('./server/routes/equipment');
const recipeRoutes = require('./server/routes/recipe');
const ratingRoutes = require('./server/routes/rating');

// HANDLEBARS
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
app.engine('hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');

// BODY PARSING and JSON MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

// Use for page navigation, searchs, and submissions
app.use('/', indexRoutes);

// Routes for Recipes
app.use('/recipes', recipeRoutes);
app.use('/recipes/search', recipeRoutes);
app.use('/recipes/create', recipeRoutes);
app.use('/recipes/update', recipeRoutes);
app.use('/recipes/delete', recipeRoutes);

// Routes for Users
app.use('/users', userRoutes);
app.use('/users/search', userRoutes);
app.use('/users/create', userRoutes);
app.use('/users/update', userRoutes);
app.use('/users/delete', userRoutes);

// Routes for Ingredients
app.use('/ingredients', ingredientRoutes);
app.use('/ingredients/search', ingredientRoutes);
app.use('/ingredients/create', ingredientRoutes);
app.use('/ingredients/update', ingredientRoutes);
app.use('/ingredients/delete', ingredientRoutes);

// Routes for Equipment
app.use('/equipment', equipmentRoutes);
app.use('/equipment/search', equipmentRoutes);
app.use('/equipment/create', equipmentRoutes);
app.use('/equipment/update', equipmentRoutes);
app.use('/equipment/delete', equipmentRoutes);

// Routes for Ratings
app.use('/ratings', ratingRoutes);
app.use('/ratings/search', ratingRoutes);
app.use('/ratings/create', ratingRoutes);
app.use('/equipment/update', ratingRoutes);
app.use('/equipment/delete', ratingRoutes);



// Use static files if not found in routes
app.use(express.static('public'));

// LISTENER
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});