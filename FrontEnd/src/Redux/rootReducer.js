import { combineReducers } from "redux";
import signupReducer from "./reducer";


const comReducer =  combineReducers({
    SignUpAbc: signupReducer    
})

export default comReducer;