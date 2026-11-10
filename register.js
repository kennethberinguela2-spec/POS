
// ======================================
// KLYQ GROCERY POS
// REGISTRATION SYSTEM
// ======================================

// REGISTER ACCOUNT
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(e) {

        e.preventDefault();

        // GET EXISTING USERS
        let users = [];

        try {
            users = JSON.parse(localStorage.getItem("gps_users")) || [];
        } catch (error) {
            users = [];
        }

        // GET INPUT VALUES
        const name = document.getElementById("regName").value.trim();
        const username = document.getElementById("regUser").value.trim();
        const email = document.getElementById("regEmail").value.trim().toLowerCase();
        const password = document.getElementById("regPass").value;
        const confirmPassword = document.getElementById("regConfirmPass").value;

        // CHECK EMPTY FIELDS
        if (!name || !username || !email || !password || !confirmPassword) {
            alert("Please complete all fields!");
            return;
        }

        // CHECK PASSWORD LENGTH
        if (password.length < 6) {
            alert("Password must be at least 6 characters!");
            return;
        }

        // CHECK PASSWORD CONFIRMATION
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // CHECK EXISTING USERNAME OR EMAIL
        const existingUser = users.find(user =>
            (user.username || "").toLowerCase() === username.toLowerCase() ||
            (user.email || "").toLowerCase() === email
        );

        if (existingUser) {
            alert("Username or email already exists!");
            return;
        }

        // AUTOMATIC ROLE ASSIGNMENT
        const assignedRole = users.length === 0 ? "Admin" : "Cashier";

        // CREATE NEW ACCOUNT
        const newUser = {
            id: Date.now(),
            name: name,
            username: username,
            email: email,
            password: password,
            role: assignedRole
        };

        // SAVE ACCOUNT
        users.push(newUser);

        localStorage.setItem("gps_users", JSON.stringify(users));

        // SUCCESS MESSAGE
        alert(
            "Registration successful!\n" +
            "Welcome, " + name + "!\n" +
            "Assigned Role: " + assignedRole
        );

        // RESET FORM
        registerForm.reset();

        // REDIRECT TO LOGIN
        window.location.href = "login.html";

    });

}


// ======================================
// BACK TO LOGIN
// ======================================

function showLogin() {
    window.location.href = "login.html";
}
