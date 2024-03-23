import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import appRouter from './routes/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(cors({
  origin : function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
    callback(null, true);
  },
  credentials : true
}))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(appRouter) 

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

// res.cookie function is used to automatically set cookie in the browser cookie storage!!