/*
    Users
*/

-- Insert a new user
INSERT INTO Users (username, email, password) VALUES (:usernameInput, :emailInput, :passwordInput);

-- Edit a user
UPDATE Users 
SET username = :usernameInput, email = :emailInput, password = :passwordInput
WHERE userID = :userIdInput;

-- Delete a user
DELETE FROM Users WHERE userID = :userIdInput;

-- Retrieve all users
SELECT * FROM Users;


/*
    Recipes
*/

-- Select all recipes sorted by recipeID
SELECT * FROM Recipes ORDER BY recipeID DESC;

-- Select the latest 5 recipes
SELECT * FROM Recipes ORDER BY recipeID DESC LIMIT 5;

-- Add recipe
INSERT INTO Recipes (title, description, dietary_restriction, instruction, prep_time, cook_time, serving, userID) 
VALUES (:titleInput, :descriptionInput, :dietaryRestrictionInput, :instructionInput, :prepTimeInput, :cookTimeInput, :servingInput, :userIdInput);

-- Edit recipe
UPDATE Recipes 
SET title = :titleInput, description = :descriptionInput, dietary_restriction = :dietaryRestrictionInput, instruction = :instructionInput, prep_time = :prepTimeInput, cook_time = :cookTimeInput, serving = :servingInput, userID = :userIdInput
WHERE recipeID = :recipeIdInput;

-- Delete recipe
DELETE FROM Recipes 
WHERE recipeID = :recipeIdInput;

/* 
    Equipment 
*/

-- List equipment
SELECT * FROM Equipment;

-- Add equipment
INSERT INTO Equipment (name, description) 
VALUES (:nameInput, :descriptionInput);

-- Edit equipment
UPDATE Equipment 
SET name = :nameInput, description = :descriptionInput
WHERE equipmentID = :equipmentIdInput;

-- Delete equipment
DELETE FROM Equipment 
WHERE equipmentID = :equipmentIdInput;

/*
    Ingredients
*/

-- List ingredients
SELECT * FROM Ingredients;

-- Create ingredient
INSERT INTO Ingredients (name, category) 
VALUES (:nameInput, :categoryInput);

-- Edit ingredient
UPDATE Ingredients 
SET name = :nameInput, category = :categoryInput
WHERE ingredientID = :ingredientIdInput;

-- Delete ingredient
DELETE FROM Ingredients 
WHERE ingredientID = :ingredientIdInput;

/*
    Ratings
*/

-- List ratings
SELECT * FROM Ratings;

-- Create rating
INSERT INTO Ratings (rating, review, userID, recipeID) 
VALUES (:ratingInput, :reviewInput, :userIdInput, :recipeIdInput);

-- Edit rating
UPDATE Ratings 
SET rating = :ratingInput, review = :reviewInput, userID = :userIdInput, recipeID = :recipeIdInput
WHERE ratingID = :ratingIdInput;

-- Delete rating
DELETE FROM Ratings 
WHERE ratingID = :ratingIdInput;

/*
    Recipe_has_Equipment
*/

-- List all recipe-equipment relations
SELECT * FROM Recipe_has_Equipment;

-- Create a new recipe-equipment relation
INSERT INTO Recipe_has_Equipment (recipeID, equipmentID)
VALUES (:recipeIdInput, :equipmentIdInput);

-- Delete a recipe-equipment relation
DELETE FROM Recipe_has_Equipment 
WHERE recipeID = :recipeIdInput AND equipmentID = :equipmentIdInput;

/*
    Recipe_has_Ingredients
*/

-- List all recipe-ingredient relations
SELECT * FROM Recipe_has_Ingredients;

-- Create a new recipe-ingredient relation
INSERT INTO Recipe_has_Ingredients (recipeID, ingredientID, quantity)
VALUES (:recipeIdInput, :ingredientIdInput, :quantityInput);

-- Edit a recipe-ingredient relation
UPDATE Recipe_has_Ingredients
SET quantity = :quantityInput
WHERE recipeID = :recipeIdInput AND ingredientID = :ingredientIdInput;

-- Delete a recipe-ingredient relation
DELETE FROM Recipe_has_Ingredients 
WHERE recipeID = :recipeIdInput AND ingredientID = :ingredientIdInput;

/* 
    Search
*/

-- Search recipes by title
SELECT * FROM Recipes WHERE title LIKE :searchInput;

-- Search recipes by prep time (less than a given value)
SELECT * FROM Recipes WHERE prep_time <= :searchInput;

-- Search recipes by user
SELECT * FROM Recipes INNER JOIN Users ON Recipes.userID = Users.userID WHERE Users.username LIKE :searchInput;

-- Search recipes by ingredients
SELECT * FROM Recipes INNER JOIN Recipe_has_Ingredients ON Recipes.recipeID = Recipe_has_Ingredients.recipeID 
INNER JOIN Ingredients ON Recipe_has_Ingredients.ingredientID = Ingredients.ingredientID 
WHERE Ingredients.name LIKE :searchInput;

-- Search equipment by name
SELECT * FROM Equipment WHERE name LIKE :searchInput;

-- Search ingredients by name or category
SELECT * FROM Ingredients WHERE name LIKE :searchInput OR category LIKE :searchInput;
