import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(CAR_KEY).then((books) => {
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            books = books.filter((car) => regExp.test(car.vendor))
        }
        if (filterBy.minSpeed) {
            books = books.filter((car) => car.speed >= filterBy.minSpeed)
        }
        return books
    })
}

function get(bookId) {
    return storageService.get(CAR_KEY, bookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(CAR_KEY, bookId)
}

function save(car) {
    if (car.id) {
        return storageService.put(CAR_KEY, car)
    } else {
        return storageService.post(CAR_KEY, car)
    }
}
//todo change herre
function getEmptyCar(vendor = '', speed = '') {
    return { vendor, speed }
}
//todo change herre
function getDefaultFilter() {
    return { txt: '', minSpeed: '' }
}

function _createBooks() {
    let books = loadFromStorage(CAR_KEY)
    if (!books || !books.length) {
        //*todo change here
        books = [_createBook('audu', 300), _createBook('fiak', 120), _createBook('subali', 50), _createBook('mitsu', 150)]
        saveToStorage(CAR_KEY, books)
    }
}
// todo change here
function _createBook(vendor, speed = 250) {
    const car = getEmptyCar(vendor, speed)
    car.id = makeId()
    return car
}
