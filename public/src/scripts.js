// Get the modal and buttons
var addUserModal = document.getElementById("add-user-model");
var updateUserModal = document.getElementById("update-user-model");
var addUserBtn = document.getElementById("add-user-button");
var cancelAddUserBtn = document.getElementById("cancel-button");
var cancelUpdateUserBtn = document.getElementById("cancel-update-button");
var editButtons = document.getElementsByClassName("edit-button");
var deleteButtons = document.getElementsByClassName("del-button");

// When the user clicks the "Add User" button, open the add user modal
addUserBtn.onclick = () => {
  addUserModal.style.display = "block";
};

// When the user clicks on the "Cancel" button in the add user modal, close the modal
cancelAddUserBtn.onclick = function () {
  addUserModal.style.display = "none";
};

// When the user clicks on the "Cancel" button in the update user modal, close the modal
cancelUpdateUserBtn.onclick = function () {
  updateUserModal.style.display = "none";
};

// When the user clicks anywhere outside of the modals, close them
window.onclick = function (event) {
  if (event.target == addUserModal || event.target == updateUserModal) {
    addUserModal.style.display = "none";
    updateUserModal.style.display = "none";
  }
};

// Loop through the edit buttons and add a click event listener to each
for (var i = 0; i < editButtons.length; i++) {
  editButtons[i].addEventListener("click", function () {
    var userId = this.getAttribute("data-userid");
    openUpdateUserModal(userId);
  });
}

// Loop through the delete buttons and add a click event listener to each
for (var i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener("click", function () {
    var userId = this.getAttribute("data-userid");
    deleteUser(userId);
  });
}

function openUpdateUserModal(userId) {
  // Get the user data from the table
  var username = document.getElementById("username-" + userId).innerText;
  var email = document.getElementById("email-" + userId).innerText;
  var password = document.getElementById("password-" + userId).innerText;

  // Set the pre-filled data in the update user form
  document.getElementById("update-user-id").value = userId;
  document.getElementById("update-user-username").value = username; // Update this line
  document.getElementById("update-user-email").value = email;
  document.getElementById("update-user-password").value = password;

  // Display the update user modal
  updateUserModal.style.display = "block";
}

function deleteUser(userId) {
  if (confirm("Are you sure you want to delete this user?")) {
    // Create a form element
    var form = document.createElement("form");
    form.method = "POST";
    form.action = "/users/delete";

    // Create an input element for the user ID
    var userIdInput = document.createElement("input");
    userIdInput.type = "hidden";
    userIdInput.name = "id";
    userIdInput.value = userId;

    // Append the input element to the form
    form.appendChild(userIdInput);

    // Append the form to the document and submit it
    document.body.appendChild(form);
    form.submit();
  }
}
