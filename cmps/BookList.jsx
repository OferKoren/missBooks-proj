import { BookPreview } from './BookPreview.jsx'

export function BookList({ books }) {
    return (
        <section className="book-list">
            {/* <h2>BookList</h2> */}
            {books.map((book) => {
                // console.log(book.id)
                return (
                    <div key={book.id} className="book-card">
                        <BookPreview book={book} />
                        <button>details</button>
                        <button>delete</button>
                    </div>
                )
            })}
        </section>
    )
}
