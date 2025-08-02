const openBtn = document.getElementById("openInquiry");
const closeBtn = document.getElementById("closeInquiry");
const modal = document.getElementById("inquiryModal");

openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

document.getElementById("inquiryForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you! We'll contact you soon.");
  modal.style.display = "none";
});
