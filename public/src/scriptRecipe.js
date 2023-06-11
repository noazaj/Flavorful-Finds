/*************************************** */
//            RECIPES
/************************************** */

// Get the modal and buttons
const addRecipeModal = document.getElementById("add-recipe-model");
const addRecipeBtn = document.getElementById("add-recipe-button");
const cancelAddRecipeBtn = document.getElementById("cancel-add-recipe-button");
const recipeForm = document.getElementById("add-recipe-form");
const recipeTitleInput = document.getElementById("add-recipe-title");
const recipeDietaryInput = document.getElementById("add-recipe-dietary_restriction");
const recipeInstructionInput = document.getElementById("add-recipe-instruction");
const recipePrepInput = document.getElementById("add-recipe-prep_time");
const recipeCookInput = document.getElementById("add-recipe-cook_time");
const recipeServingInput = document.getElementById("add-recipe-serving");
const recipeUserIDInput = document.getElementById("add-recipe-userID");

// When the user clicks the "Add Recipe" button, open the add equipment modal
addRecipeBtn.onclick = () => {
	addRecipeModal.style.display = "block";
};

// When the user clicks on the "Cancel" button in the add equipment modal, close the modal
cancelAddRecipeBtn.onclick = () => {
	addRecipeModal.style.display = "none";
};

// Handle form submission for creating equipment
const addRecipeForm = document.getElementById('add-recipe-form');

if (addRecipeForm) {
	addRecipeForm.addEventListener('submit', (event) => {
		event.preventDefault(); // Prevent the form from submitting normally

		// Extract the form data
		const title = document.getElementById('add-recipe-title').value;
		const description = document.getElementById('add-recipe-description').value;
		const dietary_restriction = document.getElementById('add-recipe-dietary_restriction').value;
		const instruction = document.getElementById('add-recipe-instruction').value;
		const prep_time = document.getElementById('add-recipe-prep_time').value;
		const cook_time = document.getElementById('add-recipe-cook_time').value;
		const serving = document.getElementById('add-recipe-serving').value;
        const userID = document.getElementById('add-recipe-userID').value;

        // Create a data object to send in the request body
		var data = { title: title, description: description, dietary_restriction: dietary_restriction, 
            instruction: instruction, prep_time: prep_time, cook_time: cook_time, serving: serving, userID: userID };

		// Send an AJAX POST request to create the equipment
		fetch('/recipes/create', {
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
					throw new Error('An error occurred while creating recipe. Try again.');
				}
			})
			.then((data) => {
				if (data.success) {
					location.reload(); // Reload the page to show the updated recipes
				} else {
					alert('Failed to create recipe: ' + data.message);
				}
			})
			.catch((error) => {
				alert(error.message);
			});
	});
}

// Get all edit buttons
const editButtons = document.querySelectorAll(".edit-button");

// Loop through the edit buttons and add a click event listener to each
for (let i = 0; i < editButtons.length; i++) {
	editButtons[i].addEventListener("click", function () {
		var recipeId = this.getAttribute("data-recipeid");
        var recipeTitle = document.getElementById("recipe-title-" + recipeId).textContent;
		var recipeDescription = document.getElementById("recipe-description-" + recipeId).textContent;
		var recipeDietaryRestriction = document.getElementById("recipe-dietary_restriction-" + recipeId).textContent;
		var recipeInstruction = document.getElementById("recipe-instruction-" + recipeId).textContent;
		var recipePrepTime = document.getElementById("recipe-prep_time-" + recipeId).textContent;
		var recipeCookTime = document.getElementById("recipe-cook_time-" + recipeId).textContent;
		var recipeServing = document.getElementById("recipe-serving-" + recipeId).textContent;

		// Populate the update ingredient form with the current ingredient details
		document.getElementById("update-recipe-id").value = recipeId;
		document.getElementById("update-recipe-title").value = recipeTitle;
		document.getElementById("update-recipe-description").value = recipeDescription;
        document.getElementById("update-recipe-dietary_restriction").value = recipeDietaryRestriction;
        document.getElementById("update-recipe-instruction").value = recipeInstruction;
        document.getElementById("update-recipe-prep_time").value = recipePrepTime;
        document.getElementById("update-recipe-cook_time").value = recipeCookTime;
        document.getElementById("update-recipe-serving").value = recipeServing;

		// Show the update ingredient modal
		document.getElementById("update-recipe-model").style.display = "block";
	});
}

// Handle form submission for updating an recipe
const updateRecipeForm = document.getElementById('update-recipe-form');
updateRecipeForm.addEventListener('submit', function (event) {
	event.preventDefault();

	const recipeID = document.getElementById('update-recipe-id').value;
        const title = document.getElementById('update-recipe-title').value;
        const description = document.getElementById('update-recipe-description').value;
        const dietary_restriction = document.getElementById('update-recipe-dietary_restriction').value;
        const instruction = document.getElementById('update-recipe-instruction').value;
        const prep_time = document.getElementById('update-recipe-prep_time').value;
        const cook_time = document.getElementById('update-recipe-cook_time').value;
        const serving = document.getElementById('update-recipe-serving').value;

        var data = { recipeID: recipeID, title: title, description: description, dietary_restriction: dietary_restriction, 
            instruction: instruction, prep_time: prep_time, cook_time: cook_time, serving: serving };

	// Send an AJAX POST request to update the equipment
	fetch('/recipes/update', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.success) {
				location.reload(); // Reload the page to show the updated recipe
			} else {
				alert('Failed to update recipe: ' + data.message);
			}
		})
		.catch((error) => {
			alert('Failed to update recipe: ' + error.message);
		});
});

// Get all delete buttons
const deleteButtons = document.querySelectorAll(".del-button");

// Loop through the delete buttons and add a click event listener to each
for (var i = 0; i < deleteButtons.length; i++) {
	deleteButtons[i].addEventListener("click", function () {
		var recipeId = this.getAttribute("data-recipeid");

		if (confirm('Are you sure you want to delete this recipe?')) {
			// Send an AJAX POST request to delete the ingredient
			fetch('/recipes/delete', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: recipeId }),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.success) {
						location.reload(); // Reload the page to show the updated recipes
					} else {
						alert('Failed to delete recipe: ' + data.message);
					}
				})
				.catch((error) => {
					alert('Failed to delete recipe: ' + error.message);
			});
		}
	});
}