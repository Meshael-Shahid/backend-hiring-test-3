const express = require('express')
const ReadingPosition = require('../models/readingPosition')
const auth = require('../middleware/auth')
const router = new express.Router()

//Creates a reading position of a particular user against one volume
router.post('/position/:id/:position', auth, async (req, res) => {

    try {
        const alreadyExists = await ReadingPosition.findOne({owner: req.user._id, volume: req.params.id})

        if (alreadyExists) {
            alreadyExists.readingPosition =  req.params.position
            if (req.body.detail) {
                alreadyExists.detail = req.body.detail
            }
            await alreadyExists.save()
            return res.status(200).send(alreadyExists)
        }

        const readingPosition = new ReadingPosition({
            owner: req.user._id,
            volume: req.params.id,
            readingPosition: req.params.position,
            ...req.body
        })

        await readingPosition.save()
        res.status(201).send(readingPosition)
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router