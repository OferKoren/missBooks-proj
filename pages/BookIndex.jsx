import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
const { useEffect, useState } = React
export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(setBooks)
    }

    function onSetFilter(filterBy) {
        setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
    }
    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            <h2>book index</h2>
            <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <BookList books={books} />
            {/* <pre>{JSON.stringify(books, null, 2)}</pre> */}
        </section>
    )
}
