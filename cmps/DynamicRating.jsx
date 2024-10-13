const { useState, useEffect } = React
export function DynamicRating(prop) {
    const { compType } = prop
    if (compType === 'select') return <RateBySelect {...prop} />
    if (compType === 'textbox') return <RateByTextBox {...prop} />

    return <RateByStars {...prop} />
}

function RateBySelect({ name, value, onChange }) {
    return (
        <select required name={name} value={value} onChange={onChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
    )
}

function RateByTextBox({ name, value, onChange }) {
    return <input required name={name} value={value} onChange={onChange} />
}

function Stars({ rating, onChangeStars }) {
    const starArray = []
    for (let i = 0; i < 5; i++) {
        const src = i < rating ? 'full_star' : 'empty_star'
        const star = (
            <div className="star" key={`star${i + 1}`} onClick={() => onChangeStars(i + 1)}>
                <img src={`./assets/img/stars/${src}.png`} alt="" />
            </div>
        )
        starArray.push(star)
    }
    return <div className="stars">{starArray}</div>
}

function RateByStars({ name, value, onChange }) {
    const [rating, setRating] = useState(+value)

    function onChangeStars(rating) {
        setRating(rating)
        console.log({ name, value: rating })
        onChange({ target: { name, value: rating } })
    }

    return (
        <React.Fragment>
            <Stars rating={rating} onChangeStars={onChangeStars} />
        </React.Fragment>
    )
}
