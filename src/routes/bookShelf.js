const express = require('express')
const auth = require('../middleware/auth')
const BookShelf = require('../models/bookshelf')
const router = new express.Router()

//creates a new bookshelf for a particular user
router.post('/bookshelf', auth, async (req, res) => {

    try {
        const duplicateShelf = await BookShelf.findOne({owner: req.user._id, name: req.body.name})

        if(duplicateShelf) {
            return res.status(400).send("Bookshelf already exists!")
        }
        
        const bookShelf = new BookShelf({
            ...req.body,
            owner: req.user._id
        })

        await bookShelf.save()
        res.status(201).send(bookShelf)
    } catch(e) {
        res.status(500).send(e)
    }
})

//Gets all the bookshelves of a user
router.get('/bookshelf', auth, async (req, res) => {

    try {
        const bookshelves = await BookShelf.find({owner: req.user._id})

        res.status(200).send(bookshelves)
    } catch (e) {
        res.status(500).send(e)
    }
})

//displays a particular bookshelf
router.get('/bookshelf/:id', auth, async (req, res) => {

    try {
        const bookshelf = await BookShelf.findOne({_id: req.params.id, owner: req.user._id})
        res.status(200).send(bookshelf)
    } catch (e) {
        res.status(500).send(e)
    }
})

//updates the bookshelf
router.patch('/bookshelf/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'private', 'volumes']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates'
        })
    }

    try {
        const bookshelf = await BookShelf.findOne({_id: req.params.id, owner: req.user._id})

        if(!bookshelf) {
            return res.status(400).send("Bookshelf not found!")
        }

        updates.forEach((update) => {
            bookshelf[update] = req.body[update]
        })

        await bookshelf.save()
        res.status(200).send(bookshelf)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Deletes a bookshelf
router.delete('/bookshelf/:id', auth, async (req, res) => {
    
    try {
        const bookshelf = await BookShelf.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if (!bookshelf) {
            return res.status(404).send('Bookshelf not found!')
        }

        res.status(200).send("Bookshelf deleted!")
    } catch (e) {
        res.status(500).send(e)
    }
})

//Gets all the public bookshelves of a user
router.get('/bookshelves', async (req, res) => {

    try {
        const bookshelves = await BookShelf.find({private: false})
        res.status(200).send(bookshelves)
    } catch (e) {
        res.status(500).send(e)
    }
  
})

module.exports = router