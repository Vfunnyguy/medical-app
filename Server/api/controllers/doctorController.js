import {
  getAllDoctor,
  getTopDoctor,
  saveDoctorInfo,
  getDocById,
  bulkScheduleCreate,
  getSchDate,
  getDocExtra,
  getDocProfileById
} from '../service/service_Doctor';
const doctorController = {
  getTopDoctors: async (req, res) => {
    var limit = req.query.limit || 10;
    try {
      let docs = await getTopDoctor(+limit);
      return res.status(200).json(docs);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        errCode: -1,
        message: 'Internal server error',
      });
    }
  },
  getAllDoctors: async (req, res) => {
    try {
      const doc = await getAllDoctor();
      return res.status(200).json(doc);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        errCode: -1,
        message: 'Internal server error',
      });
    }
  },
  saveDoctorInfos: async (req, res) => {
    try {
      let infoDoc = await saveDoctorInfo(req.body);
      return res.status(200).json(infoDoc);
    } catch (e) {
      return res.status(500).json({
        errCode: -1,
        message: 'Internal server error',
      });
      
    }
  },
  getDoctorDetailById: async (req, res) => {
    try {
      let docInfo = await getDocById(req.query.id);
      return res.status(200).json(docInfo);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        errCode: -1,
        message: 'Internal server error',
      });
    }
  },
  bulkCreateSchedule: async (req, res) => {
    try {
      let schedule = await bulkScheduleCreate(req.body)
      return res.status(200).json(schedule)

    } catch (e) {
      console.log(e);
      return res.status(500).json({
        errCode: -1,
        message: 'Internal server error'
      })
    }
  },
  getScheduleByDate: async (req, res) => {
    try {
      let data= await getSchDate(req.query.docID, req.query.date)
      return res.status(200).json(data)
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        errCode: -1,
        message: 'Server error'
      })
    }
  },
  getExtraInfo:async(req,res)=>{
    try {
      let response=await getDocExtra(req.query.docID)
      return res.status(200).json(response)
    } catch (e) {
      console.log(e);
      return res.status(500).send('server error')
    }
  },
  getProfileDoc:async(req,res)=>{
    try {
      let data=await getDocProfileById(req.query.docID)
      return res.status(200).json(data)
    } catch (e) {
      return res.status(500).json({
        errCode:1,
        errMsg:'error from server',e
      })
    }
  }
};

export default doctorController;