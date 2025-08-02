// js/contact.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) {
    console.error("❌ No form with id='contactForm' found.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Build FormData from the form
    const fd = new FormData(form);

    // DEBUG: log every key/value pair
    console.log("📝 Raw FormData entries:");
    for (const [key, val] of fd.entries()) {
      console.log(`   ${key}:`, `"${val}"`);
    }

    // Extract and trim values for our four fields
    const payload = {
      name: (fd.get("name") || "").toString().trim(),
      email: (fd.get("email") || "").toString().trim(),
      phone: (fd.get("phone") || "").toString().trim(),
      message: (fd.get("message") || "").toString().trim(),
    };

    console.log("📬 Trimmed payload:", payload);

    // 1) Empty‐field validation
    if (!payload.name) {
      alert("Please fill in the **Name** field.");
      form.querySelector('[name="name"]').focus();
      return;
    }
    if (!payload.email) {
      alert("Please fill in the **Email** field.");
      form.querySelector('[name="email"]').focus();
      return;
    }
    if (!payload.phone) {
      alert("Please fill in the **Phone** field.");
      form.querySelector('[name="phone"]').focus();
      return;
    }
    if (!payload.message) {
      alert("Please fill in the **Message** field.");
      form.querySelector('[name="message"]').focus();
      return;
    }

    // 2) Simple email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(payload.email)) {
      alert("Please enter a valid email address (e.g. yourname@example.com).");
      form.querySelector('[name="email"]').focus();
      return;
    }

    // 3) Send to server
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      console.log("📨 Server response:", result);

      if (!response.ok) {
        throw new Error(result.error || "Submission failed");
      }

      alert("Thank you! Your message has been sent.");
      form.reset();
    } catch (err) {
      console.error("❌ Contact submission error:", err);
      alert(err.message);
    }
  });
});
