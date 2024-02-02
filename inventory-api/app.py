from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

# Set your PostgreSQL connection details
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@postgres-db:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SERVER_NAME'] = 'localhost:5001'

# Initialize SQLAlchemy
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Define a Book model
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    author = db.Column(db.String(100))
    quantity = db.Column(db.Integer)

@app.route('/inventory/api/v1.0/books', methods=['GET'])
def get_books():
    # Retrieve books from the database
    database_books = Book.query.all()

    # Convert database results to a list of dictionaries
    result_books = [{'title': book.title, 'author': book.author, 'quantity': book.quantity} for book in database_books]

    return jsonify({'books': result_books})

if __name__ == '__main__':
    
    app.run(debug=True, host='0.0.0.0')

