// REGISTER
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("gps_users")) || [];

    let name = document.getElementById("regName").value;
    let username = document.getElementById("regUser").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPass").value;

    let existingUser = users.find(user =>
        user.username === username || user.email === email
    );

    if (existingUser) {
        alert("Username or email already exists!");
        return;
    }

    let newUser = {
        name: name,
        username: username,
        email: email,
        password: password,
        role: users.length === 0 ? "Admin" : "Cashier"
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

    let identity = document.getElementById("loginIdentity").value;
    let password = document.getElementById("loginPass").value;

    let user = users.find(u =>
        (u.username === identity || u.email === identity) &&
        u.password === password
    );

    if (!user) {
        alert("Invalid username/email or password!");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Welcome, " + user.name + "!");

    start();
});