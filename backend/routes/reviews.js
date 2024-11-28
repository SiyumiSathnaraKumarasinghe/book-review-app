const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET /reviews: Retrieve all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /reviews: Create a new review
router.post('/', async (req, res) => {
    const review = new Review({
        bookTitle: req.body.bookTitle,
        author: req.body.author,
        rating: req.body.rating,
        reviewText: req.body.reviewText,
    });

    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /reviews/:id: Update a specific review
router.put('/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /reviews/:id: Delete a specific review
router.delete('/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
