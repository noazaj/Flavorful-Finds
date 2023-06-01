// Get the modal and buttons
var addIngredientModal = document.getElementById("add-ingredient-model");
var addIngredientBtn = document.getElementById("add-ingredient-button");
var cancelAddIngredientBtn = document.getElementById("cancel-button");
var ingredientForm = document.getElementById("add-ingredient-form");
var ingredientNameInput = document.getElementById("ingredient-name");
var ingredientCategoryInput = document.getElementById("ingredient-category");

// When the user clicks the "Add Ingredient" button, open the add ingredient modal
addIngredientBtn.onclick = () => {
    addIngredientModal.style.display = "block";
};

// When the user clicks on the "Cancel" button in the add ingredient modal, close the modal
cancelAddIngredientBtn.onclick = function () {
    addIngredientModal.style.display = "none";
};

// Handle form submission for creating an ingredient
const addIngredientForm = document.getElementById('add-ingredient-form');

if (addIngredientForm) {
  addIngredientForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    // Extract the form data
    const name = document.getElementById('ingredient-name').value;
    const category = document.getElementById('ingredient-category').value;

    // Create a data object to send in the request body
    var data = { name: name, category: category };
    console.log('Name:', name);
    console.log('Category:', category);

    // Send an AJAX POST request to create the ingredient
    fetch('/ingredients/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('An error occurred while creating the ingredient. Try again.');
        }
      })
      .then((data) => {
        if (data.success) {
          location.reload(); // Reload the page to show the updated ingredients
        } else {
          alert('Failed to create ingredient: ' + data.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

/************************************************************************************************************************ */

// Get all edit buttons
const editButtons = document.querySelectorAll(".edit-button");

// Loop through the edit buttons and add a click event listener to each
for (let i = 0; i < editButtons.length; i++) {
  editButtons[i].addEventListener("click", function () {
    var ingredientId = this.getAttribute("data-ingredientid");
    var ingredientName = document.getElementById("ingredient-name-" + ingredientId).textContent;
    var ingredientCategory = document.getElementById("ingredient-category-" + ingredientId).textContent;

    // Populate the update ingredient form with the current ingredient details
    document.getElementById("update-ingredient-id").value = ingredientId;
    document.getElementById("update-ingredient-name").value = ingredientName;
    document.getElementById("update-ingredient-category").value = ingredientCategory;

    // Show the update ingredient modal
    document.getElementById("update-ingredient-model").style.display = "block";
  });
}

// Handle form submission for updating an ingredient
const updateIngredientForm = document.getElementById('update-ingredient-form');
updateIngredientForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const id = document.getElementById('update-ingredient-id').value;
  const name = document.getElementById('update-ingredient-name').value;
  const category = document.getElementById('update-ingredient-category').value;

  var data = { id: id, name: name, category: category };

  // Send an AJAX POST request to update the ingredient
  fetch('/ingredients/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      location.reload(); // Reload the page to show the updated ingredients
    } else {
      alert('Failed to update ingredient: ' + data.message);
    }
  })
  .catch((error) => {
    alert('Failed to update ingredient: ' + error.message);
  });
});

// Get all delete buttons
const deleteButtons = document.querySelectorAll(".del-button");

// Loop through the delete buttons and add a click event listener to each
for (var i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener("click", function () {
    var ingredientId = this.getAttribute("data-ingredientid");

    if(confirm('Are you sure you want to delete this ingredient?')) {
      // Send an AJAX POST request to delete the ingredient
      fetch('/ingredients/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: ingredientId }),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          location.reload(); // Reload the page to show the updated ingredients
        } else {
          alert('Failed to delete ingredient: ' + data.message);
        }
      })
      .catch((error) => {
        alert('Failed to delete ingredient: ' + error.message);
      });
    }
  });
}