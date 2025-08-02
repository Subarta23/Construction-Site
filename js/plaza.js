document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const name = form.elements["name"].value.trim();
      const email = form.elements["email"].value.trim();
      const phone = form.elements["phone"].value.trim();
  
      if (name === "") {
        alert("Please enter your name.");
        return;
      }
  
      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
  
      if (!validatePhone(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }
  
      // If all is valid
      alert("Thank you! Your message has been received.");
      form.reset();
    });
  
    function validateEmail(email) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    }
  
    function validatePhone(phone) {
      const pattern = /^[0-9]{10}$/;
      return pattern.test(phone);
    }
  });
  