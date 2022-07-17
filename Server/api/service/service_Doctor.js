import db from '../models/index';

import _ from 'lodash'
import Code from '../models/Code';
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
      let anotherDocInfo = await db.DocInfo.findOne({
        where: {
          docID: dataInput.docID
        },
        raw: false
      })

      if (anotherDocInfo) {
        anotherDocInfo.docID = dataInput.docID
        anotherDocInfo.priceID = dataInput.selectPrice
        anotherDocInfo.paymentID = dataInput.selectPayment
        anotherDocInfo.nameClinic = dataInput.nameClinic
        anotherDocInfo.addressClinic = dataInput.addressClinic
        anotherDocInfo.note = dataInput.note
        await anotherDocInfo.save()
      } else {
        await db.DocInfo.create({
          docID: dataInput.docID,
          priceID: dataInput.selectPrice,
          paymentID: dataInput.selectPayment,
          nameClinic: dataInput.nameClinic,
          addressClinic: dataInput.addressClinic,
          note: dataInput.note
        })
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
          {
            model: db.DocInfo,
            attributes: { exclude: ['id', 'docID'] },
            include: [
              { model: db.Code, as: 'priceTypeData', attributes: ['value_vi'] },
              { model: db.Code, as: 'paymentTypeData', attributes: ['value_vi'] }
            ]
          }
          ],
          raw: false,
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
      let schedule = dataInsert.arrSchedule
      if (schedule && schedule.length > 0) {
        schedule = schedule.map(item => {
          item.maxNumber = 10
          return item
        })
      }


      let isExist = await db.Schedule.findAll({
        where: {
          docID: dataInsert.docID,
          date: dataInsert.formatDate
        },
        attributes: ['timeType', 'date', 'docID', 'maxNumber'],
        raw: true

      })

      let toCreate = _.differenceWith(schedule, isExist, (a, b) => {
        return a.timeType === b.timeType && +a.date === +b.date
      })
      if (toCreate && toCreate.length > 0) {

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
export function getSchDate(docID, date) {
  return new Promise(async (resolve, reject) => {
    try {
      let scheduleDate = await db.Schedule.findAll({
        where: {
          docID: docID,
          date: date
        },
        include: [{
          model: db.Code,
          as: 'timeTypeData',
          attributes: ['value_vi']
        },
        { model: db.User, as: 'docData', attributes: ['fullName'] }
        ],
        raw: false,
        nest: true
      })

      if (!scheduleDate) scheduleDate = []
      resolve({
        errCode: 0,
        data: scheduleDate
      })
    } catch (e) {
      console.log(e);
      reject(e)

    }
  })
}
export var getDocExtra = (inputID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.DocInfo.findOne({
        where: {
          docID: inputID
        },
        attributes: {
          exclude: ['id', 'docID']
        },
        include: [
          { model: db.Code, as: 'priceTypeData', attributes: ['value_vi'] },
          { model: db.Code, as: 'paymentTypeData', attributes: ['value_vi'] }
        ],
        raw: false,
        nest: true
      })
      if (!data) data = []
      resolve({
        errCode: 0,
        data: data
      })
    } catch (error) {
      reject(error)
      console.log(error);
    }
  })
}
export let getDocProfileById = (inputID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findOne({
        where: {
          id: inputID
        },
        attributes: {
          exclude: ['password']
        },
        include: [
          {
            model: db.MarkDown,
            attributes: ['description', 'htmlContent', 'markDownContent']
          },
          { model: db.Code, as: 'positionData', attributes: ['value_vi'] },
          {
            model: db.DocInfo,
            attributes: {
              exclude: ['id', 'docID']
            },
            include: [
              { model: db.Code, as: 'priceTypeData', attributes: ['value_vi'] },
              { model: db.Code, as: 'paymentTypeData', attributes: ['value_vi'] }
            ]

          }
        ],
        raw: false,
        nest: true,
      })
      if (data && data.image) {
        data.image = new Buffer(data.image, 'base64').toString('binary')
      }
      if (!data) data = []
      resolve({
        errCode: 0,
        data: data
      })
    } catch (e) {
      reject(e)
      console.log(e);
    }
  })
}
export let getPatient = (docID, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!docID || !date) {
        resolve({
          errCode: 1,
          msg: 'not found'
        })
      } 
      else {
        let data = await db.Booking.findAll({
          where: {
            statusID: 'S2',
            docID: docID,
            date: date
          },
          include: [
            {
              model: db.User, as: 'patientData',
              attributes: ['email', 'fullName', 'gender'],
              include: [{
                model: db.Code, as: 'genderData', attributes: ['value_vi']
              }]
            },
            { model: db.Code, as: 'timeTypeDataPatient', attributes: ['value_vi'] }
          ],
          raw: false,
          nest: true
        })
        resolve({
          errCode: 0,
          data: data
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}