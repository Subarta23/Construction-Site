document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
        });
    });

    // Form validation
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = form.querySelector('input[type="text"]');
        const email = form.querySelector('input[type="email"]');
        const phone = form.querySelector('input[type="tel"]');

        if (!name.value.trim()) {
            alert("Please enter your name.");
            return;
        }
        if (!validateEmail(email.value)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (!validatePhone(phone.value)) {
            alert("Please enter a valid phone number.");
            return;
        }

        alert("Thank you! We will contact you soon.");
        form.reset();
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    // Phone number validation function (supports international formats)
    function validatePhone(phone) {
        const re = /^\+?\d{7,15}$/;
        return re.test(phone);
    }

    // Scroll animations for sections
    const sections = document.querySelectorAll("section");
    const options = { threshold: 0.2, rootMargin: "0px 0px -100px 0px" };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});