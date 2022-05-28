
import { checkEmailValid } from "../utils/valid"
export const handleUserLogin=(email,password)=>{
return new Promise(async(resolve, reject) => { 
  try {
      var userData={}
      let isExist=await checkEmailValid(email);
      if(isExist){
          resolve()
      }else{
          userData.errCode=1
          userData.errMessage="Email not exist"
          resolve(userData)
      }
  } catch (e) {
      reject(e)
  }
 })
}
