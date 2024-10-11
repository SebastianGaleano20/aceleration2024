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

    static searchBook(title) {
        return BOOKS.find(book => book.title === title)
    }
}

class User {
    constructor(id, name, borrowedBooks) {
        this.id = id,
            this.name = name,
            this.borrowedBooks = borrowedBooks
    }

    static lendBook(book, user) {
        if (book.available) {
            user.borrowedBooks.push(book)
        }
        return `El libro "${book.title}" ha sido prestado a ${user.name}`
    }

    static returnBook(book, user) {
        user.borrowedBooks.pop(book)
        return `El libro "${book.title}" ha sido devuelto`
    }
    

}

const BOOKS = []

const book1 = new Book(1, "1984", "George Orwell", true)
const book2 = new Book(2, "To Kill a Mockingbird", "Harper Lee", true)
const book3 = new Book(3, "Pride and Prejudice", "Jane Austen", false)
BOOKS.push(book1, book2, book3)

const USERS = []

const user1 = new User(1, "Alice Johnson", [])
const user2 = new User(2, "Bob Smith", [3])

USERS.push(user1, user2)

const foundBook = Book.searchBook("1984")
console.log(foundBook)

const lendBook = User.lendBook(book1, user1)
console.log(lendBook)

const lendBook2 = User.lendBook(book2, user2)
console.log(lendBook2)

const returnBook = User.returnBook(book3, user2)
console.log(returnBook)



