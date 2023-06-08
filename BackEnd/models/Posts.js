import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    postText: {type:String,required:true},
     userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users' // Assuming you have a User schema as well
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users' // Assuming you have a User schema as well
  }],
  comments: [{
    Text: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
}]
})

// module.exports = mongoose.model("post",userSchema)
export default mongoose.model("post",userSchema)

