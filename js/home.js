// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Auto Slide Projects Slider
const slider = document.querySelector('.slider-container');

let scrollAmount = 0;
const slideTimer = setInterval(() => {
  if (slider.scrollWidth - slider.clientWidth === scrollAmount) {
    scrollAmount = 0;
  } else {
    scrollAmount += 310; // (300px width + 10px gap)
  }
  slider.scrollTo({
    top: 0,
    left: scrollAmount,
    behavior: 'smooth'
  });
}, 3000); // Slides every 3 seconds

// Fade In On Scroll
document.addEventListener("DOMContentLoaded", function() {
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.2,
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('show');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});
let currentSlideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));
  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

function nextSlide() {
  currentSlideIndex++;
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  }
  showSlide(currentSlideIndex);
}

function currentSlide(index) {
  currentSlideIndex = index;
  showSlide(currentSlideIndex);
}

setInterval(nextSlide, 3000); // Change slide every 3 seconds

function logout() {
    // Show success popup using alert or SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      text: 'You have been successfully logged out!',
      showConfirmButton: false,
      timer: 2000
    });
  
    // Redirect after a short delay
    setTimeout(function () {
      window.location.href = "/HTML/signin.html"; // replace with your login/home page
    }, 2000);
  }
  

// Form Validation Functions
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validatePhone(phone) {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
}

function validateForm(form) {
    const name = form.querySelector("input[placeholder='Your Name'], input[placeholder='Full Name']").value;
    const email = form.querySelector("input[placeholder='Your Email'], input[placeholder='Email Address']").value;
    const phone = form.querySelector("input[placeholder='Phone Number']").value;
    const details = form.querySelector("textarea[placeholder='Project Details']");

    if (
        name.trim() === "" ||
        email.trim() === "" ||
        phone.trim() === "" ||
        (details && details.value.trim() === "")
    ) {
        alert("Please fill in all required fields.");
        return false;
    } else if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    } else if (!validatePhone(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }
    return true;
}

// Handle Quote Form Submit
const quoteForm = document.querySelector("#quoteForm");
if (quoteForm) {
    quoteForm.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateForm(quoteForm)) {
            alert("Thank you! We'll send you a quote shortly.");
            quoteForm.reset();
        }
    });
}

// Button hover animation
document.querySelectorAll(".cta-btn").forEach(button => {
    button.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.1)";
        this.style.transition = "transform 0.3s ease";
    });
    button.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
    });
});

// Hero heading animation on load
window.addEventListener('load', () => {
    const heroHeading = document.querySelector('.hero h1');
    if (heroHeading) {
        heroHeading.style.opacity = 0;
        heroHeading.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            heroHeading.style.transition = 'all 1s ease';
            heroHeading.style.opacity = 1;
            heroHeading.style.transform = 'translateY(0)';
        }, 300);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = form.querySelector('input[type="text"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const phone = form.querySelector('input[placeholder="Phone Number"]').value.trim();
        const message = form.querySelector('textarea').value.trim();

        if (!name || !email || !phone || !message) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Form',
                text: 'Please fill in all fields.',
            });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address.',
            });
            return;
        }

        const phonePattern = /^\d+$/;
        if (!phonePattern.test(phone)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Phone Number',
                text: 'Phone number should contain only digits.',
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Message submitted successfully!',
        });

        form.reset();
    });
});


