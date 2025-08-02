document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/me")
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then(() => loadBookings())
    .catch(() => (window.location.href = "/html/signin.html"));

  document
    .getElementById("bookingForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = {
        name: e.target.name.value.trim(),
        email: e.target.email.value.trim(),
        phone: e.target.phone.value.trim(),
        projectType: e.target.projectType.value,
        message: e.target.message.value.trim(),
      };
      const resp = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) {
        const { error } = await resp.json();
        return alert(error || "Booking failed");
      }
      const bk = await resp.json();
      prependRow(bk);
      e.target.reset();
    });

  async function loadBookings() {
    const resp = await fetch("/api/bookings");
    const list = await resp.json();
    list.forEach(prependRow);
  }

  function prependRow(bk) {
    const tbody = document.querySelector("#bookingTable tbody");
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${bk.id}</td>
      <td>${bk.projectType}</td>
      <td>${bk.name}</td>
      <td>${bk.email}</td>
      <td>${bk.phone}</td>
      <td>${bk.message}</td>
      <td>${new Date(bk.createdAt).toLocaleString()}</td>
    `;
    tbody.prepend(tr);
  }
});
