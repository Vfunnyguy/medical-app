import bcrypt from 'bcrypt';
import db from '../models/index';

import { checkEmailValid } from '../utils/valid';
export const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var userData = {};
      let isExist = await checkEmailValid(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ['id', 'email', 'roleID', 'fullName', 'address', 'password', 'phoneNumber'],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let checkPass = bcrypt.compareSync(password, user.password);
          if (checkPass) {
            userData.errCode = 0;
            userData.errMessage = 'Login success';
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = 'Password is incorrect';
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = 'User not found';
        }
        //  resolve()
      } else {
        userData.errCode = 1;
        userData.errMessage = 'User not exist';
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

export const getAllUser = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = [];
      if (userID === 'ALL') {
        userData = await db.User.findAll({
          attributes: ['id', 'email', 'roleID', 'fullName', 'address', 'phoneNumber'],
          raw: true,
        });
      }
      if (userID && userID !== 'ALL') {
        userData = await db.User.findOne({
          attributes: ['id', 'email', 'roleID', 'fullName', 'address', 'phoneNumber'],
          where: { id: userID },
          raw: true,
        });
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};
export const createUser =async  (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.create({
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
        fullName: user.Fname,
        address: user.address,
        gender: user.gender === '1' ? true : false,
        phoneNumber: user.phone,
        roleID: user.role,
      });
      resolve({ errCode: 0, errMessage: 'create success' });
    } catch (error) {
      reject(error);
    }
  });
};
export async function editUser(user){
    return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.fullName = data.Fname;
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
    }})
} 