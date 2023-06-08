// const mongoose = require('mongoose');
import mongoose from 'mongoose'
import colors from 'colors'

const dbConnection = async() =>{    
    try {        
        let conn = await mongoose.connect("mongodb://127.0.0.1:27017/socialMedia")
        console.log(`Database connected  on Host ${conn.connection.host}`.bgMagenta)
    } catch (error) {
        console.log("Error in connection")
    }
}
// module.exports = dbConnection;
export default dbConnection;

// mongoose.connect("mongodb://127.0.0.1:27017/usersData")


