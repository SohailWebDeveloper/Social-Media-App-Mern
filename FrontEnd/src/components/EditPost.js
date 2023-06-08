import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditPostData } from "../Redux/action";
import { useDispatch, useSelector } from "react-redux";
const EditPost = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { id } = useParams();
  const [postText, setPostText] = useState("");
  const getUserData = async () => {
    // console.log(params)
    let result = await fetch(`http://localhost:8000/api/v1/userpost/singlePost/${id}`);
    result = await result.json();
    setPostText(result.postText);
  };

  useEffect(() => {
    getUserData();
  }, []);
  // Updating / Editing Data on the basis of dynamic id user clicked
  const updatingData = async (e) => {
    e.preventDefault();
    let result = await fetch(`http://localhost:8000/api/v1/userpost/EditPost/${id}`, {
      method: "PUT",
      body: JSON.stringify({ postText }),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    result = await result.json();
    dispatch(EditPostData(result))

      navigate("/main");
    
  };
  return (
    <div>
      {" "}
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">User Registration Form</h1>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="m-sm-4">
                    <form>
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          onChange={(e) => setPostText(e.target.value)}
                          className="form-control form-control-lg"
                          type="text"
                          name="name"
                          value={postText}
                          // placeholder="Enter your name"
                        />
                      </div>
                      <div className="text-center mt-3">
                        <button
                          onClick={updatingData}
                          to="/main"
                          className="btn btn-lg btn-primary"
                        >
                          Edit Post
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
