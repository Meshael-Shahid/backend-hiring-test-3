const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, (error) => {
    if (error) console.log(error)
    console.log('Database Connected!')
})