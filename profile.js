
// DOCTOR DATA OBJECT
// Stores all doctor information including name, specialty, images, biography, location, email, and phone number



const doctors = {
    fadi: {
        name: "Dr. Fadi Mansour",
        specialty: "Cardiologist",
        images: [
            "Fadi-Mansour/Fadi-Mansour-profile-pic.jpg",
            "Fadi-Mansour/Fadi-Mansour-pic-2.jpg",
            "Fadi-Mansour/Fadi-Mansour-pic-3.jpg"
        ],
        bio: "Experienced cardiologist with 15+ years.",
        location: "Leeds, UK",
        email: "fadi@email.com",
        phone: "+44 123 4567890"
    },

    amelie: {
        name: "Dr. Amélie Dubois",
        specialty: "Dermatologist",
        images: [
            "Amélie-Dubois/Amélie-Dubois-profile-pic.jpg",
            "Amélie-Dubois/Amélie-Dubois-pic-2.jpg",
        ],
        bio: "Specialist in dermatology and skin care with a focus on cosmetic treatments.",
        location: "London, UK",
        email: "amelie.dubois@email.com",
        phone: "+44 010 1112131"
    },

    olivia: {
        name: "Dr. Olivia Kim",
        specialty: "Neurologist",
        images: [
            "Olivia-Kim/Olivia-Kim-profile-pic.jpg",
            "Olivia-Kim/Olivia-Kim-pic-2.jpg",
        ],
        bio: "Expert in neurological disorders and brain health with 12+ years of experience.",
        location: "Manchester, UK",
        email: "olivia.kim@email.com",
        phone: "+44 141 5161718"
    },

    diego: {
        name: "Dr. Diego Martínez",
        specialty: "Orthopedic",
        images: [
            "Diego-Martínez/Diego-Martinez-profile-pic.jpg",
            "Diego-Martínez/Diego-martinez-pic-2.jpg",
        ],
        bio: "Orthopedic surgeon specializing in joints, fractures, and sports injuries.",
        location: "London, UK",
        email: "diego.martinez@email.com",
        phone: "+44 192 0212223"
    }
};


// GET DOCTOR FROM URL
// Reads the "doctor" parameter from the URL to determine
// which doctor's profile should be displayed


const params = new URLSearchParams(window.location.search);
const docKey = params.get("doctor");

const doc = doctors[docKey];


// DISPLAY DOCTOR DATA
// If doctor exists, populate HTML elements with their info


if (doc) {
    document.getElementById("docName").textContent = doc.name;
    document.getElementById("docSpec").textContent = doc.specialty;
    document.getElementById("docBio").textContent = doc.bio;
    document.getElementById("docLocation").textContent = doc.location;
    document.getElementById("docEmail").textContent = doc.email;
    document.getElementById("docPhone").textContent = doc.phone;

    // Load image gallery dynamically
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // clear previous content

    doc.images.forEach(img => {
        const image = document.createElement("img");
        image.src = img;
        gallery.appendChild(image);
    });

} else {
    // If doctor not found, show error message
    document.body.innerHTML = "<h2 style='text-align:center'>Doctor not found</h2>";
}


// BOOKING SYSTEM VARIABLES


let selectedSlot = null;


// SHOW BOOKING SECTION
// Displays booking form when user clicks "Book Appointment"


function book() {
    document.getElementById("bookingSection").style.display = "block";
}


// TIME SLOT SELECTION
// Allows user to select one available appointment time slot


const slots = document.querySelectorAll(".slot");

slots.forEach(slot => {
    slot.addEventListener("click", () => {

        // Remove active class from all slots
        slots.forEach(s => s.classList.remove("active"));

        // Highlight selected slot
        slot.classList.add("active");

        // Store selected time
        selectedSlot = slot.textContent;
    });
});


// DATE VALIDATION
// Prevents users from selecting unavailable dates


const dateInput = document.getElementById("appointmentDate");

// Example of unavailable dates
const unavailableDates = [
    "2026-04-25",
    "2026-04-28",
    "2026-05-01"
];

dateInput.addEventListener("input", () => {
    if (unavailableDates.includes(dateInput.value)) {
        alert("This date is not available. Please choose another.");
        dateInput.value = "";
    }
});


// CONFIRM BOOKING FUNCTION
// Validates input, stores booking in cookie, and reloads page


function confirmBooking() {

    const name = document.getElementById("patientName").value.trim();
    const phone = document.getElementById("patientPhone").value.trim();
    const date = document.getElementById("appointmentDate").value;

    // Validate all fields
    if (!name || !phone || !date || !selectedSlot) {
        alert("Please fill all fields and select a time.");
        return;
    }

    const docName = document.getElementById("docName").textContent;

    // Store booking information in cookie
    document.cookie = `booking=Appointment with ${docName} on ${date} at ${selectedSlot}, More information will be sent to you via SMS.; path=/`;

    // Reload page to display confirmation message
    location.reload();

    // Reset form fields (optional cleanup)
    document.getElementById("patientName").value = "";
    document.getElementById("patientPhone").value = "";
    document.getElementById("appointmentDate").value = "";
    selectedSlot = null;

    slots.forEach(s => s.classList.remove("active"));
}


// COOKIE HELPER FUNCTION
// Retrieves a specific cookie value by name


function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let c of cookies) {
        let [key, value] = c.split("=");
        if (key === name) return value;
    }
    return null;
}


// SHOW BOOKING CONFIRMATION MESSAGE
// If booking exists in cookie, display success message


const bookingMessage = getCookie("booking");

if (bookingMessage) {

    const messageBox = document.createElement("p");
    messageBox.style.color = "green";
    messageBox.style.marginTop = "15px";

    messageBox.textContent = decodeURIComponent(bookingMessage);

    document.querySelector(".profile-right").appendChild(messageBox);

    // Clear cookie after displaying message
    document.cookie = "booking=; expires=Thu, 01 Jan 1970 00:00:00 UTC,; path=/;";
}