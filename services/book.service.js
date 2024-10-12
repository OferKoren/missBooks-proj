import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
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
    console.log(filterBy)
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

function save(car) {
    if (car.id) {
        return storageService.put(BOOK_KEY, car)
    } else {
        return storageService.post(BOOK_KEY, car)
    }
}
//todo change herre
function getEmptyBook(vendor = '', speed = '') {
    return { vendor, speed }
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
function _createBook(vendor, speed = 250) {
    const car = getEmptyCar(vendor, speed)
    car.id = makeId()
    return car
}
