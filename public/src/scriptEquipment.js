/*************************************** */
//            EQUIPMENT
/************************************** */

// Get the modal and buttons
const addEquipmentModal = document.getElementById("add-equipment-model");
const addEquipmentBtn = document.getElementById("add-equipment-button");
const cancelAddEquipmentBtn = document.getElementById("cancel-add-equipment-button");
const equipmentForm = document.getElementById("add-equipment-form");
const equipmentNameInput = document.getElementById("add-equipment-name");
const equipmentDescriptionInput = document.getElementById("add-equipment-description");

// When the user clicks the "Add Equipment" button, open the add equipment modal
addEquipmentBtn.onclick = () => {
	addEquipmentModal.style.display = "block";
};

// When the user clicks on the "Cancel" button in the add equipment modal, close the modal
cancelAddEquipmentBtn.onclick = () => {
	addEquipmentModal.style.display = "none";
};

// Handle form submission for creating equipment
const addEquipmentForm = document.getElementById('add-equipment-form');

if (addEquipmentForm) {
	addEquipmentForm.addEventListener('submit', (event) => {
		event.preventDefault(); // Prevent the form from submitting normally

		// Extract the form data
		const name = document.getElementById('add-equipment-name').value;
		const description = document.getElementById('add-equipment-description').value;

		// Create a data object to send in the request body
		var data = { name: name, description: description };

		// Send an AJAX POST request to create the equipment
		fetch('/equipment/create', {
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
					throw new Error('An error occurred while creating equipment. Try again.');
				}
			})
			.then((data) => {
				if (data.success) {
					location.reload(); // Reload the page to show the updated equipment
				} else {
					alert('Failed to create equipment: ' + data.message);
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
		var equipmentId = this.getAttribute("data-equipmentid");
		var equipmentName = document.getElementById("equipment-name-" + equipmentId).textContent;
		var equipmentDescription = document.getElementById("equipment-description-" + equipmentId).textContent;

		// Populate the update ingredient form with the current ingredient details
		document.getElementById("update-equipment-id").value = equipmentId;
		document.getElementById("update-equipment-name").value = equipmentName;
		document.getElementById("update-equipment-description").value = equipmentDescription;

		// Show the update ingredient modal
		document.getElementById("update-equipment-model").style.display = "block";
	});
}

// Handle form submission for updating an ingredient
const updateEquipmentForm = document.getElementById('update-equipment-form');
updateEquipmentForm.addEventListener('submit', function (event) {
	event.preventDefault();

	const id = document.getElementById('update-equipment-id').value;
	const name = document.getElementById('update-equipment-name').value;
	const description = document.getElementById('update-equipment-description').value;

	var data = { id: id, name: name, description: description };

	// Send an AJAX POST request to update the equipment
	fetch('/equipment/update', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.success) {
				location.reload(); // Reload the page to show the updated equipment
			} else {
				alert('Failed to update equipment: ' + data.message);
			}
		})
		.catch((error) => {
			alert('Failed to update equipment: ' + error.message);
		});
});

// Get all delete buttons
const deleteButtons = document.querySelectorAll(".del-button");

// Loop through the delete buttons and add a click event listener to each
for (var i = 0; i < deleteButtons.length; i++) {
	deleteButtons[i].addEventListener("click", function () {
		var equipmentId = this.getAttribute("data-equipmentid");

		if (confirm('Are you sure you want to delete this equipment?')) {
			// Send an AJAX POST request to delete the ingredient
			fetch('/equipment/delete', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: equipmentId }),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.success) {
						location.reload(); // Reload the page to show the updated equipment
					} else {
						alert('Failed to delete equipment: ' + data.message);
					}
				})
				.catch((error) => {
					alert('Failed to delete equipment: ' + error.message);
			});
		}
	});
}