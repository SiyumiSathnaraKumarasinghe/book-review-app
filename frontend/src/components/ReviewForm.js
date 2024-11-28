import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

const ReviewForm = ({ setReviews }) => {
    const [bookTitle, setBookTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState(1);
    const [reviewText, setReviewText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
        <Box
            sx={{
                width: '80%', 
                margin: '1rem auto',
                padding: '2rem',
                borderRadius: '15px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                backgroundColor: '#f5f5f5',
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                border: '3px solid #009966'
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
                        width: '70%', 
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
                    Rate and Review
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
                    <TextField
                        label="Book Title"
                        variant="outlined"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        required
                        margin="normal"
                        sx={{
                            width: '2in',
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
                        fullWidth
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        margin="normal"
                        error={!/^[a-zA-Z\s]*$/.test(author) && author !== ''}
                        helperText={
                            !/^[a-zA-Z\s]*$/.test(author) && author !== ''
                                ? 'Author name can only contain letters and spaces.'
                                : ''
                        }
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
                        onChange={(e) => setRating(e.target.value)}
                        min="1"
                        max="5"
                        required
                        margin="normal"
                        error={rating < 1 || rating > 5}
                        helperText={rating < 1 || rating > 5 ? 'Rating must be between 1 and 5' : ''}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#009966',
                                },
                            },
                        }}
                    />
                    <TextField
                        label="Review Text"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                        margin="normal"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#009966',
                                },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={
                            !bookTitle ||
                            !author ||
                            !rating ||
                            !reviewText ||
                            rating < 1 ||
                            rating > 5 ||
                            !/^[a-zA-Z\s]*$/.test(author)
                        }
                        sx={{
                            backgroundColor: '#45B76D',
                            color: '#fff', 
                            '&:hover': {
                                backgroundColor: '#3E9F5F', 
                            },
                            mt: 2, 
                            textAlign: 'center', 
                        }}
                    >
                        Submit Review
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default ReviewForm;
