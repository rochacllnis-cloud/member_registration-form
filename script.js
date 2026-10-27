// 1. Select the elements
const form = document.querySelector("#memberForm");
const fields = document.querySelectorAll("input, select, textarea");
const errors = document.querySelectorAll(".error");
const successMessage = document.querySelector("#success-message");
const memberList = document.querySelector("#member-list");
const memberCounter = document.querySelector("#member-counter");
const darkModeButton = document.querySelector("#dark-mode");

// 2. Log elements to the console
console.log({ form, fields, errors, successMessage, memberList, memberCounter, darkModeButton });

// 3. Clear errors as the user types or changes a field
fields.forEach(field => {
    field.addEventListener("input", () => {
        if (field.nextElementSibling?.classList.contains("error")) {
            field.nextElementSibling.textContent = "";
        }
    });

    field.addEventListener("change", () => {
        if (field.nextElementSibling?.classList.contains("error")) {
            field.nextElementSibling.textContent = "";
        }
    });
});

// 4. Capture form submission and validate
form.addEventListener("submit", function(event) {
    event.preventDefault();

    let valid = true;
    errors.forEach(error => error.textContent = "");
    successMessage.textContent = "";

    fields.forEach(field => {
        const error = field.nextElementSibling;

        if (!field.value.trim()) {
            error.textContent = "This field is required.";
            valid = false;
        } else if (field.type === "email" &&
                   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
            error.textContent = "Enter a valid email address.";
            valid = false;
        } else if (field.id === "phone" &&
                   !/^[0-9+\-\s()]{7,15}$/.test(field.value.trim())) {
            error.textContent = "Enter a valid phone number.";
            valid = false;
        }
    });

    if (!valid) return;

    // 5. Create the registered member
    const member = document.createElement("li");
    const details = document.createElement("span");

    details.textContent = Array.from(fields)
        .map(field => field.value.trim())
        .join(" | ");

    // 6. Add a Remove button
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", function() {
        member.remove();
        memberCounter.textContent = memberList.children.length;
    });

    member.append(details, removeButton);
    memberList.appendChild(member);

    // 7. Update the member counter
    memberCounter.textContent = memberList.children.length;

    // 8. Show success message and reset the form
    successMessage.textContent = "Member registered successfully!";
    form.reset();
});

// 9. Toggle dark mode
darkModeButton.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});
