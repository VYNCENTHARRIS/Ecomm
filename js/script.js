// Initialize an empty object to store the items added to the cart
let cart = {};

// Event listener that ensures the script runs after the entire HTML document has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get the container where products will be dynamically displayed
    const productsContainer = document.getElementById('products-container');

    // Fetch product data from the JSON file located in the 'data' directory
    fetch('data/products.json')
        .then(response => response.json()) // Parse the response to JSON
        .then(data => {
            // Loop through each product in the fetched data array
            data.forEach(product => {
                // Create a new div element for each product and assign class 'product' for styling
                const productElement = document.createElement('div');
                productElement.className = 'product';
                // Set HTML content for the product, including image, name, description, price, and an input field for quantity
                // Also includes a 'Buy Now' button which calls addToCart function when clicked
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="price">${product.price}</p>
                    <input type="number" id="quantity-${product.id}" min="1" value="1" class="quantity-input">
                    <button class="button" onclick="addToCart('${product.id}', document.getElementById('quantity-${product.id}').value)">Buy Now</button>
                `;
                // Append the new product div to the container for display
                productsContainer.appendChild(productElement);
            });
        })
        .catch(error => console.error('Error loading the products:', error)); // Log any errors that occur during the fetching process

    // Define addToCart function which updates the cart state and displays the cart item count
    window.addToCart = function (productId, quantity) {
        quantity = parseInt(quantity); // Convert the input quantity to an integer to ensure accurate calculations
        if (cart[productId]) {
            cart[productId] += quantity; // If the product is already in the cart, increase the quantity
        } else {
            cart[productId] = quantity; // Otherwise, add the new product with its quantity to the cart
        }
        updateCartCount(); // Update the display of the cart count
        showMobileAlert(); // Call the function to show an alert on mobile devices
    };

    // Function to update the cart count displayed in the cart icon
    function updateCartCount() {
        const cartCount = Object.values(cart).reduce((acc, cur) => acc + cur, 0); // Sum up all quantities in the cart
        document.getElementById('cart-count').textContent = cartCount; // Update the text content of the cart count element
    }

    // Function to show an alert specifically for mobile users when they add an item to the cart
    function showMobileAlert() {
        if (window.innerWidth <= 768) { // Check if the screen width is 768 pixels or less, typical for mobile devices
            alert('Your items have been added to the cart!'); // Display an alert message
        }
    }
});
