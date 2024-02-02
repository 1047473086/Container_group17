from flask import Flask, jsonify
from flask_cors import CORS #Added for CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import UserMixin
from flask_login import login_user, logout_user, login_required
from flask import request
from functools import wraps
from flask_login import current_user
app = Flask(__name__)

# Set your PostgreSQL connection details
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@postgres-db:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SERVER_NAME'] = 'localhost:5000'

app.config['SECRET_KEY'] = 'asdfghjk' 

# Initialize SQLAlchemy
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Define a Book model
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    author = db.Column(db.String(100))
    genre = db.Column(db.String(100))
    quantity = db.Column(db.Integer)

@app.route('/inventory/api/v1.0/books', methods=['GET'])
def get_books():
   # Retrieve books from the database
    database_books = Book.query.all()

    # Convert database results to a list of dictionaries
    result_books = [{'title': book.title, 'author': book.author, 'genre':book.genre,'quantity': book.quantity} for book in database_books]

    return jsonify({'books': result_books})


# class Role(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(80), unique=True)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    role = db.Column(db.String(100))
    #role_id = db.Column(db.Integer, db.ForeignKey('role.id'))
    #role = db.relationship('Role', backref=db.backref('users', lazy=True))

# Flask-Login setup
from flask_login import LoginManager

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

def role_required(role_name):
    def decorator(func):
        @wraps(func)
        def wrapped_function(*args, **kwargs):
            if not current_user.is_authenticated or current_user.role.name != role_name:
                return jsonify({'error': 'Unauthorized'}), 403
            return func(*args, **kwargs)
        return wrapped_function
    return decorator

@app.route('/login', methods=['POST'])
def login():
    #  you should validate and hash passwords.
    username = request.json.get('username')
    password = request.json.get('password')
    # Assuming passwords are hashed, you'd compare the hashed password here.
    # For simplicity, this example will not include password hashing.
    user = User.query.filter_by(username=username,password=password).first()
    
    if user :  # Assuming a method to check hashed passwords
        login_user(user)
        return jsonify({'message':'logged in Sucessfully'})
        # Redirect based on user role
    #     if user.role == 'manager':
    #         return jsonify({'redirect': '/manager_dashboard'}), 200  # Redirect to manager dashboard
    #     elif user.role == 'staff':
    #         return  jsonify({'redirect': '/staff_dashboard'}), 200  # Redirect to staff dashboard
    #     else:  # Default user role
    #         return jsonify({'redirect': '/user_dashboard'}), 200  # Redirect to general user dashboard

    return jsonify({'error': 'Invalid credentials'}), 401
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully.'})
@app.route('/login', methods=['POST'])

@app.route('/inventory/api/v1.0/books', methods=['POST'])
@login_required
@role_required('manager')
def add_or_update_book():
    data = request.json
    book = Book.query.filter_by(title=data['title']).first()
    if book:
        # Update existing book
        book.author = data.get('author', book.author)
        book.genre = data.get('genre', book.genre)
        book.quantity = data.get('quantity', book.quantity)
    else:
        # Add new book
        book = Book(title=data['title'], author=data['author'], genre=data['genre'], quantity=data['quantity'])
        db.session.add(book)
    db.session.commit()
    return jsonify({'message': 'Book added/updated successfully'}), 200

#app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes and methods

if __name__ == '__main__':
    
    app.run(debug=True, host='0.0.0.0')


