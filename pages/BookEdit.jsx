const { useNavigate, useParams, Link } = ReactRouterDOM
const { useEffect, useState } = React

import { bookService } from '../services/book.service.js'

export function BookEdit() {
    const navigate = useNavigate()
    const { bookId } = useParams()
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())

    useEffect(() => {
        if (bookId) loadBook()
    }, [bookId])

    function loadBook() {
        bookService
            .getBookById(bookId)
            .then((res) => {
                setBookToEdit(res)
            })
            .catch((err) => {
                console.log(`${err} error problom getting car`)
            })
    }
    function handleChange({ target }) {
        const field = target.name
        // console.log('field:', field)
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }

        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function handleChangePrice({ target }) {
        const field = target.name
        // console.log('field:', field)
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }

        setBookToEdit((prevBook) => ({ ...prevBook, listPrice: { ...prevBook.listPrice, [field]: value } }))
    }
    function onSaveBook(ev) {
        ev.preventDefault()
        bookService
            .save(bookToEdit)
            .then((book) => {
                console.log('Car Saved')
            })
            .catch((err) => {
                console.log('err:', err)
            })
            .finally(() => {
                navigate('/book')
            })
    }
    if (!bookToEdit) return <div>loading...</div>
    const title = bookToEdit.id ? `editing ${bookToEdit.title}` : `add a book`
    return (
        <section className="book-edit">
            <h2>{title}</h2>
            <form onSubmit={onSaveBook} action="">
                <label htmlFor="title">title</label>
                <input type="text" value={bookToEdit.title} onChange={handleChange} name="title" id="title" placegolder="enter title" />

                <label htmlFor="price">price</label>
                <input
                    type="number"
                    value={bookToEdit.listPrice.amount}
                    onChange={handleChangePrice}
                    name="amount"
                    id="price"
                    placegolder="enter price"
                />

                <div className="buttons">
                    {' '}
                    <button>save</button>
                    <button type="button">
                        <Link to={bookToEdit.id ? `/book/${bookToEdit.id}` : `/book`}>cancal</Link>
                    </button>
                </div>
            </form>
        </section>
    )
}
