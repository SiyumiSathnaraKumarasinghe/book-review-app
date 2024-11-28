import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const ReviewForm = ({ setReviews }) => {
    const [bookTitle, setBookTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState(1);
    const [reviewText, setReviewText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation(); 
    const navigate = useNavigate();

    const existingReview = location.state?.review;

    useEffect(() => {
       
        if (existingReview) {
            setBookTitle(existingReview.bookTitle);
            setAuthor(existingReview.author);
            setRating(existingReview.rating);
            setReviewText(existingReview.reviewText);
        }
    }, [existingReview]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!bookTitle || !author || !rating || !reviewText) {
            setErrorMessage('Please complete all fields.');
            return;
        }

        if (rating < 1 || rating > 5) {
            setErrorMessage('Rating must be between 1 and 5.');
            return;
        }

        const authorRegex = /^[a-zA-Z\s]*$/;
        if (!authorRegex.test(author)) {
            setErrorMessage('Author name can only contain letters and spaces.');
            return;
        }

        setErrorMessage('');

        const newReview = {
            bookTitle,
            author,
            rating,
            reviewText,
        };

        if (existingReview) {
           
            axios
                .put(`http://localhost:5000/reviews/${existingReview._id}`, newReview)
                .then((response) => {
                    setReviews((prevReviews) =>
                        prevReviews.map((review) =>
                            review._id === response.data._id ? response.data : review
                        )
                    );
                    navigate('/'); 
                })
                .catch((error) => {
                    console.error('Error updating review:', error);
                });
        } else {
            
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
        }
    };

    return (
        <Box
            sx={{
                width: '60%',
                margin: '1rem auto',
                padding: '2rem',
                borderRadius: '15px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '3px solid #009966',
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    paddingRight: '0 rem',
                    height: 'auto',
                }}
            >
                <img
                    src={require('../assets/bookgirl.png')}
                    alt="Book Girl"
                    style={{
                        width: '80%',
                        height: '70%',
                        objectFit: 'cover',
                        borderRadius: '8px',
                    }}
                />
            </Box>

            <Box
                sx={{
                    flex: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: 'center',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 'bold',
                        fontSize: '35px',
                        color: '#023020',
                        marginBottom: '1rem',
                    }}
                >
                    {existingReview ? 'Update Review' : 'Rate and Review'}
                </Typography>

                {errorMessage && (
                    <Typography
                        variant="body1"
                        color="error"
                        sx={{ textAlign: 'center', marginBottom: '1rem' }}
                    >
                        {errorMessage}
                    </Typography>
                )}

                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem', 
                        }}
                    >
                        <TextField
                            label="Book Title"
                            variant="outlined"
                            value={bookTitle}
                            onChange={(e) => setBookTitle(e.target.value)}
                            required
                            margin="normal"
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#009966',
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="Author"
                            variant="outlined"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                            margin="normal"
                            fullWidth
                            error={!/^[a-zA-Z\s]*$/.test(author)}
                            helperText={!/^[a-zA-Z\s]*$/.test(author) ? 'Only letters and spaces are allowed.' : ''}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#009966',
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="Rating (1-5)"
                            variant="outlined"
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            required
                            margin="normal"
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#009966',
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="Review"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            required
                            margin="normal"
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#009966',
                                    },
                                },
                            }}
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        
                        sx={{
                            marginTop: '1rem',
                            backgroundColor: '#009966',
                            '&:hover': {
                                backgroundColor: '#006644',
                            },
                        }}
                    >
                        {existingReview ? 'Update Review' : 'Submit Review'}
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default ReviewForm;
