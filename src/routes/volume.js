const express = require('express')
const Volume = require('../models/volume.js')
const router = new express.Router()

//creates new volume in db
router.post('/volume', async (req, res) => {

    try {
        const volume = new Volume(req.body)
        await volume.save()

        res.status(201).send({volume})
    } catch(e) {
        res.status(500).send(e)
    }
})

//gives search results by name of the volume
router.get('/volume/:search', async (req, res) => {

    try {
        const volumes = await Volume.find({name: new RegExp(req.params.search, "i")})
        
        res.status(200).send(volumes)
    } catch(e) {
        res.status(500).send(e) 
    }
})

module.exports = router