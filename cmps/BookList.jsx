import { BookPreview } from './BookPreview.jsx'
const { Link } = ReactRouterDOM

export function BookList({ books, onDeleteBook }) {
    return (
        <section className="book-list">
            {books.map((book) => {
                return (
                    <div key={book.id} className="book-card">
                        <BookPreview book={book} />

                        <button>
                            <Link to={`/book/${book.id}`}>details</Link>
                        </button>

                        <button onClick={() => onDeleteBook(book.id)}>delete</button>
                    </div>
                )
            })}
        </section>
    )
}
