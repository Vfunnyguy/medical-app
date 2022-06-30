import { getAllDoctor, getTopDoctor, saveDoctorInfo } from '../service/service_Doctor';
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
      let infoDoc= await saveDoctorInfo(req.body);
      return res.status(200).json(infoDoc);
    } catch (e) {
      return res.status(500).json({
        errCode: -1,
        message: 'Internal server error',
      });
      console.log(e);
    }
  },
};
export default doctorController;
