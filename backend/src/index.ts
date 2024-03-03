import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL

app.use(express.json())

app.get('/', (req, res) => {
  res.send("hello")
})

mongoose.connect(MONGODB_URL)
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server live at http://localhost:${PORT}`) 
  }) 
})
.catch(err => {
  console.log(err)
  throw new Error(err)
})