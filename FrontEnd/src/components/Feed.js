import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import {
  PostData,
  DeletePostData,
  CommentData,
  DeleteCommentData,
} from "../Redux/action";
import {
  Favorite,
  FavoriteBorder,
  MoreVert,
  Share,
  Delete,
  Edit,
  ThumbsUpDown,
  ThumbUp,
  ThumbDown,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Avatar,
  TextField,
  CardActions,
  Button,
  CardHeader,
  Card,
  Checkbox,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
const Feed = () => {
  // const [loading, setLoading] = useState(true);
  const [postText, setPostText] = useState("");
  const [postData, setPostData] = useState(
    useSelector((state) => state.SignUpAbc.post)
  );
  const [commentText, setCommentText] = useState([]);
  const usersomething = useSelector((state) => state.SignUpAbc.users);
  const Comment = useSelector((state) => state.SignUpAbc.comments);
  // console.log(usersomething._id)
  // const post = useSelector((state) => state.SignUpAbc.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getPostData();
  }, [commentText,postData]);
  const postChange = (event) => {
    setPostText(event.target.value);
  };
  let userId = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(userId.name)

  const savepostHandler = async (e) => {
    let result = await fetch(
      `http://localhost:8000/api/v1/userpost/userPosting/${userId._id}`,
      {
        method: "POST",
        body: JSON.stringify({ postText }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.log(result);
    getPostData();
    // let oldData = { postText: postText };
    dispatch(PostData(result));
    setPostText("");
  };
  const commentHandler = async (id) => {
    let result = await fetch(
      `http://localhost:8000/api/v1/userpost/CommentPost/${id}/${userId._id}`,
      {
        method: "PUT",
        body: JSON.stringify({ commentText }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.log(result);
    // getPostData();
    // // let oldData = { postText: postText };
    dispatch(CommentData(result));
    setCommentText("");
  };
  // const getPostData = async () => {
  //   let resultPost = await fetch(
  //     `http://localhost:8000/api/v1/userpost/allPost/${userId._id}`
  //   );
  //   resultPost = await resultPost.json();
  //   setPostData(resultPost);
  // };
  const deleteComment = async (id) => {
    let result = await fetch(
      `http://localhost:8000/api/v1/userpost/unCommentPost/${postData._id}/${id}`,
      {
        method: "delete",
      }
    );
    result = await result.json();
    console.log(result);
    // dispatch(DeleteCommentData(result));
    // if (result) {
    //   getPostData();
    // }
  };
  const getPostData = async () => {
    let resultPost = await fetch(
      `http://localhost:8000/api/v1/userpost/allPost`
    );
    resultPost = await resultPost.json();
    setPostData(resultPost);
  };
  console.log(postData);
  const DeletePostSweet = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          deletePost(id);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };
  const deletePost = async (id) => {
    let result = await fetch(
      `http://localhost:8000/api/v1/userpost/deletePost/${id}`,
      {
        method: "delete",
      }
    );
    result = await result.json();
    console.log(result);
    dispatch(DeletePostData(result));
    if (result) {
      getPostData();
    }
  };

  const likePost = async (id) => {
    // e.preventDefault();
    let result = await fetch(
      `http://localhost:8000/api/v1/userpost/LikePost/${id}/${userId._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    result = await result.json();
    // dispatch(EditPostData(result))
    const newData = postData.map((item) => {
      if (item._id == result._id) {
        return result;
      } else {
        return item;
      }
    });
    setPostData(newData);
  };
  const unlikePost = async (id) => {
    // e.preventDefault();
    let result = await fetch(
      `http://localhost:8000/api/v1/userpost/unLikePost/${id}/${userId._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    result = await result.json();
    // dispatch(EditPostData(result))
    if (result) {
      navigate("/main");
    }
  };

  return (
    <>
      <Box flex={3} p={{ xs: 0, md: 2 }}>
        <TextField
          label="What,s on your mind"
          color="secondary"
          variant="filled"
          multiline
          fullWidth
          name="postText"
          onChange={postChange}
          value={postText}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "640px", marginTop: "10px" }}
          onClick={savepostHandler}
        >
          Post
        </Button>
        {postData.map((x) => {
          return (
            <>
              <Card sx={{ margin: 5 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  action={
                    <>
                      
                        {userId._id == x.userId._id ? 
                         ( 
                          <IconButton
                        aria-label="settings"
                        onClick={() => navigate(`/editPost/${x._id}`)}
                      >
                            <Edit />
                            </IconButton>
                         ):
                         <></>
                        }
                     
                     
                        {userId._id == x.userId._id ? (
                          <>
                           <IconButton
                        aria-label="settings"
                        onClick={() => DeletePostSweet(x._id)}
                      >
                            <Delete />
                            </IconButton>
                          </>
                        ) : (
                          <></>
                        )}
                      
                    </>
                  }
                  title={<p onClick={() => navigate(`/profile/${userId._id}`)}>{x.userId.name}</p>}
                  subheader={moment().format("MMMM Do YYYY, h:mm:ss a")}
                />

                <CardMedia
                  component="img"
                  height="20%"
                  image="https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80"
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {x.postText}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  {/* <Checkbox
                      icon={<FavoriteBorder />}
                      // checkedIcon={<Favorite sx={{ color: "red" }} />}
                      
                    /> */}
                  <p>{x.likes.length}</p>{" "}
                  {x.likes.includes(userId._id) ? (
                    <IconButton aria-label="add to favorites">
                      <IconButton aria-label="add to favorites">
                      {" "}
                      <ThumbUp onClick={() => unlikePost(x._id)} style={{color:"#0D6EFD"}} />
                    </IconButton>
                    </IconButton>
                  ) : (
                    <IconButton aria-label="add to favorites">
                      {" "}
                      <ThumbUp onClick={() => likePost(x._id)} />
                    </IconButton>
                  )}
                  {/* <Comments /> */}
                  {/* <div
                    className="card-footer py-3 border-0"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <div className="d-flex flex-start w-100">
                      <img
                        className="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                        alt="avatar"
                        width={40}
                        height={40}
                      />
                      <div className="form-outline w-100">
                        <textarea
                          className="form-control"
                          id="textAreaExample"
                          rows={4}
                          style={{ background: "#fff" }}
                          defaultValue={""}
                          onChange={(e) => setCommentText(e.target.value)}
                        />
                        <label className="form-label" htmlFor="textAreaExample">
                          Message
                        </label>
                      </div>
                    </div>
                    <div className="float-end mt-2 pt-1">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => commentHandler(x._id)}
                      >
                        Post comment
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div> */}
                  <IconButton aria-label="share">
                    <Share />
                  </IconButton>
                </CardActions>
                <TextField
                  label="Write a comment"
                  color="secondary"
                  variant="filled"
                  multiline
                  fullWidth
                  name="postText"
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "640px", marginTop: "10px" }}
                  onClick={() => commentHandler(x._id)}
                >
                  Comment
                </Button>
                {x.comments.length <= 0 ? (
                  ""
                ) : (
                  <>
                    <section>
                      {/* <div className=" my-0 py-1 text-dark">
                    <div className="row d-flex justify-content-center">
                      <div className="col-md-12 col-lg-12 col-xl-8"> */}
                      <Box flex={3} p={{ xs: 0, md: 2 }}>
                        <div
                          className="card mb-3"
                          style={{ boxShadow: "10px 10px 5px lightblue" }}
                        >
                          <div className="card-body">
                            <div className="d-flex flex-start">
                              <img
                                className="rounded-circle shadow-1-strong me-3"
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp"
                                alt="avatar"
                                width={40}
                                height={40}
                              />
                              <div className="w-100">
                                {x.comments.map((comment) => {
                                  return (
                                    <>
                                      <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h6 className="text-primary fw-bold mb-0">
                                         {comment.postedBy.name}
                                          <span className="text-dark ms-2">
                                            {comment.Text}
                                          </span>
                                        </h6>
                                        <p className="mb-0">2 days ago</p>
                                      </div>
                                      <div className="d-flex justify-content-between align-items-center">
                                        <p
                                          className="small mb-0"
                                          style={{ color: "#aaa" }}
                                        >
                                          {/* <a
                                            className="link-grey"
                                            onClick={()=>deleteComment(x._id)}
                                          >
                                            Remove
                                          </a> */}
                                        </p>
                                        <div className="d-flex flex-row">
                                          <i className="fas fa-star text-warning me-2" />
                                          <i
                                            className="far fa-check-circle"
                                            style={{ color: "#aaa" }}
                                          />
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Box>
                      {/* </div>
                    </div>
                  </div> */}
                    </section>
                  </>
                )}
              </Card>
            </>
          );
        })}
      </Box>
    </>
  );
};

export default Feed;
