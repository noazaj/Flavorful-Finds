/*************************************** */
//              User
/************************************** */

// Get the modal and buttons
const addUserModal = document.getElementById("add-user-model");
const addUserBtn = document.getElementById("add-user-button");
const cancelAddUserBtn = document.getElementById("cancel-add-user-button");
const userForm = document.getElementById("add-user-form");
const userNameInput = document.getElementById("add-user-username");
const userEmailInput = document.getElementById("add-user-email");
const userPasswordInput = document.getElementById("add-user-password");

// When the user clicks the "Add User" button, open the add user modal
addUserBtn.onclick = () => {
	addUserModal.style.display = "block";
};

// When the user clicks on the "Cancel" button in the add user modal, close the modal
cancelAddUserBtn.onclick = () => {
	addUserModal.style.display = "none";
};

// Handle form submission for creating equipment
const addUserForm = document.getElementById('add-user-form');

if (addUserForm) {
	addUserForm.addEventListener('submit', (event) => {
		event.preventDefault(); // Prevent the form from submitting normally

		// Extract the form data
		const name = document.getElementById('add-user-username').value;
		const email = document.getElementById('add-user-email').value;
        const password = document.getElementById('add-user-password').value;

		// Create a data object to send in the request body
		var data = { username: name, email: email, password: password };

		// Send an AJAX POST request to create the user
		fetch('/users/create', {
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
					throw new Error('An error occurred while creating user. Try again.');
				}
			})
			.then((data) => {
				if (data.success) {
					location.reload(); // Reload the page to show the updated ingredients
				} else {
					alert('Failed to create user: ' + data.message);
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
		var userId = this.getAttribute("data-userid");
		var userName = document.getElementById("user-username-" + userId).textContent;
		var userEmail = document.getElementById("user-email-" + userId).textContent;
        var userPassword = document.getElementById("user-password-" + userId).textContent;

		// Populate the update ingredient form with the current user details
		document.getElementById("update-user-id").value = userId;
		document.getElementById("update-user-username").value = userName;
		document.getElementById("update-user-email").value = userEmail;
        document.getElementById("update-user-password").value = userPassword;

		// Show the update user modal
		document.getElementById("update-user-model").style.display = "block";
	});
}

// Handle form submission for updating an ingredient
const updateUserForm = document.getElementById('update-user-form');
updateUserForm.addEventListener('submit', function (event) {
	event.preventDefault();

	const id = document.getElementById('update-user-id').value;
	const username = document.getElementById('update-user-username').value;
	const email = document.getElementById('update-user-email').value;
    const password = document.getElementById('update-user-password').value;

	var data = { id: id, username: username, email: email, password: password };

	// Send an AJAX POST request to update the user
	fetch('/users/update', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.success) {
				location.reload(); // Reload the page to show the updated user
			} else {
				alert('Failed to update user: ' + data.message);
			}
		})
		.catch((error) => {
			alert('Failed to update user: ' + error.message);
		});
});

// Get all delete buttons
const deleteButtons = document.querySelectorAll(".del-button");

// Loop through the delete buttons and add a click event listener to each
for (var i = 0; i < deleteButtons.length; i++) {
	deleteButtons[i].addEventListener("click", function () {
		var userId = this.getAttribute("data-userid");

		if (confirm('Are you sure you want to delete this user?')) {
			// Send an AJAX POST request to delete the ingredient
			fetch('/users/delete', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: userId }),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.success) {
						location.reload(); // Reload the page to show the updated users
					} else {
						alert('Failed to delete user: ' + data.message);
					}
				})
				.catch((error) => {
					alert('Failed to delete user: ' + error.message);
			});
		}
	});
}