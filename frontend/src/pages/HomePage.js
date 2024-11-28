import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

const HomePage = () => {
    const [reviews, setReviews] = useState([]);

    // Fetch reviews from the backend
    useEffect(() => {
        axios
            .get('http://localhost:5000/reviews')
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });
    }, []);

    return (
        <div>
            <h1>Book Reviews</h1>
            <ReviewForm setReviews={setReviews} />
            <ReviewList reviews={reviews} setReviews={setReviews} />
        </div>
    );
};

export default HomePage;
