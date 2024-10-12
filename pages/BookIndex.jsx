import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { BookDetails } from './BookDetails.jsx'
const { useEffect, useState } = React
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

    if (!books) return <div>Loading...</div>
    return (
        <React.Fragment>
            {!selectedBook && (
                <section className="book-index">
                    <h2>book index</h2>
                    <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} defaultFilterby={{ ...filterBy }} />
                    <BookList books={books} onSelectBook={onSelecteBook} />
                    {/* <pre>{JSON.stringify(books, null, 2)}</pre> */}
                </section>
            )}
            {selectedBook && <BookDetails book={selectedBook} onBack={() => setSelectedBook(null)} onEdit={() => {}} />}
        </React.Fragment>
    )
}
