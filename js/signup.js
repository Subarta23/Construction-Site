document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("signupForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        firstName: e.target.firstName.value.trim(),
        lastName: e.target.lastName.value.trim(),
        mobile: e.target.mobile.value.trim(),
        address: e.target.address.value.trim(),
        username: e.target.username.value.trim(),
        password: e.target.password.value,
      };
      const resp = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await resp.json();
      if (resp.ok) {
        window.location.href = "/html/home.html";
      } else {
        alert(result.error || "Signup failed");
      }
    });
});
