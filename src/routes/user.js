const express = require('express')
const User = require('../models/user.js')
const auth = require('../middleware/auth')
const router = new express.Router()
 
//Create new user in the db
router.post('/users',  async (req, res) => {

    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()

        res.status(201).send({user, token})
    } catch(e) {
        res.status(500).send(e)
    }
})
 
//User login
router.post('/users/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({user, token})
    } catch (e) {
        res.status(400).send(e.toString())
    }
})
 
//User logout
router.post('/users/logout', auth, async (req, res) => {

    try {
        req.user.tokens = []
        await req.user.save()
        
        res.status(200).send("Logged out")
    } catch (e) {
        res.status(500).send(e)
    }
})
 
//display user details
router.get('/users/me', auth, async (req, res) => {
    res.status(200).send(req.user)
})

module.exports = router