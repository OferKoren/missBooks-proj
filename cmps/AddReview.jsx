import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { DynamicRating } from './DynamicRating.jsx'
const { useState, useEffect, useRef } = React

export function AddReview({ bookId, onUpdateBook }) {
    const [review, setReview] = useState(bookService.getEmptyReview())
    //*setting the comp type defualt
    const [compType, setCompType] = useState('select')
    function onAddReview(ev) {
        ev.preventDefault()
        console.log('submitting the review')
        bookService.addReview(bookId, review).then((book) => {
            console.log(book)
            showSuccessMsg('added a review')
            onUpdateBook(book)
            setReview(() => bookService.getEmptyReview())
        })
    }

    function handleChange({ target }) {
        const field = target.name
        // console.log('field:', field)
        if (field === 'rating') {
            const value = +target.value
            if (value > 5 || value < 0) return
        }
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

    function onChangeRadio(ev) {
        setCompType(ev.target.value)
    }
    console.log(review)
    return (
        <section className="add-review">
            <label htmlFor="select-radio-button">select</label>
            <input defaultChecked type="radio" value="select" id="select-radio-button" onChange={onChangeRadio} name="dynamic-rating"></input>

            <label htmlFor="text-box-radio-button">textbox</label>
            <input type="radio" id="text-box-radio-button" value="textbox" onChange={onChangeRadio} name="dynamic-rating"></input>

            <label htmlFor="stars-radio-button">stars</label>
            <input type="radio" id="stars-radio-button" value="stars" onChange={onChangeRadio} name="dynamic-rating"></input>

            <form action="" onSubmit={onAddReview}>
                <label htmlFor="name">name</label>
                <input required type="text" onChange={handleChange} value={review.name} name="name" id="name" placeholder="enter name" />
                <label htmlFor="rating">rating</label>
                <DynamicRating compType={compType} required name="rating" onChange={handleChange} value={review.rating} id="rating" />
                <label htmlFor="date">read at</label>
                <input required type="date" onChange={handleChange} value={review.date} name="date" id="date" />
                <button>Add</button>
            </form>
        </section>
    )
}
