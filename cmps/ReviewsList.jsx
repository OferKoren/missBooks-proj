export function ReviewsList({ reviews, onDeleteReview }) {
    return (
        <section className="review-list">
            {reviews.map((review) => {
                return (
                    <div key={review.id} className="review">
                        <span>Rating: {review.rating} stars</span>
                        <span>Writting by: {review.name}</span>
                        <span>Last read: {review.date}</span>
                        <button onClick={() => onDeleteReview(review.id)}>x</button>
                    </div>
                )
            })}
        </section>
    )
}
