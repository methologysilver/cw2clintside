
// BOOK NOW BUTTON ANIMATION
// When user clicks "Book Now", it smoothly scrolls
// to the "How It Works" section


document.getElementById("bookBtn").addEventListener("click", function () {
    document.getElementById("steps").scrollIntoView({
        behavior: "smooth"
    });
});


// LOGIN BUTTON (PLACEHOLDER)
// Shows an alert since login feature is not implemented yet


document.getElementById("loginBtn").addEventListener("click", function () {
    alert("Login feature coming soon!");
});


// SEARCH FUNCTIONALITY
// Filters doctor cards based on specialty and location input


document.getElementById("searchBtn").addEventListener("click", function () {

    // Get user input values
    const specialtyInput = document.querySelector('.search-box input[placeholder="Specialty (e.g. Dentist)"]').value.toLowerCase();
    const locationInput = document.querySelector('.search-box input[placeholder="Location"]').value.toLowerCase();

    // Loop through all doctor cards and filter them
    doctorCards.forEach(card => {
        const cardSpecialty = card.dataset.specialty.toLowerCase();
        const cardLocation = card.dataset.location.toLowerCase();

        // Check if card matches search criteria
        let matchSpecialty = specialtyInput === "" || cardSpecialty.includes(specialtyInput);
        let matchLocation = locationInput === "" || cardLocation.includes(locationInput);

        // Show or hide card based on match
        if (matchSpecialty && matchLocation) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    // Scroll automatically to doctors section after search
    document.getElementById("doctors").scrollIntoView({
        behavior: "smooth"
    });
});


// DOCTOR CARDS AND FILTER SYSTEM
// Handles filtering doctors by specialty buttons


const doctorCards = document.querySelectorAll(".doctor-card");
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove("active"));

        // Add active class to clicked button
        btn.classList.add("active");

        const specialty = btn.dataset.specialty;

        // Show/hide doctor cards based on selected specialty
        doctorCards.forEach(card => {

            if (specialty === "all") {
                card.style.display = "block";
            } else {
                if (card.dataset.specialty === specialty) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            }

        });

    });
});


// CONTACT FORM HANDLING
// Validates form, stores messages in localStorage,
// and shows success message


document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent page reload

    // Get form values
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    // Validate inputs
    if (!name || !email || !message) {
        alert("Please fill all fields.");
        return;
    }

    // Create contact message object
    const contactData = {
        name,
        email,
        message,
        date: new Date().toLocaleString()
    };

    // Retrieve existing messages from localStorage
    let messages = JSON.parse(localStorage.getItem("messages")) || [];

    // Add new message
    messages.push(contactData);

    // Save back to localStorage
    localStorage.setItem("messages", JSON.stringify(messages));

    // Show success message
    document.getElementById("contactSuccess").style.display = "block";

    // Reset form fields
    document.getElementById("contactForm").reset();
});