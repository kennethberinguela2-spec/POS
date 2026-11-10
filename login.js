
// REGISTER
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("gps_users")) || [];

    let name = document.getElementById("regName").value.trim();
    let username = document.getElementById("regUser").value.trim();
    let email = document.getElementById("regEmail").value.trim().toLowerCase();
    let password = document.getElementById("regPass").value;

    // Check required fields
    if (!name || !username || !email || !password) {
        alert("Please complete all fields.");
        return;
    }

    // Check duplicate username or email
    let existingUser = users.find(user =>
        user.username.toLowerCase() === username.toLowerCase() ||
        user.email.toLowerCase() === email
    );

    if (existingUser) {
        alert("Username or email already exists!");
        return;
    }

    // Create new cashier account
    let newUser = {
        name: name,
        username: username,
        email: email,
        password: password,
        role: "Cashier"
    };

    users.push(newUser);

    localStorage.setItem("gps_users", JSON.stringify(users));

    alert("Registration successful! You can now login.");

    document.getElementById("registerForm").reset();

    showLogin();
});


// LOGIN
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("gps_users")) || [];

    let identity = document.getElementById("loginIdentity").value.trim();
    let password = document.getElementById("loginPass").value;

    // Find account
    let user = users.find(u =>
        (u.username.toLowerCase() === identity.toLowerCase() ||
         u.email.toLowerCase() === identity.toLowerCase()) &&
        u.password === password
    );

    if (!user) {
        alert("Invalid username/email or password!");
        return;
    }

    // Save logged-in user
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Welcome, " + user.name + "!");

    // Continue to dashboard
    start();
});
