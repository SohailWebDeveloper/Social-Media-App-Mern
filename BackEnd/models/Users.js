import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {type:String,required:true,trim:true},
    lName: {type:String,required:true,trim:true},
    email: {type:String,required:true,trim:true},
    password: {type:String,required:true,trim:true},
    confirm_password:{type:String,required:true,trim:true},
})

// module.exports = mongoose.model("user",userSchema)
export default mongoose.model("users",userSchema)

