/* Pautas:
- Crea clases para Book y User.
- Implementa metodos para prestar, devolver y buscar libros.
- Utiliza un array para almacenar los libros y los usuarios.

Datos iniciales:

javascript
const initialBooks = [
  { id: 1, title: "1984", author: "George Orwell", available: true },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", available: true },
  { id: 3, title: "Pride and Prejudice", author: "Jane Austen", available: false }
];

const initialUsers = [
  { id: 1, name: "Alice Johnson", borrowedBooks: [] },
  { id: 2, name: "Bob Smith", borrowedBooks: [3] }
];
*/

class Book {
    constructor(id, title, author, available) {
        this.id = id,
            this.title = title,
            this.author = author,
            this.available = available
    }

    searchBook(BOOKS, title) {
        return BOOKS.find(book => book.title === title)
    }

    lendBook(book, user) {
        if (book.available) {
            user.borrowedBooks.push(book)
        }
    }

    returnBook(book, user) {
        user.borrowedBooks.pop(book)
    }

    addBook(book, BOOKS) {
        BOOKS.push(book)
    }
}

class User {
    constructor(id, name, borrowedBooks) {
        this.id = id,
            this.name = name,
            this.borrowedBooks = borrowedBooks
    }
    addUsers(user, USERS) {
        USERS.push(user)
    }
}

const BOOKS = [
    new Book(1, "1984", "George Orwell", true),
    new Book(2, "To Kill a Mockingbird", "Harper Lee", true),
    new Book(3, "Pride and Prejudice", "Jane Austen", false)
]

const USERS = [
    new User(1, "Alice Johnson", []),
    new User(2, "Bob Smith", [3])
]

const foundBook = Book.searchBook()

const lendBook = Book.lendBook(1,1)
console.log(`el libro ${lendBook.title} ha sido prestado a ${lendBook.name}`)

const returnBook = Book.returnBook(3,2)
console.log(`el libro ${returnBook.title} ha sido devuelto a ${returnBook.name}`)


