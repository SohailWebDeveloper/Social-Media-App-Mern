import { REGISTER, LOGIN, POST, LOGOUT,DELETE_POST,EDIT_POST,COMMENT_DATA} from "./constant";
const initialState = {
  users: "",
  loggedInUser: null,
  user: "",
  post: [],
  logout: "",
  saving: "",
  getitem: "",
  comments:""
};
const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      console.log("SignUpUserCalled reducer called ________> ", action.payload);
      const updatedUsers =  action.payload;
      localStorage.setItem("userInfo", JSON.stringify(updatedUsers));
      return {
        ...state,
        users: updatedUsers,
      };
    case LOGIN:
      console.log("LoginCalled reducer called ________> ", action.payload);
      const loginUser = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(loginUser));
      return {
        ...state,
        user: loginUser,
      };
    case LOGOUT:
      console.log("Logout reducer called ________> ");
      localStorage.getItem("userInfo");
      return {
        ...state,

        logout: localStorage.removeItem("userInfo"),
      };
    case POST:
      console.log("PostCalled reducer called ________> ", action.payload);
      return {
        ...state,
        post: [...state.post, action.payload],
      };

      case DELETE_POST:
        console.log("Post_Delete1 reducer called ________> ", action.payload);
        return {
          ...state,
          post: [...state.post, action.payload],
        };
        case EDIT_POST:
        console.log("EditPost reducer called ________> ", action.payload);
        return {
          ...state,
          post: [...state.post, action.payload],
        };
        case COMMENT_DATA:
      console.log("CommentReducer called ________> ", action.payload);
      const postComments =  action.payload;
      return {
        ...state,
        comments: postComments,
      };
    default:
      return state;
  }
};

export default signupReducer;
