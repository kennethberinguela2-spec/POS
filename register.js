
const ADMIN_CODE = "KLYQ2026";

const roleSelect = document.getElementById("regRole");
const adminCodeContainer = document.getElementById("adminCodeContainer");
const adminCodeInput = document.getElementById("adminCode");

// Show Admin Code field only when Admin is selected
roleSelect.addEventListener("change", function () {
    if (this.value === "Admin") {
        adminCodeContainer.style.display = "block";
        adminCodeInput.required = true;
    } else {
        adminCodeContainer.style.display = "none";
        adminCodeInput.required = false;
        adminCodeInput.value = "";
    }
});

// REGISTER
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("gps_users")) || [];

    const name = document.getElementById("regName").value.trim();
    const username = document.getElementById("regUser").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPass").value;
    const confirmPassword = document.getElementById("regConfirmPass").value;
    const role = roleSelect.value;
    const enteredCode = adminCodeInput.value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (role === "Admin" && enteredCode !== ADMIN_CODE) {
        alert("Invalid Admin Access Code!");
        return;
    }

    if (!role) {
        alert("Please select a role!");
        return;
    }

    const duplicate = users.some(user =>
        user.username.toLowerCase() === username.toLowerCase() ||
        user.email.toLowerCase() === email.toLowerCase()
    );

    if (duplicate) {
        alert("Username or email already exists!");
        return;
    }

    const newUser = {
        id: Date.now(),
        name: name,
        username: username,
        email: email,
        password: password,
        role: role
    };

    users.push(newUser);

    localStorage.setItem("gps_users", JSON.stringify(users));

    alert("Account successfully created!");

    window.location.href = "login.html";
});

// LOGIN REDIRECT
function showLogin() {
    window.location.href = "login.html";
}
