import { REGISTER,LOGIN,POST,LOGOUT,DELETE_POST,EDIT_POST,COMMENT_DATA } from "./constant"

export const SignUpData = (payload) =>{
    console.log("action called ________> ", payload)
    return{
        type: REGISTER,
        payload: payload
        
    }

}
export const loginData = (payload) =>{
    console.log("login action called ________> ", payload)
    return{
        type: LOGIN,
        payload: payload        
    }

}
export const Logout = () =>{
    // console.log("LOGOUT action called ________> ", payload)
    return{
        type: LOGOUT,
        // payload: payload        
    }

}
export const PostData = (payload) =>{
    console.log("Create Postaction called ________> ", payload)
    return{
        type: POST,
        payload: payload
        
    }

    
}

export const DeletePostData = (payload) =>{
    console.log("Delete post action called ________> ", payload)
    return{
        type: DELETE_POST,
        payload: payload
        
    }

    
}

export const EditPostData = (payload) =>{
    console.log("Edit post action called ________> ", payload)
    return{
        type: EDIT_POST,
        payload: payload
        
    }

    
}
export const CommentData = (payload) =>{
    console.log("Comment action called ________> ", payload)
    return{
        type: COMMENT_DATA,
        payload: payload
        
    }

    
}

