document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const creds = {
      username: e.target.username.value.trim(),
      password: e.target.password.value,
    };
    const resp = await fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds),
    });
    const result = await resp.json();
    if (resp.ok) {
      window.location.href = "/html/home.html";
    } else {
      alert(result.error || "Login failed");
    }
  });
});
