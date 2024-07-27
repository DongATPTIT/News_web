document.addEventListener("DOMContentLoaded", function () {
    const editButtons = document.querySelectorAll('.edit-button');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');

    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const articleId = this.getAttribute('data-id');
            const modal = document.getElementById(`edit-article-modal-${articleId}`);
            modal.style.display = 'block';
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            modals.forEach(modal => modal.style.display = 'none');
        });
    });

    window.addEventListener('click', function (event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});