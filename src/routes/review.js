const express = require('express')
const Review = require('../models/review')
const auth = require('../middleware/auth')
const router = new express.Router()

//creates a review against a volume
router.post('/review/:id', auth, async (req, res) => {

    try {
        if (!req.body.rating && ! req.body.comment) {
            return res.status(400).send('Atleast one field required.')
        }

        const duplicateReview = await Review.findOne({owner: req.user._id, volume: req.params.id})

        if (duplicateReview) {
            return res.status(400).send('Only one review per volume.')
        }

        const review = new Review({
            ...req.body,
            owner: req.user._id,
            volume: req.params.id
        })

        await review.save()
        res.status(201).send({review})
    } catch(e) {
        res.status(500).send(e)
    }
})

//returns reviews of a particular volume
router.get('/reviews/:id', async (req, res) => {

    try {
        const reviews = await Review.find({volume: req.params.id})

        if (reviews.length === 0) {
            return res.status(400).send("No reviews found!")
        }
        
        res.status(200).send(reviews)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router