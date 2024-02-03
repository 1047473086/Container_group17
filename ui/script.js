function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/login', { // Adjust API URL based on your setup
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        console.log("aaaaa");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        if (data.redirect == "/user_dashboard") {
            console.log("user");
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('logout-section').style.display = 'block';
            document.getElementById('books-section').style.display = 'block';
            fetchBooks();
        }
        else if (data.redirect == "/admin_dashboard") {
            console.log("admin");
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('logout-section').style.display = 'block';
            document.getElementById('admin-section').style.display = 'block';
            fetchBooks();
        } 
        else if (data.redirect == "/staff_dashboard") {
            console.log("staff");
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('logout-section').style.display = 'block';
            document.getElementById('staff-section').style.display = 'block';
            fetchBooksStaff();            
        }
        else {
            alert('Login failed');
        }
    });
}

function fetchBooks() {
    fetch('http://localhost:5000/inventory/api/v1.0/books') // Adjust API URL
    .then(response => response.json())
    .then(data => {
        const booksList = document.getElementById('books-list');
        booksList.innerHTML = '';
        data.books.forEach(book => {
            const item = document.createElement('li');
            item.textContent = `${book.title} by ${book.author} (${book.genre})`;
            booksList.appendChild(item);
        });
    });
}


function fetchBooksStaff() {
    console.log("fetchBooksStaff");
    fetch('http://localhost:5000/inventory/api/v1.0/books') // Adjust API URL
    .then(response => response.json())
    .then(data => {
        const booksList = document.getElementById('books-liststaff');
        booksList.innerHTML = '';
        data.books.forEach(book => {
            const item = document.createElement('li');
            item.textContent = `${book.title} by ${book.author} (${book.genre}), ${book.quantity} in stock`;
            booksList.appendChild(item);
        });
        console.log(booksList);
    });
}

function logoutt() {
    // Clear stored credentials

    // localStorage.removeItem('access_token');

    // localStorage.removeItem('refresh_token');


    // Redirect to the login page
    console.log("logout");
    window.location.href = '/login';
}


function addbook() {
    // Get values from the form
    var bookName = document.getElementById('book-name').value;
    var bookAuthor = document.getElementById('book-author').value;
    var bookPrice = document.getElementById('book-price').value;

    // Create the book object
    var bookData = {
        title: bookName,
        author: bookAuthor,
        price: bookPrice // Assuming you want to store the price as well
    };

    // Make the POST request to the Flask API
    fetch('/inventory/api/v1.0/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(bookData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Handle the response data
        // For example, you could clear the form fields or give user feedback
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

