import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import appRouter from './routes/index.js'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL

app.use(express.json())
app.use(morgan("dev"))
app.use(appRouter)

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