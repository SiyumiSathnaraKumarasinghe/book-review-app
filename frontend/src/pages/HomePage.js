import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import bookwall from '../assets/bookwall.jpg'; 

const HomePage = () => {
    const [reviews, setReviews] = useState([]);

  
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
        <div
            style={{
                backgroundImage: `url(${bookwall})`, 
                backgroundSize: 'cover',  
                backgroundPosition: 'center',  
                backgroundAttachment: 'fixed',  
                opacity: 0.75,  
                minHeight: '100vh',  
            }}
        >
            
            <div
                style={{
                    backgroundColor: '#4CAF50', 
                    height: '100px', 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: 'Creepster, cursive', 
                    color: '#fff', 
                    fontSize: '1.7rem',
                    textAlign: 'center',
                }}
            >
                <h1>ReadRate</h1>
            </div>

            <ReviewForm setReviews={setReviews} />
            <ReviewList reviews={reviews} setReviews={setReviews} />
        </div>
    );
};

export default HomePage;
