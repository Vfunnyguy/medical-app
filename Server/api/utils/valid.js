import db from '../models/index';
export function checkEmailValid(UserEmail) {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: UserEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
}
export function compareUserPass(userPass){
return new Promise(async(resolve, reject) => { 
   try {
       
   } catch (error) {
       reject(error)
   }
 })
}