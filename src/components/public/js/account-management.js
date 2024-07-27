document.addEventListener("DOMContentLoaded", () => {
    const editButtons = document.querySelectorAll(".edit-button");
    const deleteButtons = document.querySelectorAll(".delete-button");
    const modal = document.getElementById("edit-user-modal");
    const closeModal = document.querySelector(".close-button");
    const form = document.getElementById("edit-user-form");

    editButtons.forEach(button => {
        button.addEventListener("click", () => {
            const userId = button.getAttribute("data-id");
            // Fetch user data based on userId and populate the form
            document.getElementById("user-id").value = userId;
            // Example of filling form with data
            document.getElementById("user-name").value = "Example Name";
            document.getElementById("user-username").value = "example.username";
            document.getElementById("user-password").value = "example.password";
            modal.style.display = "block";
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {
            const userId = button.getAttribute("data-id");
            // Handle delete action here
            alert("Delete user with ID: " + userId);
        });
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        // Handle save action here
        const userId = document.getElementById("user-id").value;
        const userName = document.getElementById("user-name").value;
        const userUsername = document.getElementById("user-username").value;
        const userPassword = document.getElementById("user-password").value;
        alert(`Saving user ${userId} with name ${userName} and username ${userUsername}`);
        modal.style.display = "none";
    });
});
