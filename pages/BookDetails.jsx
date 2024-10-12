export function BookDetails({ book, onEdit, onBack }) {
    console.log(book)

    function getBookDetail(title, content) {
        return (
            <div className="book-detaill">
                <span className="detail-title">{title}:</span>
                <span className="detail-content">{content}</span>
            </div>
        )
    }
    function getBookLng(lng) {
        switch (lng) {
            case 'he':
                return 'Hebrew'
            case 'sp':
                return 'Spanish'
            default:
                return 'English'
        }
    }
    return (
        <section className="book-details">
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>
            <img src={book.thumbnail} alt="" />

            {getBookDetail('Year Published', book.publishedDate)}
            {getBookDetail('Author', book.authors.join(','))}
            {getBookDetail('Language', getBookLng(book.language))}
            {getBookDetail('Categories', book.categories.join(','))}
            {getBookDetail('Pages', book.pageCount)}
            {getBookDetail('Price', `${book.listPrice.amount} ${book.listPrice.currencyCode}`)}
            <button onClick={onBack}>back</button>
            <button onClick={onEdit}>edit</button>
            <div className="book-detaill">
                <span className="detail-title">Description:</span>
                <div className="detail-content">{book.description}</div>
            </div>
        </section>
    )
}
