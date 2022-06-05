import { Dispatch } from "redux";
import { getAPI,postAPI } from "@/fetch";
const [email,password]=loginState
export const Login=async(loginState)=>{
    return await postAPI('login',{email:loginState.email,password:loginState.password})
}