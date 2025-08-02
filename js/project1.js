document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scroll for Navigation
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
        });
    });

    // Image Lightbox Effect
    const images = document.querySelectorAll(".gallery-grid img");
    images.forEach(img => {
        img.addEventListener("click", function () {
            const lightbox = document.createElement("div");
            lightbox.id = "lightbox";
            lightbox.style.position = "fixed";
            lightbox.style.top = "0";
            lightbox.style.left = "0";
            lightbox.style.width = "100%";
            lightbox.style.height = "100%";
            lightbox.style.background = "rgba(0, 0, 0, 0.8)";
            lightbox.style.display = "flex";
            lightbox.style.alignItems = "center";
            lightbox.style.justifyContent = "center";
            lightbox.style.zIndex = "1000";

            const fullImage = document.createElement("img");
            fullImage.src = this.src;
            fullImage.style.maxWidth = "90%";
            fullImage.style.maxHeight = "90%";
            fullImage.style.borderRadius = "10px";

            lightbox.appendChild(fullImage);
            document.body.appendChild(lightbox);

            lightbox.addEventListener("click", function () {
                lightbox.remove();
            });
        });
    });

    // Contact Form Validation
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let name = document.querySelector("input[placeholder='Your Name']").value;
        let email = document.querySelector("input[placeholder='Your Email']").value;
        let phone = document.querySelector("input[placeholder='Phone Number']").value;

        if (name.trim() === "" || email.trim() === "" || phone.trim() === "") {
            alert("Please fill in all fields before submitting.");
        } else if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
        } else if (!validatePhone(phone)) {
            alert("Please enter a valid phone number.");
        } else {
            alert("Thank you! We will contact you soon.");
            form.reset();
        }
    });

    // Email Validation
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Phone Number Validation (10-digit numbers)
    function validatePhone(phone) {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(phone);
    }

    // Button Animations
    document.querySelectorAll(".cta-btn").forEach(button => {
        button.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.1)";
            this.style.transition = "transform 0.3s ease";
        });
        button.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
        });
    });

    // Additional Feature: Auto Scroll to Sections on Load (if needed)
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }, 500);
        }
    }
});