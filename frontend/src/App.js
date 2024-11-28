import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';

const App = () => {
    const [reviews, setReviews] = useState([]); 

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route 
                        path="/reviews" 
                        element={<ReviewList reviews={reviews} setReviews={setReviews} />} 
                    />
                    <Route 
                        path="/add" 
                        element={<ReviewForm setReviews={setReviews} />} 
                    />
                    <Route 
                        path="/edit" 
                        element={<ReviewForm setReviews={setReviews} />} 
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
