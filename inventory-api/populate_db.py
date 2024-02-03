from app import app, db, Book, User
from werkzeug.security import generate_password_hash
# Sample data
books = [
   {'title': 'The Great Gatsby', 'author': 'F. Scott Fitzgerald', 'genre': 'Novel', 'quantity': 5},
    {'title': 'To Kill a Mockingbird', 'author': 'Harper Lee', 'genre': 'Southern Gothic', 'quantity': 3},
    {'title': '1984', 'author': 'George Orwell', 'genre': 'Dystopian', 'quantity': 4},
    {'title': 'The Catcher in the Rye', 'author': 'J.D. Salinger', 'genre': 'Realistic Fiction', 'quantity': 6},
    {'title': 'The Hobbit', 'author': 'J.R.R. Tolkien', 'genre': 'Fantasy', 'quantity': 7},
    {'title': 'Pride and Prejudice', 'author': 'Jane Austen', 'genre': 'Romance', 'quantity': 5},
    {'title': 'Animal Farm', 'author': 'George Orwell', 'genre': 'Political Satire', 'quantity': 8},
    {'title': 'Jane Eyre', 'author': 'Charlotte Bronte', 'genre': 'Gothic Novel', 'quantity': 4},
    {'title': 'Great Expectations', 'author': 'Charles Dickens', 'genre': 'Bildungsroman', 'quantity': 5},
    {'title': 'War and Peace', 'author': 'Leo Tolstoy', 'genre': 'Historical Fiction', 'quantity': 2}
]
#roles = ['manager', 'staff', 'customer']
users = [
    {'username': 'm1', 'password': 'm1', 'role': 'manager'},
    {'username': 's1', 'password': 's1', 'role': 'staff'},
    {'username': 'staff_user2', 'password': 'staff_pass2', 'role': 'staff'},
    {'username': 'c1', 'password': 'c1', 'role': 'customer'},
    {'username': 'customer_user2', 'password': 'customer_pass2', 'role': 'customer'},
    {'username': 'customer_user3', 'password': 'customer_pass3', 'role': 'customer'},
    {'username': 'customer_user4', 'password': 'customer_pass4', 'role': 'customer'},
    {'username': 'customer_user5', 'password': 'customer_pass5', 'role': 'customer'},
    {'username': 'customer_user6', 'password': 'customer_pass6', 'role': 'customer'},
    {'username': 'customer_user7', 'password': 'customer_pass7', 'role': 'customer'}
]

def populate_database():
    with app.app_context():
        # Create tables
        db.create_all()

        # Add roles
        # for role_name in ['manager', 'staff', 'customer']:
        #     if not Role.query.filter_by(name=role_name).first():
        #         role = Role(name=role_name)
        #         db.session.add(role)
        # db.session.commit()

        # Add users
        for user_data in users:
            if not User.query.filter_by(username=user_data['username']).first():
                #role = Role.query.filter_by(name=user_data['role']).first()
                user = User(username=user_data['username'], password=user_data['password'], role=user_data['role'])
                db.session.add(user)
        db.session.commit()

        # Add books
        for book_data in books:
            if not Book.query.filter_by(title=book_data['title']).first():
                book = Book(title=book_data['title'], author=book_data['author'], genre=book_data['genre'], quantity=book_data['quantity'])
                db.session.add(book)
        db.session.commit()
#def populate_database():
    # Connect to the PostgreSQL database using SQLAlchemy
    #with app.app_context():
        # Check if the 'book' table exists, and create it if not
        # if not db.engine.dialect.has_table(db.engine, 'books'):
        #     db.create_all()

        # Add sample data to the 'books' table
        #for book_data in books:
            #book = Book(title=book_data['title'], author=book_data['author'], quantity=book_data['quantity'])
            #db.session.add(book)

        #db.session.commit()

if __name__ == '__main__':
    populate_database()
