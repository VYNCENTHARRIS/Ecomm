document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Toggle the active class on the navigation menu when the hamburger is clicked
    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    // Select the carousel's track where all product images will be displayed.
    const track = document.querySelector('.carousel-track');

    // Fetch product data from a local JSON file.
    fetch('data/products.json')
        .then(response => response.json()) // Parse the JSON response.
        .then(products => {
            // Iterate over the first seven products from the JSON data.
            products.slice(0, 7).forEach(product => {
                // Construct HTML for each product using template literals.
                const productHTML = `
                    <div class="product">
                        <a href="products.html">
                            <img src="${product.image}" alt="${product.name}" style="width: 100%;">
                            <p>${product.name}</p>
                            <p>${product.price}</p>
                        </a>
                    </div>
                `;
                // Append each product's HTML to the carousel track.
                track.innerHTML += productHTML;
            });
        });

    // Define a function to move the carousel left or right.
    function moveSlide(direction) {
        let scrollAmount = 0; // Initialize scroll amount to track how much the carousel has scrolled.
        // Set an interval to perform the scroll movement.
        const slideTimer = setInterval(() => {
            // Will scroll the carousel track left or right by adjusting the scrollLeft property.
            track.scrollLeft += direction * 10; // Move by 10 pixels each interval; adjust this value for faster or slower movement.
            scrollAmount += 10; // Keep track of the total scrolled distance.
            // Stop scrolling once we've scrolled 100 pixels.
            if (scrollAmount >= 100) { // This limits the scroll action to 100 pixels per arrow click.
                clearInterval(slideTimer); // Clear the interval to stop further scrolling.
            }
        }, 25); // Run this interval every 25 milliseconds. Adjust this value for different speeds.
    }

    // Attach event listeners to arrow elements for carousel navigation.
    document.querySelector('.prev').addEventListener('click', () => moveSlide(-1)); // Move left
    document.querySelector('.next').addEventListener('click', () => moveSlide(1)); // Move right
});
