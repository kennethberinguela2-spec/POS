
// ======================================
// KLYQ GROCERY POS
// REGISTER AND LOGIN SYSTEM
// ======================================


// ======================================
// GET USERS
// ======================================

function getUsers() {
    try {
        const users = JSON.parse(localStorage.getItem("gps_users"));
        return Array.isArray(users) ? users : [];
    } catch (error) {
        return [];
    }
}


// ======================================
// SHOW LOGIN FORM
// ======================================

function showLogin() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
        loginForm.reset();
        loginForm.classList.remove("hidden");
    }

    if (registerForm) {
        registerForm.reset();
        registerForm.classList.add("hidden");
    }
}


// ======================================
// SHOW REGISTER FORM
// ======================================

function showRegister() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
        loginForm.classList.add("hidden");
    }

    if (registerForm) {
        registerForm.reset();
        registerForm.classList.remove("hidden");
    }
}


// ======================================
// REGISTER
// ======================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const users = getUsers();

        const name = document.getElementById("regName")?.value.trim();
        const username = document.getElementById("regUser")?.value.trim();
        const email = document.getElementById("regEmail")?.value.trim().toLowerCase();
        const password = document.getElementById("regPass")?.value;

        if (!name || !username || !email || !password) {
            alert("Please complete all fields!");
            return;
        }

        const existingUser = users.find(user =>
            (user.username || "").toLowerCase() === username.toLowerCase() ||
            (user.email || "").toLowerCase() === email
        );

        if (existingUser) {
            alert("Username or email already exists!");
            return;
        }

        const newUser = {
            id: Date.now(),
            name: name,
            username: username,
            email: email,
            password: password,
            role: users.length === 0 ? "Admin" : "Cashier"
        };

        users.push(newUser);

        localStorage.setItem("gps_users", JSON.stringify(users));

        alert("Registration successful! You can now login.");

        registerForm.reset();

        window.location.href = "login.html";

    });

}


// ======================================
// LOGIN
// ======================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const users = getUsers();

        const identity = document.getElementById("loginIdentity")?.value.trim().toLowerCase();
        const password = document.getElementById("loginPass")?.value;
        const selectedRole = document.getElementById("loginRole")?.value;

        if (!identity || !password || !selectedRole) {
            alert("Please complete all login fields!");
            return;
        }

        const user = users.find(u => {

            const username = (u.username || "").toLowerCase();
            const email = (u.email || "").toLowerCase();

            return (
                (username === identity || email === identity) &&
                u.password === password &&
                u.role === selectedRole
            );

        });

        if (!user) {
            alert("Invalid username/email, password, or selected role!");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("Welcome, " + user.name + "!");

        if (user.role === "Admin") {
            window.location.href = "admin.html";
        } else if (user.role === "Cashier") {
            window.location.href = "user.html";
        }

    });

}


// ======================================
// LOGOUT
// ======================================

function logout() {

    if (!confirm("Are you sure you want to logout?")) {
        return;
    }

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";

}


// ======================================
// GET CURRENT USER
// ======================================

function getCurrentUser() {

    try {
        return JSON.parse(localStorage.getItem("currentUser"));
    } catch (error) {
        return null;
    }

}
