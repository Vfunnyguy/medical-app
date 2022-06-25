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
          attributes: ['id', 'email', 'roleID', 'fullName', 'password'],
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
export const createUser = async (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkEmail = await checkEmailValid(user.email);
      if (checkEmail === true) {
        resolve({
          errCode: 1,
          errMessage: 'Email is exist',
        });
      } else {
        await db.User.create({
          email: user.email,
          password: await bcrypt.hash(user.password, 10),
          fullName: user.Fname,
          address: user.address,
          phoneNumber: user.phone,
          gender: user.gender,
          roleID: user.role,
          positionID:user.position
        });
        resolve({ errCode: 0, errMessage: 'create success' });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteUser = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userID },
      });
      if (!user) {
        resolve({ errCode: 1, errMessage: 'User not found' });
      }
      if (user) {
        await user.destroy();
      }
      resolve({ errCode: 0, errMessage: 'Delete success' });
    } catch (e) {
      reject(e);
    }
  });
};
export async function editUser(data) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({ errCode: 2, errMessage: 'missing id' });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.fullName = data.Fname;
        user.phoneNumber = data.phone;
        user.email = data.email;
        user.address = data.address;
        await user.save();
        // await db.User.save({
        //   fullName:data.Fname,
        //   phoneNumber:data.phone,
        //   email:data.email,
        //   address:data.address,
        // })

        resolve({
          errCode: 0,
          errMessage: 'Update success',
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: 'User not found',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
}
export const getCode = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: 'missing typeInput',
        });
      } else {
        let codeData = {};
        let code = await db.Code.findAll({
          where: { type: typeInput },
        });
        codeData.errCode = 0;
        codeData.errMessage = 'Get code success';
        codeData.data = code;
        resolve(codeData);
      }
    } catch (error) {
      reject(error);
    }
  });
};
