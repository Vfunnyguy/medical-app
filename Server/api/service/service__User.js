import bcrypt from 'bcrypt'
import db from '../models/index';

import { checkEmailValid } from "../utils/valid"
export const handleUserLogin=(email,password)=>{
return new Promise(async(resolve, reject) => { 
  try {
      var userData={}
      let isExist=await checkEmailValid(email);
      if(isExist){
          let user=await db.User.findOne({
              attributes:['id','email','roleID','fullName','address',"password","phoneNumber",],
              where:{email:email},
             
          })
          if(user){
             let checkPass= bcrypt.compareSync(password,user.password)
             if(checkPass){
                 userData.errCode=0;
                 userData.errMessage="Login success";
                 delete user.dataValues.password;
                 userData.user=user;
             }else{
                 userData.errCode=3
                 userData.errMessage="Password is incorrect"
             }
          }else{
              userData.errCode=2
              userData.errMessage="User not found"
          }
        //  resolve()
      }else{
          userData.errCode=1
          userData.errMessage="User not exist"
      }
          resolve(userData)
  } catch (e) {
      reject(e)
  }
 })
}
