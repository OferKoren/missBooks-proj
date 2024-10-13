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
    getFilterFromSearchParams,
    getEmptyReview,
    addReview,
    deleteReview,
    getPriceStats,
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
    return storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId)
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

function getEmptyBook(title = '', amount = '') {
    return { title, listPrice: { amount } }
}

function getDefaultFilter() {
    return { txt: '', price: '' }
}

function getEmptyReview() {
    return {
        name: '',
        rating: '',
        date: '',
    }
}
function addReview(bookId, review) {
    review.id = makeId()
    return getBookById(bookId).then((book) => {
        if (book.reviews) book.reviews.unshift(review)
        else book.reviews = [review]
        return storageService.put(BOOK_KEY, book)
    })
}

function deleteReview(bookId, reviewId) {
    return getBookById(bookId).then((book) => {
        const idx = book.reviews.findIndex((review) => (review.id = reviewId))
        const editBook = JSON.parse(JSON.stringify(book))
        editBook.reviews.splice(idx, 1)
        return storageService.put(BOOK_KEY, editBook)
    })
}

function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const price = searchParams.get('price') || ''
    return {
        txt,
        price,
    }
}

function getPriceStats() {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookCountByPrice = _getBookCountByPriceMap(books)
        bookCountByPrice
        const data = Object.keys(bookCountByPrice).map((price) => ({
            title: price,
            value: Math.round((bookCountByPrice[price] / books.length) * 100),
        }))
        return data
    })
}

function _getBookCountByPriceMap(books) {
    const bookCountByPriceMap = books.reduce(
        (map, book) => {
            const price = book.listPrice.amount
            const isOnSale = book.listPrice.isOnSale
            if (price < 50) map.cheap++
            else if (price < 150) map.normal++
            else map.expensive++
            return map
        },
        { cheap: 0, normal: 0, expensive: 0 }
    )
    return bookCountByPriceMap
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = demoBooks
        saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(book) {
    const randBook = demoBooks[utilService.getRandomIntInclusive(0, 19)]
    const newBook = { ...randBook, title: book.title }
    newBook.listPrice.amount = book.listPrice.amount
    return newBook
}
function _setNextPrevBookId(book) {
    return query().then((books) => {
        const carIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextCar = books[carIdx + 1] ? books[carIdx + 1] : books[0]
        const prevCar = books[carIdx - 1] ? books[carIdx - 1] : books[books.length - 1]
        book.nextBookId = nextCar.id
        book.prevBookId = prevCar.id
        return book
    })
}
