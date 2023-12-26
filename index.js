const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./Routes/user')
const noticeRoutes = require('./Routes/notice')

require('dotenv').config()

const app = express()
const PORT =process.env.PORT || 8000


app.use(express.json())
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})

app.use('/api/auth', authRoutes)
app.use('/api/notices', noticeRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on the ${PORT}`)
})