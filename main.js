function handleInput() {
    const inputField = document.getElementById('universal-input');
    const searchCategory = document.getElementById('search-category');

    const inputValue = inputField.value;
    const categoryValue = searchCategory.value;

    // Send a GET request to the /search route with the search term and category as query parameters
    fetch('/search?term=' + encodeURIComponent(inputValue) + '&category=' + encodeURIComponent(categoryValue))
        .then(response => response.json())
        .then(data => {
            // Handle the data returned by the server
            console.log(data);
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
}

export {handleInput}