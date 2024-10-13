import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
const { useState, useEffect, useRef } = React

export function AddReview({ bookId }) {
    const [review, setReview] = useState(bookService.getEmptyReview())
    function onAddReview(ev) {
        ev.preventDefault()
        console.log('submitting the review')
        bookService.addReview(bookId, review).then((book) => {
            console.log(book)
            showSuccessMsg('added a review')
            setReview(() => bookService.getEmptyReview())
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

        setReview((prevReview) => ({ ...prevReview, [field]: value }))
    }

    console.log(review)
    return (
        <section className="add-review">
            <form action="" onSubmit={onAddReview}>
                <label htmlFor="name">name</label>
                <input required type="text" onChange={handleChange} value={review.name} name="name" id="name" placeholder="enter name" />
                <label htmlFor="rating">rating</label>
                <select required name="rating" onChange={handleChange} value={review.rating} id="rating">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <label htmlFor="date">read at</label>
                <input required type="date" onChange={handleChange} value={review.date} name="date" id="date" />
                <button>Add</button>
            </form>
        </section>
    )
}
