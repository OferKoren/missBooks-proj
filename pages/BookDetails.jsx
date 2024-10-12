const { useParams, useNavigate, Link } = ReactRouterDOM
const { useEffect, useState } = React

import { bookService } from '../services/book.service.js'

import { LongTxt } from '../cmps/longTxt.jsx'
export function BookDetails() {
    const { bookId } = useParams()
    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService
            .getBookById(bookId)
            .then(setBook)
            .catch((err) => {
                console.log(`${err} error problom getting car`)
            })
    }

    function getBookDetail(title, content, remark = '') {
        return (
            <div className="book-detaill">
                <span className="detail-title">{title}:</span>
                <span className="detail-content">{`${content}  ${remark}`}</span>
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

    function getPageCountRemark() {
        const { pageCount } = book
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount > 200) return 'Descent Reading'
        return 'Light Reading'
    }

    function getPublishedDateRemark() {
        const { publishedDate } = book
        const now = new Date()
        if (now.getFullYear() - publishedDate > 10) return 'Vintage'
        if (now.getFullYear() - publishedDate < 1) return 'New'
        return ''
    }

    function getPriceClass() {
        const { listPrice } = book
        if (listPrice.amount > 150) return 'high-price'
        if (listPrice.amount < 20) return 'low-price'
        return ''
    }
    if (!book) return <div>loading...</div>
    return (
        <section className="book-details">
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>
            <div className="img-wrapper">
                <img src={book.thumbnail} alt="" />
                {book.listPrice.isOnSale && <div className="on-sale">On Sale!</div>}
            </div>

            {getBookDetail('Year Published', book.publishedDate, getPublishedDateRemark())}
            {getBookDetail('Author', book.authors.join(','))}
            {getBookDetail('Language', getBookLng(book.language))}
            {getBookDetail('Categories', book.categories.join(','))}
            {getBookDetail('Pages', book.pageCount, getPageCountRemark())}

            <div className="book-detaill">
                <span className="detail-title">Price:</span>
                <span className={`detail-content ${getPriceClass()}`}>{`${book.listPrice.amount} ${book.listPrice.currencyCode}`}</span>
            </div>

            <button>
                <Link to="/book">back</Link>
            </button>
            <button>
                <Link to={`/book/edit/${book.id}`}>edit</Link>
            </button>
            <div className="book-detaill">
                <span className="detail-title">Description:</span>
                <div className="detail-content">
                    <LongTxt txt={book.description} />
                </div>
            </div>
        </section>
    )
}
