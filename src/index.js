const express = require('express')
require('./db/mongoose')
const userRoutes  = require('./routes/user.js')
const volumeRoutes  = require('./routes/volume.js')
const reviewRoutes  = require('./routes/review.js')
const bookShelfRoutes  = require('./routes/bookshelf.js')
const readingPositionRoutes  = require('./routes/readingPosition.js')

const app = express()
const port = process.env.PORT

app.use(express.json())

//routes
app.use(userRoutes)
app.use(volumeRoutes)
app.use(reviewRoutes)
app.use(bookShelfRoutes)
app.use(readingPositionRoutes)
 
app.listen(port, (error) => {
    if (error) console.log(error)
    console.log(`Server is listening on PORT: ${port}`)
})