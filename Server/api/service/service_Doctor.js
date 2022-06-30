import db from '../models/index';

export var getTopDoctor = (limitIn) => {
  return new Promise(async (resolve, reject) => {
    try {
      var users = await db.User.findAll({
        limit: limitIn,
        where: { roleID: 'R2' },
        order: [['createdAt', 'DESC']],
        attributes: {
          exclude: ['password'],
        },
        include: [
          { model: db.Code, as: 'positionData', attributes: ['value_vi'] },
          { model: db.Code, as: 'genderData', attributes: ['value_vi'] },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (error) {
      reject(error);
    }
  });
};
export let getAllDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      var docData = await db.User.findAll({
        where: { roleID: 'R2' },
        attributes: {
          exclude: ['password', 'image'],
        },
      });
      resolve({
        errCode: 0,
        data: docData,
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const saveDoctorInfo = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.MarkDown.create({
        docID: dataInput.docID,
        htmlContent: dataInput.htmlContent,
        markDownContent: dataInput.markDownContent,
        description: dataInput.description,
      });
      resolve({
        errCode: 0,
        errMessage: 'save success',
      });
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
};
