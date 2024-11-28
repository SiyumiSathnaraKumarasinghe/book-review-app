
import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ setReviews }) => {
    const [bookTitle, setBookTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState(1);
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = {
            bookTitle,
            author,
            rating,
            reviewText,
        };

        // Send POST request to backend
        axios
            .post('http://localhost:5000/reviews', newReview)
            .then((response) => {
                setReviews((prevReviews) => [...prevReviews, response.data]);
                setBookTitle('');
                setAuthor('');
                setRating(1);
                setReviewText('');
            })
            .catch((error) => {
                console.error('Error adding review:', error);
            });
    };

    return (
        <div>
            <h2>Add a Review</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Book Title"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Rating (1-5)"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="5"
                    required
                />
                <textarea
                    placeholder="Write your review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                />
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default ReviewForm;
