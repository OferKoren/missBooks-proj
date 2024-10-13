import { GoogleBookList } from '../cmps/GoogleBookList.jsx'
import { utilService } from '../services/util.service.js'
import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

const { Link, useSearchParams, useNavigate } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function BookAdd() {
    const navigate = useNavigate()
    const [search, setSearch] = useState()
    const [books, setBooks] = useState()
    const debouncedGetGoogleBook = useRef()

    function onChange({ target }) {
        setSearch(target.value)
    }
    useEffect(() => {
        debouncedGetGoogleBook.current = utilService.debounce((search) => {
            bookService.getGoogleBooks(search).then((books) => {
                setBooks(() => books)
                console.log(books)
            })
        }, 1000)
    }, [])

    useEffect(() => {
        debouncedGetGoogleBook.current(search)
    }, [search])

    function onAddBook(bookId) {
        const book = books.filter((book) => book.id === bookId)[0]

        bookService
            .addGoogleBook(book)
            .then(() => {
                showSuccessMsg('added  book from google')
            })
            .catch((err) => {
                console.log(err)
                showErrorMsg('had problems with adding book')
            })
            .finally(() => {
                navigate('../book')
            })
    }
    return (
        <section className="add-book">
            <h2>add book page</h2>
            <input type="text" placeholder="search book here" onChange={onChange} />
            <GoogleBookList books={books} onAddBook={onAddBook} />
        </section>
    )
}
