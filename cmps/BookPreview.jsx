export function BookPreview({ book }) {
    return (
        <section className="book-preview">
            <h3>{book.title}</h3>
            <img src={book.thumbnail} alt="" />
            <p>authers: {book.authors.join(',')}</p>
            <p>price: {book.listPrice.amount.toLocaleString(undefined, { style: 'currency', currency: book.listPrice.currencyCode })}</p>
        </section>
    )
}
