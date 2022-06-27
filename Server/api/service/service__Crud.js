import bcrypt from 'bcrypt';
import db from '../models/index';
export const createdNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.create({
        email: data.email,
        password: await bcrypt.hash(data.password, 10),
        fullName: data.fullName,
        address: data.address,
        gender: data.gender === '1' ? true : false,
        phoneNumber: data.phone,
        roleID: data.role,
      });
      resolve('create user success!');
    } catch (error) {
      reject(error);
    }
  });
};
export const getUserInfo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let getUser = await db.User.findAll({
        raw: true,
      });
      resolve(getUser);
    } catch (e) {
      reject(e);
    }
  });
};
export function getUserbyId(userID) {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userID },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
}
export var updateUserData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      console.log(data);
      if (user) {
        user.fullName = data.fullName;
        user.phoneNumber = data.phone;
        user.email = data.email;
        user.address = data.address;
        await user.save();
        resolve()
      }else{
        resolve();

      }
      //  await db.User.update({

      //  })
    } catch (error) {
      console.log(error);
    }
  });
};
export const deleteUser =  (userID) => {
return new Promise(async(resolve, reject) => { 
  try{
    let user=await db.User.findOne({
      where:{id:userID}
    })
    if(user){
      await user.destroy();
    }
      resolve();
  }catch(error){
    reject(error);
  }
})

}
