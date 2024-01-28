const express=require('express');
const userRoute=require('./routes/userRoute')
const fileRoute=require('./routes/fileRoute')
const publicationRoute=require('./routes/publicationRoute')
const {connect}=require('./config/database')
const {errorMiddleware}=require('./middleware/error')
const cookieParser=require('cookie-parser')
const cloudinary=require('cloudinary')
const bodyParser=require("body-parser")
const fileUpload=require("express-fileupload")
var cors = require('cors')
require('dotenv').config({path:'./config/.env'})
//creating app 
const app=express()
//cors for using ports parallelly
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
  }))
//connecting to mongodb
connect()
//cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
//middleware to parse body json
app.use(express.json())
//middleware to parse cookie
app.use(cookieParser())
//body parser to parse body
app.use(bodyParser.urlencoded({extended:true}))

//file upload
app.use('/upload',fileRoute)
//fileUpload
app.use(fileUpload());


//routes
//user
app.use('/user',userRoute)
app.use('/publication',publicationRoute)
//middleware to handle the errors
app.use(errorMiddleware)
//this is to listen the requests
app.listen(process.env.PORT,()=>{
    console.log(`listening on port on http://localhost:${process.env.PORT}`)
})
//unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`)
    console.log(`Shutting down the server due to unhandled promise rejection`)
    server.close(()=>{
        process.exit(1)
    })
})