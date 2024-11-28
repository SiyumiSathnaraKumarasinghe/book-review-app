import React, { useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Paper,
    Box,
} from '@mui/material';

const ReviewList = ({ reviews, setReviews }) => {
    const [searchQuery, setSearchQuery] = useState('');

    
    const filteredReviews = reviews.filter((review) =>
        review.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.reviewText.toLowerCase().includes(searchQuery.toLowerCase())
    );

    
    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5000/reviews/${id}`)
            .then(() => {
                setReviews(reviews.filter((review) => review._id !== id));
            })
            .catch((error) => {
                console.error('Error deleting review:', error);
            });
    };

    return (
        <Box sx={{ width: '60%', margin: '2rem auto' }}>
            
            <Box sx={{ marginBottom: '1rem' }}>
                <TextField
                    label="Search Reviews"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        width: '50%',
                        marginLeft: '0.5in',
                        marginBottom: '1rem',
                        backgroundColor: 'white',
                        borderRadius: '15px',
                        '& .MuiOutlinedInput-root': {
                        boxShadow: 'none', 
                        borderRadius: '15px', 
                        '& fieldset': {
                        border: 'none', 
                            },
                        },
                    }}
                />
            </Box>

            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: '15px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    padding: '1rem',
                }}
            >
                <Table>
                    <TableHead sx={{ backgroundColor: '#81d4fa'}}>
                        <TableRow>
                            <TableCell><strong>Book Title</strong></TableCell>
                            <TableCell><strong>Author</strong></TableCell>
                            <TableCell><strong>Rating</strong></TableCell>
                            <TableCell><strong>Review Text</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredReviews.map((review) => (
                            <TableRow key={review._id}>
                                <TableCell>{review.bookTitle}</TableCell>
                                <TableCell>{review.author}</TableCell>
                                <TableCell>{review.rating}</TableCell>
                                <TableCell>{review.reviewText}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(review._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ReviewList;
