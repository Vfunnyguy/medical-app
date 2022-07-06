import db from '../models/index';

import _ from 'lodash'
var MAX_SCH = process.env.MAX_NUMBER_SCHEDULE
export var getTopDoctor = (limitIn) => {
  return new Promise(async (resolve, reject) => {
    try {
      var users = await db.User.findAll({
        limit: limitIn,
        where: {
          roleID: 'R2'
        },
        order: [
          ['createdAt', 'DESC']
        ],
        attributes: {
          exclude: ['password'],
        },
        include: [{
            model: db.Code,
            as: 'positionData',
            attributes: ['value_vi']
          },
          {
            model: db.Code,
            as: 'genderData',
            attributes: ['value_vi']
          },
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
        where: {
          roleID: 'R2'
        },
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
      console.log(dataInput.action);
      console.log(dataInput.docID);
      if (dataInput.action === 'create') {
        await db.MarkDown.create({
          docID: dataInput.docID,
          htmlContent: dataInput.htmlContent,
          markDownContent: dataInput.markDownContent,
          description: dataInput.description,
        });
      } else if (dataInput.action === 'edit') {
        let docMarkDown = await db.MarkDown.findOne({
          where: {
            docID: dataInput.docID
          },
          raw: false
        })
        if (docMarkDown) {
          docMarkDown.htmlContent = dataInput.htmlContent
          docMarkDown.markDownContent = dataInput.markDownContent
          docMarkDown.description = dataInput.description
          docMarkDown.updatedAt = new Date()
          await docMarkDown.save()
        }

      }
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
export function getDocById(inputID) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputID) {
        reject({
          errCode: -1,
          errMessage: 'Invalid input',
        });
      } else {
        var docData = await db.User.findOne({
          where: {
            id: inputID
          },
          attributes: {
            exclude: ['password'],
          },
          include: [{
              model: db.MarkDown,
              attributes: ['htmlContent', 'markDownContent', 'description']
            },
            {
              model: db.Code,
              as: 'positionData',
              attributes: ['value_vi']
            },
          ],
          raw: true,
          nest: true,
        });
        if (docData && docData.image) {
          docData.image = new Buffer(docData.image, 'base64').toString('binary');
        }
        if (!docData) docData = {}
        resolve({
          errCode: 0,
          data: docData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
export const bulkScheduleCreate = (dataInsert) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(dataInsert);
    
        let schedule = dataInsert.arrSchedule
        if (schedule && schedule.length > 0) {
          schedule = schedule.map(item => {
            item.maxNumber = 10
            return item
          })
        }
        console.log(schedule);
      
      let isExist = await db.Schedule.findAll({
        where: {
          docID: dataInsert.docID,
          date: dataInsert.formatDate
        },
        attributes: ['timeType', 'date', 'docID', 'maxNumber'],
        raw: true

      })
      if (isExist && isExist.length > 0) {
        isExist = isExist.map(item => {
          item.date = new Date(item.date).getTime()
          return item
        })
      }
      let toCreate = _.differenceWith(schedule,(a, b) => {
        return a.timeType === b.timeType && a.date === b.date
      })
      if(toCreate&& toCreate.length>0){

        await db.Schedule.bulkCreate(toCreate)
      }
      
      resolve({
        errCode: 0,
        errMessage: 'Ok'
      })
    } catch (e) {
      reject(e)
      console.log(e);
    }
  })

}
export function getSchDate(docID,date){
  return new Promise(async(resolve, reject) => {
    try {
      let scheduleDate=await db.Schedule.findAll({
        where:{
          docID:docID,
          date:date
        }
      })
      if(!scheduleDate)scheduleDate=[]
      resolve({
        errCode:0,
        data:scheduleDate
      })
    } catch (e) {
      console.log(e);
      reject(e)

    }
  })
}