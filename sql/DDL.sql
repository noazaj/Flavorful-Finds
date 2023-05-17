-- CREATE DATABASE FlavorfulFinds;

-- Beginning configuration before running script
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Drop any/all tables if current in the database
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Recipes;
DROP TABLE IF EXISTS Equipment;
DROP TABLE IF EXISTS Ingredients;
DROP TABLE IF EXISTS Ratings;
DROP TABLE IF EXISTS Recipe_has_Equipment;
DROP TABLE IF EXISTS Recipe_has_Ingredients;


-- Create Users table with 3 attributes
CREATE TABLE Users (
    userID    int NOT NULL AUTO_INCREMENT,
    username  varchar(50) UNIQUE NOT NULL,
    email     varchar(255) UNIQUE NOT NULL,
    password  varchar(255) NOT NULL,
    PRIMARY KEY (userID)
);

-- Create Recipes table 8 attributes
CREATE TABLE Recipes (
    recipeID            int NOT NULL AUTO_INCREMENT,
    title               varchar(255) UNIQUE NOT NULL,
    description         text NOT NULL,
    dietary_restriction text,
    instruction         text NOT NULL,
    prep_time           int NOT NULL,
    cook_time           int NOT NULL,
    serving             int,
    userID              int NOT NULL,
    PRIMARY KEY (recipeID),
    FOREIGN KEY (userID) REFERENCES Users(userID) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Create Equipment table with 3 attributes
CREATE TABLE Equipment (
    equipmentID int NOT NULL AUTO_INCREMENT,
    name        varchar(255) UNIQUE NOT NULL,
    description text,
    PRIMARY KEY (equipmentID)
);

-- Create Ingredients table 2 attributes
CREATE TABLE Ingredients (
    ingredientID    int NOT NULL AUTO_INCREMENT,
    name            varchar(255) UNIQUE NOT NULL,
    category        varchar(255) NOT NULL,
    PRIMARY KEY (ingredientID)
);

-- Create Ratings table
CREATE TABLE Ratings (
    ratingID int NOT NULL AUTO_INCREMENT,
    rating   int NOT NULL,
    review   text,
    userID   int NOT NULL,
    recipeID int NOT NULL,
    PRIMARY KEY (ratingID),
    FOREIGN KEY (userID) REFERENCES Users(userID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (recipeID) REFERENCES Recipes(recipeID) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Create intersection table (Recipe_has_Equipment)
CREATE TABLE Recipe_has_Equipment (
    recipeEquipmentID   int UNIQUE NOT NULL AUTO_INCREMENT,
    recipeID            int,
    equipmentID         int,
    PRIMARY KEY (recipeEquipmentID),
    FOREIGN KEY (recipeID) REFERENCES Recipes(recipeID) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (equipmentID) REFERENCES Equipment(equipmentID) ON UPDATE CASCADE ON DELETE SET NULL
);

-- Create intersection table (Recipe_has_Ingredients)
CREATE TABLE Recipe_has_Ingredients (
    recipeIngredientID  int UNIQUE NOT NULL AUTO_INCREMENT,
    recipeID            int,
    ingredientID        int,
    PRIMARY KEY (recipeIngredientID),
    FOREIGN KEY (recipeID) REFERENCES Recipes(recipeID) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (ingredientID) REFERENCES Ingredients(ingredientID) ON UPDATE CASCADE ON DELETE SET NULL
);

-- Ending configuration for foreign keys
SET FOREIGN_KEY_CHECKS=1;

-- Insert sample data into Users table
INSERT INTO Users (username, email, password) VALUES
    ('John Doe', 'john.doe@email1.com', 'password123!?'),
    ('Jane Doe', 'jane.doe@yahoo.com', 'Password123!@'),
    ('Mike Will', 'michaelw@gmail.com', 'VeryStrongPassword00$'),
    ('Peter Parker', 'peterpark@outlook.com', 'SpiderMan1!'),
    ('Patrick Star', 'patrick.star@proton.com', 'BikiniBottom321?!');

-- Insert sample data into Recipes table
INSERT INTO Recipes (title, description, dietary_restriction, instruction, prep_time, cook_time, serving, userID) VALUES
    ('Spaghetti with Meat sauce', 'Classic spaghetti with spicy meat sauce', NULL, 'Cook the spaghetti according to package instructions...', 15, 30, 4, 1),
    ('Homemade Ramen', 'Tasty, homemade ramen with a thai twist!', 'Gluten-free', 'Start by getting gluten-free flour...', 20, 20, 4, 2),
    ('Grilled Cheese Sandwich', 'Simple and quick grilled cheese sandwich', NULL, 'Butter one side of each bread slice...', 5, 10, 1, 3),
    ('Chicken Caesar Salad', 'A healthy and tasty Caesar salad', NULL, 'Wash greens before setting into bowl...', 15, 15, 4, 4),
    ('Chocolate Chip Cookies', 'Classic chocolate chip cookies', NULL, 'Preheat oven to 350°F (175°C)...', 15, 10, 24, 5);

-- Insert sample data into Equipment table
INSERT INTO Equipment (name, description) VALUES
    ('Knife', 'A sharp kitchen knife for slicing and mincing'),
    ('Saucepan', 'A medium-sized saucepan for cooking'),
    ('Wok', 'A non-stick wok for all your stir fry and ramen'),
    ('Mixing Bowl', 'A large mixing bowl for combining ingredients'),
    ('Oven', 'A standard kitchen oven for baking and roasting');

-- Insert sample data into Ingredients table
INSERT INTO Ingredients (name, category) VALUES
    ('Spaghetti', 'Pasta'),
    ('Ground Beef', 'Meat'),
    ('Tomato', 'Vegetable'),
    ('Onion', 'Vegetable'),
    ('Garlic', 'Vegetable'),
    ('Noodles', 'Pasta'),
    ('Bell Pepper', 'Vegetable'),
    ('Soy Sauce', 'Condiment'),
    ('Vegetable Oil', 'Oil'),
    ('Bread', 'Bakery'),
    ('Cheese', 'Dairy'),
    ('Butter', 'Dairy'),
    ('Chicken', 'Meat'),
    ('Lettuce', 'Vegetable'),
    ('Caesar Dressing', 'Condiment'),
    ('Parmesan Cheese', 'Dairy'),
    ('Flour', 'Bakery'),
    ('Sugar', 'Baking'),
    ('Chocolate Chips', 'Baking');

-- Insert sample data into Ratings table
INSERT INTO Ratings (rating, review, userID, recipeID) VALUES
    (5, 'Delicious and easy to make!', 3, 1),
    (4, 'Tasty, but could use more garlic with noodles.', 5, 2),
    (3, 'Good for a quick meal, but nothing special.', 1, 3),
    (5, 'My new favorite salad recipe!', 2, 4),
    (4, 'Great cookies, but I prefer them softer.', 4, 5);

-- Insert sample data into first intersection table
INSERT INTO Recipe_has_Equipment (recipeID, equipmentID) VALUES
    (1, 1), (1, 2), (1, 5), -- Spaghetti with meat sauce requires Knife, Saucepan, and Oven
    (2, 1), (2, 3),         
    (3, 1), (3, 4), (3, 5), 
    (4, 1), (4, 3),         
    (5, 1), (5, 4), (5, 5); 

-- Insert sample data into second intersection table
INSERT INTO Recipe_has_Ingredients (recipeID, ingredientID) VALUES
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), -- Spaghetti with meat sauce requires Spaghetti, Ground Beef, Tomato, Onion, and Garlic
    (2, 6), (2, 7), (2, 8), (2, 9),         
    (3, 10), (3, 11), (3, 12),              
    (4, 13), (4, 14), (4, 15), (4, 16),     
    (5, 17), (5, 18), (5, 12), (5, 19);     

COMMIT;


