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

function logout() {
    console.log("logout");
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('books-section').style.display = 'none';
    document.getElementById('staff-section').style.display = 'none';
    document.getElementById('manager-section').style.display = 'none';
}


function addbook() {
    // Get values from the form
    var bookName = document.getElementById('book-name').value;
    var bookAuthor = document.getElementById('book-author').value;
    var bookGenre = document.getElementById('book-genre').value;
    var bookQuantity = document.getElementById('book-quantity').value;

    // Create the book object
    var bookData = {
        title: bookName,
        author: bookAuthor,
        genre: bookGenre,
        quantity: bookQuantity 
    };

    // Make the POST request to the Flask API
    fetch('http://localhost:5000/inventory/api/v1.0/books', {
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
        alert('Book added successfully!');
        // Optionally, you could clear the form fields here if desired
        document.getElementById('book-name').value = '';
        document.getElementById('book-author').value = '';
        document.getElementById('book-genre').value = '';
        document.getElementById('book-quantity').value = 0;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

