import express from "express";
import {
  postSubmitController,
  // postIdControllerBasedonUserID,
  postDeleteController,
  singlePostController,
  EditPostController,
  postGetControllerBasedonUserID,
  likePostController,
  unlikePostController,
  allpostGetController,
  CommentPostController,
  unCommentPostController
} from "../controllers/postController.js";

const router = express.Router();

router.post("/userPosting/:id", postSubmitController);
// router.post("/allPost", postIdControllerBasedonUserID);
router.get("/allPost/:id", postGetControllerBasedonUserID);
router.get("/allPost", allpostGetController);
router.delete("/deletePost/:id", postDeleteController);
router.get("/singlePost/:id", singlePostController);
router.put("/EditPost/:id", EditPostController);
router.put("/LikePost/:postId/:likeId", likePostController);
router.put("/unLikePost/:postId/:unlikeId", unlikePostController);
router.put("/CommentPost/:postId/:postedBy", CommentPostController);
router.put("/unCommentPost/:postId/:commentId", unCommentPostController);

export default router;
