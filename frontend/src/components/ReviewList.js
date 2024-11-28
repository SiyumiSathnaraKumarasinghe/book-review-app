import React from 'react';
import axios from 'axios';


const ReviewList = ({ reviews, setReviews }) => {
    const handleDelete = (id) => {
        // Send DELETE request to backend
        axios
            .delete(`http://localhost:5000/reviews/${id}`)
            .then(() => {
                // Remove the deleted review from the list
                setReviews(reviews.filter((review) => review._id !== id));
            })
            .catch((error) => {
                console.error('Error deleting review:', error);
            });
    };

    return (
        <div>
            {reviews.map((review) => (
                <div key={review._id} className="review">
                    <h3>{review.bookTitle}</h3>
                    <p>Author: {review.author}</p>
                    <p>Rating: {review.rating}</p>
                    <p>{review.reviewText}</p>
                    <button onClick={() => handleDelete(review._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
