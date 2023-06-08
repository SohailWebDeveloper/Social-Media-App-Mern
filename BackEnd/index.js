import express from 'express'
import dbConnection from './db/config.js'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/authRoute.js'
import postRoute from './routes/postRoute.js'
const app = express();
app.use(express.json());
dbConnection();
dotenv.config();
app.use(cors());


// posting data in MongoDb
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/auth",authRoute)
// posting Post data in MongoDb
app.use("/api/v1/userpost",postRoute)
// get Post data in MongoDb
app.use("/api/v1/userpost",postRoute)
// deleting Post data in MongoDb
app.use("/api/v1/userpost",postRoute)
// Getting User Data from MongoDb on the basis of Id (dynamic Id)
app.use("/api/v1/userpost",postRoute)
//Updated the post
app.use("/api/v1/userpost",postRoute)

const port = process.env.port || 8000

app.listen(port,()=>{
    console.log(`Server started at PORT ${port}`)
})


// updating User Data on the basis of Id (params id)

