import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onSelectBook }) {
    return (
        <section className="book-list">
            {/* <h2>BookList</h2> */}
            {books.map((book) => {
                // console.log(book.id)
                return (
                    <div key={book.id} className="book-card">
                        <BookPreview book={book} />
                        <button onClick={() => onSelectBook(book.id)}>details</button>
                        <button>delete</button>
                    </div>
                )
            })}
        </section>
    )
}
