document.addEventListener("DOMContentLoaded", () => {
  const authButtons = document.getElementById("authButtons");
  const userInfo = document.getElementById("userInfo");
  const usernameEl = document.getElementById("usernameDisplay");

  fetch("/api/me")
    .then((res) => {
      if (!res.ok) throw new Error("Not authenticated");
      return res.json();
    })
    .then((data) => {
      // Logged in
      authButtons.style.display = "none";
      usernameEl.textContent = data.username;
      userInfo.style.display = "flex"; // or 'block' per your CSS
    })
    .catch(() => {
      // Not logged in
      authButtons.style.display = "flex";
      userInfo.style.display = "none";
    });
});

function logout() {
  fetch("/api/logout", { method: "POST" })
    .then((res) => {
      if (!res.ok) throw new Error("Logout failed");
      // Redirect or reload to refresh UI
      window.location.href = "/html/home.html";
    })
    .catch((err) => {
      console.error(err);
      alert("Logout failed");
    });
}
