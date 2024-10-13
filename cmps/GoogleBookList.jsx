export function GoogleBookList({ books, onAddBook }) {
    if (!books) return

    const booksData = books.map((book) => {
        const { volumeInfo, id } = book
        const { title, authors, publishedDate, description, pageCount } = volumeInfo
        return { id, title, authors, publishedDate, description, pageCount }
    })
    const elBooks = booksData.map((book) => {
        return (
            <div key={book.id} className="book-to-add">
                <span>title</span>
                <span>{book.title}</span>
                <button onClick={() => onAddBook(book.id)}>+</button>
            </div>
        )
    })
    return (
        <section className="google-book-list">
            <h2>books from google</h2>
            {elBooks}
        </section>
    )
}
