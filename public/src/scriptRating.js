/*************************************** */
//            RATINGS
/************************************** */

// Get the modal and buttons
const addRatingModal = document.getElementById("add-rating-model");
const addRatingBtn = document.getElementById("add-rating-button");
const cancelAddRatingBtn = document.getElementById("cancel-add-rating-button");
const ratingForm = document.getElementById("add-rating-form");
const ratingNumInput = document.getElementById("add-rating-rating");
const ratingReviewInput = document.getElementById("add-rating-review");
const ratingUserIDInput = document.getElementById("add-rating-userID");
const ratingRecipeIDInput = document.getElementById("add-rating-recipeID");

// When the user clicks the "Add Rating" button, open the add equipment modal
addRatingBtn.onclick = () => {
    addRatingModal.style.display = "block";
};

// When the user clicks on the "Cancel" button in the add equipment modal, close the modal
cancelAddRatingBtn.onclick = () => {
    addRatingModal.style.display = "none";
};

// Handle form submission for creating a rating
const addRatingForm = document.getElementById('add-rating-form');

if (addRatingForm) {
    addRatingForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting normally

        // Extract the form data
        const rating = document.getElementById('add-rating-rating').value;
        const review = document.getElementById('add-rating-review').value;
        const userID = document.getElementById('add-rating-userID').value;
        const recipeID = document.getElementById('add-rating-recipeID').value;

        // Create a data object to send in the request body
        var data = { rating: rating, review: review, userID: userID, recipeID: recipeID }

        // Send an AJAX POST request to create the equipment
        fetch('/ratings/create', {
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
                    throw new Error('An error occurred while creating a rating. Try again.');
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
        var ratingId = this.getAttribute("data-ratingid");
        var ratingRating = document.getElementById("rating-rating-" + ratingId).textContent;
        var ratingReview = document.getElementById("rating-review-" + ratingId).textContent;

        // Populate the update ingredient form with the current ingredient details
        document.getElementById("update-rating-id").value = ratingId;
        document.getElementById("update-rating-rating").value = ratingRating;
        document.getElementById("update-rating-review").value = ratingReview;

        // Show the update ingredient modal
        document.getElementById("update-rating-model").style.display = "block";
    });
}

// Handle form submission for updating a rating
const updateRatingForm = document.getElementById('update-rating-form');
updateRatingForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const ratingID = document.getElementById('update-rating-id').value;
    const rating = document.getElementById('update-rating-rating').value;
    const review = document.getElementById('update-rating-review').value;

    var data = { rating: rating, review: review, ratingID: ratingID }

    // Send an AJAX POST request to update the rating
    fetch('/ratings/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                location.reload(); // Reload the page to show the updated ratings
            } else {
                alert('Failed to update rating: ' + data.message);
            }
        })
        .catch((error) => {
            alert('Failed to update rating: ' + error.message);
        });
});

// Get all delete buttons
const deleteButtons = document.querySelectorAll(".del-button");

// Loop through the delete buttons and add a click event listener to each
for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function () {
        var ratingId = this.getAttribute("data-ratingid");

        if (confirm('Are you sure you want to delete this rating?')) {
            // Send an AJAX POST request to delete the ingredient
            fetch('/ratings/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: ratingId }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        location.reload(); // Reload the page to show the updated ratings
                    } else {
                        alert('Failed to delete rating: ' + data.message);
                    }
                })
                .catch((error) => {
                    alert('Failed to delete rating: ' + error.message);
                });
        }
    });
}