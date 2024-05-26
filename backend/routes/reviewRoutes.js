const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Crear review
router.post('/', async (req, res) => {
    console.log('Received POST request:', req.body);
    const newReview = new Review(req.body);
    try {
        const savedReview = await newReview.save();
        console.log('Saved review:', savedReview);
        res.status(201).json(savedReview);
    } catch (err) {
        console.log('Error saving review:', err.message);
        res.status(400).json({ message: err.message });
    }
});

// Obtener reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        console.log('Error fetching reviews:', err.message);
        res.status(500).json({ message: err.message });
    }
});

// Actualizar review
router.put('/:id', async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedReview);
    } catch (err) {
        console.log('Error updating review:', err.message);
        res.status(400).json({ message: err.message });
    }
});

// Eliminar review
router.delete('/:id', async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Review deleted' });
    } catch (err) {
        console.log('Error deleting review:', err.message);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
