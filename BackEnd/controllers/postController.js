import PostModel from "../models/Posts.js";
import express from "express";

export const postSubmitController = async (req, res) => {
  try {
    const {id} = req.params
    const { postText } = req.body;
    let post = new PostModel({ postText, userId:id });
    let result = await post.save();
    let populate=await PostModel.find({ _id: id }).populate("userId");
    res
      .status(200)
      .send({ result ,populate});
  } catch (error) {
    console.log(error);
  }
};

// export const postIdControllerBasedonUserID = async (req, res) => {
//   try {
//     const { id } = req.body;
//     let result = await PostModel.find({ _id: id }).populate("userId");
//     res.send(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const postGetControllerBasedonUserID = async (req, res) => {
  try {
    const { id } = req.params;
    let result = await PostModel.find({ userId: id });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};
export const allpostGetController = async (req, res) => {
  try {
    let result = await PostModel.find().populate("userId","_id name").populate("comments.postedBy","_id name");
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};
export const postDeleteController = async (req, res) => {
  try {
    let delPost = await PostModel.deleteOne({ _id: req.params.id });
    res.send({ success: true, message: "Post deleted Successfully", delPost });
  } catch (error) {
    console.log(error);
  }
};

export const singlePostController = async (req, res) => {
  try {
    let result = await PostModel.findOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};
export const EditPostController = async (req, res) => {
  try {
    let result = await PostModel.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send({ success: true, message: "Post edited Successfully", result });
  } catch (error) {
    console.log(error);
  }
};


export const likePostController = async(req,res) =>{
  try {
    const {postId,likeId} = req.params
    const postRestriction = PostModel.likes
    let result = await PostModel.updateOne(
      { _id: postId },
      { $push: {likes:likeId} }
    );

      res.send({ success: true, message: "Post Like Successfully", result });
    
   
  } catch (error) {
    console.log(error);
  }
}


export const unlikePostController = async(req,res) =>{
  try {
    const {postId,unlikeId} = req.params
    let result = await PostModel.updateOne(
      { _id: postId },
      { $pull: {likes:unlikeId} }
    );
    res.send({ success: true, message: "Post unLike Successfully", result });
  } catch (error) {
    console.log(error);
  }
}


export const CommentPostController = async(req,res) =>{
  try {
    const {commentText} = req.body
    const {postId,postedBy} = req.params
    let result = await PostModel.updateOne(
      { _id: postId },
      { $push: {comments:{Text:commentText,postedBy:postedBy}} },{new:true}
    ).populate("userId","_id name").populate("comments.postedBy","_id name");
   
    res.status(201).send({ success: true, message: "Comment Added Successfully", result });
  } catch (error) {
    console.log(error);
  }
}

export const unCommentPostController = async(req,res) =>{
  try {
    const{commentId} = req.params
    const {postId} = req.params
    let result = await PostModel.updateOne(
      { _id: postId },
      { $pull: {comments:{_id:commentId}} }
    );
    res.send({ success: true, message: "Comment Deleted Successfully", result });
  } catch (error) {
    console.log(error);
  }
}

