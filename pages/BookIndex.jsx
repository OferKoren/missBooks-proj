import { BookFilter } from '../cmps/BookFilter.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { getTruthyValues } from '../services/util.service.js'

const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM
export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [selectedBook, setSelectedBook] = useState(null)

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(getTruthyValues(filterBy))
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(setBooks)
    }

    function onSetFilter(filterBy) {
        setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
    }

    function onSelecteBook(bookId) {
        bookService.getBookById(bookId).then(setSelectedBook)
    }

    function onDeleteBook(bookId) {
        bookService
            .remove(bookId)
            .then(() => {
                console.log('here')
                showSuccessMsg(`successfully deleted ${bookId}`)
                setBooks((books) => books.filter((book) => book.id !== bookId))
            })
            .catch((err) => {
                showErrorMsg('could not delete the book ')
            })
    }

    if (!books) return <div>Loading...</div>
    return (
        <React.Fragment>
            {!selectedBook && (
                <section className="book-index">
                    <button>
                        <Link to="/book/edit">add a book</Link>
                    </button>

                    <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} defaultFilterby={bookService.getDefaultFilter()} />

                    <BookList books={books} onSelectBook={onSelecteBook} onDeleteBook={onDeleteBook} />
                </section>
            )}
        </React.Fragment>
    )
}
