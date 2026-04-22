function handleSignup(event) {
    // 1. Prevent the default form submission (page refresh)
    event.preventDefault();

    // 2. Capture the input elements
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // 3. Create a user object
    const userData = {
        name: fullName,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };

    try {
        // 4. Save the user data to local storage (using email as the key)
        localStorage.setItem(email, JSON.stringify(userData));

        localStorage.setItem('currentUserEmail', email);

        console.log("Registration successful for:", email);

        alert("Account created successfully! Redirecting to login...");
        
        window.location.href = 'login.html';

    } catch (error) {
        console.error("Error saving to local storage:", error);
        alert("There was an error creating your account. Please try again.");
    }
}

function handleLogin(event) {
    // 1. Prevent the page from refreshing on submit
    event.preventDefault();

    // 2. Get the input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 3. Look for the user in Local Storage using the email as the key
    const storedUserRaw = localStorage.getItem(email);

    // 4. Validation Logic
    if (!storedUserRaw) {
        alert("Account not found. Please sign up first.");
        return;
    }

    // Convert the string back into an Object
    const userData = JSON.parse(storedUserRaw);

    // 5. Check if password matches
    if (userData.password === password) {
        // --- LOGIN SUCCESS ---
        
        // Save the current session so the website knows who is logged in
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('activeUser', userData.name);

        alert(`Welcome back, ${userData.name}!`);

        // Redirect to your dashboard or home page
        window.location.href = 'dashbord.html'; 
    } else {

        alert("Incorrect password. Please try again.");
    }
}

function showForgotPassword() {
    alert("Functionality coming soon! Please check your local storage for your password.");
}
