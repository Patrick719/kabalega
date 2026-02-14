// js/script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector(".hamburger");
    const navList = document.querySelector(".nav-list");

    hamburger.addEventListener("click", () => {
        navList.classList.toggle("active");
        // Animate hamburger menu
        hamburger.classList.toggle("active");
    });

    // --- Form Handling ---
    // We will use a generic handler for both forms
    function handleFormSubmit(formId, responseMessageId) {
        const form = document.getElementById(formId);
        const responseDiv = document.getElementById(responseMessageId);

        if (form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent default form submission (page reload)

                // Simple client-side validation
                const formData = new FormData(form);
                let isValid = true;
                for (let [key, value] of formData.entries()) {
                    if (value.trim() === '' && form.querySelector(`[name="${key}"]`).hasAttribute('required')) {
                        isValid = false;
                        break;
                    }
                }

                if (isValid) {
                    // In a real application, you would send the data to a PHP script here using fetch()
                    // For this demo, we'll simulate a successful submission.
                    
                    /*
                    // --- REAL PHP INTEGRATION CODE ---
                    fetch('php/process-application.php', { // or process-alumni.php
                        method: 'POST',
                        body: formData
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            responseDiv.textContent = data.message;
                            responseDiv.className = 'form-response success';
                        } else {
                            responseDiv.textContent = data.message;
                            responseDiv.className = 'form-response error';
                        }
                        responseDiv.style.display = 'block';
                        form.style.display = 'none';
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        responseDiv.textContent = 'An unexpected error occurred. Please try again.';
                        responseDiv.className = 'form-response error';
                        responseDiv.style.display = 'block';
                    });
                    */

                    // --- SIMULATION FOR DEMO ---
                    console.log('Form Submitted! Data:', Object.fromEntries(formData));
                    responseDiv.textContent = 'Thank you! Your submission was received successfully. We will get back to you soon.';
                    responseDiv.className = 'form-response success';
                    responseDiv.style.display = 'block';
                    form.style.display = 'none';

                } else {
                    responseDiv.textContent = 'Please fill in all required fields.';
                    responseDiv.className = 'form-response error';
                    responseDiv.style.display = 'block';
                }
            });
        }
    }

    // Initialize handlers for both forms
    handleFormSubmit('application-form', 'application-response');
    handleFormSubmit('alumni-form', 'alumni-response');
});

// --- Add this to your js/script.js file ---

document.addEventListener('DOMContentLoaded', function () {
    let slideIndex = 1;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(n) {
        let slides = document.getElementsByClassName("slide");
        let dots = document.getElementsByClassName("dot");

        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }

        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }

        // Remove "active" class from all dots
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }

        // Show the current slide and highlight the current dot
        slides[slideIndex - 1].classList.add('active');
        dots[slideIndex - 1].classList.add('active');
    }

    // Function to change slide by n (next or previous)
    window.changeSlide = function (n) {
        clearInterval(slideInterval); // Stop auto-play on manual change
        slideIndex += n;
        showSlide(slideIndex);
        startAutoSlide(); // Restart auto-play
    }

    // Function to go to a specific slide from a dot click
    window.currentSlide = function (n) {
        clearInterval(slideInterval); // Stop auto-play on manual change
        slideIndex = n;
        showSlide(slideIndex);
        startAutoSlide(); // Restart auto-play
    }

    // Function to start the automatic slideshow
    function startAutoSlide() {
        slideInterval = setInterval(function() {
            slideIndex++;
            showSlide(slideIndex);
        }, 5000); // Change slide every 5 seconds
    }

    // Initialize the slideshow
    showSlide(slideIndex);
    startAutoSlide();

    // Optional: Pause slideshow on hover
    const heroSection = document.querySelector('.hero-slideshow');
    heroSection.addEventListener('mouseover', () => clearInterval(slideInterval));
    heroSection.addEventListener('mouseout', startAutoSlide);
});