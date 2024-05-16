document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Toggle the active class on the navigation menu when the hamburger is clicked
    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    const form = document.getElementById('contactForm');

    // Add event listener for form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting traditionally

        let hasError = false; // Flag to indicate whether an error exists

        // Check each required input field in the form
        document.querySelectorAll('#contactForm input[required], #contactForm textarea[required]').forEach(input => {
            if (!input.value.trim()) { // If the input is required but empty
                alert(`Please fill out the ${input.name} field.`); // Alert the user
                input.style.borderColor = 'red'; // Optional: Highlight the unfilled field
                hasError = true; // Set the error flag
            } else {
                input.style.borderColor = 'initial'; // Reset the border color if filled
            }
        });

        if (!hasError) {
            // If no errors were found, you can proceed to process the form
            alert('Thank you for your submission! We will get back to you soon.');
            form.reset(); // Reset the form after submission
        }
    });
});
