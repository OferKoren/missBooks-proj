import { loadFromStorage, makeId, saveToStorage, utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { demoBooks } from '../assets/books.js'

export const bookService = {
    query,
    getBookById,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}
const BOOK_KEY = 'bookDB'
_createBooks()
function query(filterBy = {}) {
    return storageService.query(BOOK_KEY).then((books) => {
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            books = books.filter((book) => regExp.test(book.title))
        }
        if (filterBy.price) {
            books = books.filter((book) => book.listPrice.amount <= filterBy.price)
        }
        return books
    })
}

function getBookById(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        const newBook = _createBook(book)
        return storageService.post(BOOK_KEY, newBook)
    }
}
//todo change herre
function getEmptyBook(title = '', amount = '') {
    return { title, listPrice: { amount } }
}
//todo change herre
function getDefaultFilter() {
    return { txt: '', price: '' }
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = demoBooks
        saveToStorage(BOOK_KEY, books)
    }
}
// todo change here
function _createBook(book) {
    const randBook = demoBooks[utilService.getRandomIntInclusive(0, 19)]
    const newBook = { ...randBook, title: book.title }
    newBook.listPrice.amount = book.listPrice.amount
    return newBook
}
