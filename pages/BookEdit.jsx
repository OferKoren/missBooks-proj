const { useEffect, useState } = React
export function BookEdit({ book, onSaveEdit, onCancelEdit }) {
    const title = book.id ? `editing ${book.title}` : `add a book`
    const [bookToEdit, setBookToEdit] = useState({ ...book })

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
    console.log(bookToEdit)
    return (
        <section className="book-edit">
            <h2>{title}</h2>
            <form onSubmit={(ev) => onSaveEdit(ev, bookToEdit)} action="">
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
                    <button type="button" onClick={onCancelEdit}>
                        cancal
                    </button>
                </div>
            </form>
        </section>
    )
}
