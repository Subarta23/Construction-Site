function validateLogin() {
    const adminId = document.getElementById('adminId').value.trim();
    const adminPassword = document.getElementById('adminPassword').value;
  
    const validId = "admin123";
    const validPassword = "Build@2025";
  
    if (adminId === validId && adminPassword === validPassword) {
      alert("Login Successful!");
      
      // You can redirect to dashboard page here
      window.location.href = "admin_dashboard.html";
      return false;
    } else {
      alert("Invalid Admin ID or Password!");
      return false;
    }
  }
  