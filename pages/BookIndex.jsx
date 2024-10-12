import { BookFilter } from '../cmps/BookFilter.jsx'
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
        bookService.remove(bookId).then(() => {
            setBooks((books) => books.filter((book) => book.id !== bookId))
        })
    }

    function onSaveEdit(ev, bookToSave) {
        ev.preventDefault()
        bookService.save(bookToSave).then((savedBook) => {
            setSelectedBook(savedBook)
            setIsEdit(false)
            setBooks((prevBooks) => prevBooks.map((book) => (book.id === savedBook.id ? savedBook : book)))
            bookService.query().then((books) => {
                setBooks(() => books)
            })
        })
    }
    function onAddBook() {
        setSelectedBook(() => bookService.getEmptyBook())
        setIsEdit(true)
    }
    function onCancelEdit() {
        if (!selectedBook.id) {
            console.log('new book cancal')
            setSelectedBook(() => null)
        }
        setIsEdit(() => false)
    }
    if (!books) return <div>Loading...</div>
    return (
        <React.Fragment>
            {!selectedBook && (
                <section className="book-index">
                    <button onClick={() => onAddBook()}>
                        <Link to="/book/edit">add a book</Link>
                    </button>

                    <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} defaultFilterby={bookService.getDefaultFilter()} />

                    <BookList books={books} onSelectBook={onSelecteBook} onDeleteBook={onDeleteBook} />
                </section>
            )}
        </React.Fragment>
    )
}
