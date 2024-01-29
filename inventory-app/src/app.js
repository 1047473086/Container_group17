document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loginPage = document.getElementById('loginPage');
    const inventoryPage = document.getElementById('inventoryPage');
    const bookTable = document.getElementById('bookTable');
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');
    const manageBookForm = document.getElementById('manageBookForm');

    // Event Listeners
    loginForm.addEventListener('submit', handleLogin);
    logoutButton.addEventListener('click', handleLogout);
    manageBookForm.addEventListener('submit', handleBookSubmit);

    function handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                loginPage.classList.add('hidden');
                inventoryPage.classList.remove('hidden');
                loadBooks();
            } else {
                alert(data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function handleLogout() {
        fetch('/logout')
        .then(response => {
            loginPage.classList.remove('hidden');
            inventoryPage.classList.add('hidden');
        })
        .catch(error => console.error('Error:', error));
    }

    function loadBooks() {
        fetch('/inventory/api/v1.0/books')
        .then(response => response.json())
        .then(data => {
            bookTable.innerHTML = ''; // Clear existing data
            // Render books in the table
            data.books.forEach(book => {
                const row = `<div>${book.title} - ${book.author} - ${book.genre} - Quantity: ${book.quantity}</div>`;
                bookTable.innerHTML += row;
            });
        })
        .catch(error => console.error('Error:', error));
    }

    function handleBookSubmit(event) {
        event.preventDefault();
        const bookTitle = document.getElementById('bookTitle').value;
        const bookAuthor = document.getElementById('bookAuthor').value;
        const bookGenre = document.getElementById('bookGenre').value;
        const bookQuantity = document.getElementById('bookQuantity').value;

        fetch('/inventory/api/v1.0/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: bookTitle,
                author: bookAuthor,
                genre: bookGenre,
                quantity: parseInt(bookQuantity, 10),
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadBooks();
        })
        .catch(error => console.error('Error:', error));
    }
});
