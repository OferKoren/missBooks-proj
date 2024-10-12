import { BookFilter } from '../cmps/BookFilter.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { BookDetails } from './BookDetails.jsx'
import { BookEdit } from './BookEdit.jsx'
const { useEffect, useState } = React
const { Link } = ReactRouterDOM
export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
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
