let express = require("express")
let mongoose = require("mongoose")
const userRouter = require("./router/userRoute")
const errorHandler = require("./middlewares/errorHandler")
const categoryRouter = require("./router/categoryRoute")
const transactionRouter = require("./router/transactionRoute")
let cors = require('cors')
let app = express()
require("dotenv").config()
let path = require("path")

//? use clients
app.use(express.static(path.join(__dirname,'/client/dist')))
// app.get('*', (req,res)=>res.sendFile(path.join(__dirname,'/client/dist/index.html')))

//? middlewares
app.use(express.json())

//? cors configuration
let corsOption={
    origin:['http://localhost:5173'],
}
app.use(cors(corsOption))

//? connect to DB
mongoose.connect(process.env.DB_STRING)
.then(()=>{
    console.log("DB connected successfully.");
})
.catch((e)=>{
    console.log(e);
})

//? routes
app.use("/",userRouter)
app.use("/",categoryRouter)
app.use("/",transactionRouter)
app.use(errorHandler)

//? start the server
let port = 8000
app.listen(port,()=>{console.log(`Server is live on http://localhost:${port}`)})