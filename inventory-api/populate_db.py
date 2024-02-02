from app import app, db, Book

# Sample data
books = [
    {
        'title': 'The Great Gatsby',
        'author': 'F. Scott Fitzgerald',
        'quantity': 5
    },
    {
        'title': 'To Kill a Mockingbird',
        'author': 'Harper Lee',
        'quantity': 3
    },
    # Add more books as needed
]

def populate_database():
    # Connect to the PostgreSQL database using SQLAlchemy
    with app.app_context():
        # Check if the 'book' table exists, and create it if not
        #if not db.engine.dialect.has_table(db.engine, 'books'):
        #    db.create_all()

        # Add sample data to the 'books' table
        for book_data in books:
            book = Book(title=book_data['title'], author=book_data['author'], quantity=book_data['quantity'])
            db.session.add(book)

        db.session.commit()

if __name__ == '__main__':
    populate_database()
