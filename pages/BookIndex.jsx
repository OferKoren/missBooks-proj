import { bookService } from '../services/book.service.js'
const { useEffect, useState } = React
export function BookIndex() {
    const [books, setBooks] = useState(null)
    useEffect(() => {
        loadBooks().then((books) => {
            setBooks(books)
        })
    }, [])

    function loadBooks() {
        return bookService.query()
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            <h2>book index</h2>
            <pre>{JSON.stringify(books, null, 2)}</pre>
        </section>
    )
}
