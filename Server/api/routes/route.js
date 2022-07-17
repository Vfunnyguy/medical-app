import express from 'express';
import homeController from '../controllers/homeController';
import userControl from '../controllers/userController'
import doctorController from '../controllers/doctorController'
import patientController from '../controllers/patientController'
let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/crud', homeController.getCrudPage);
  router.post('/post-crud', homeController.postCRUD);
  router.get('/get-crud', homeController.getCRUD);
  router.get('/edit-crud', homeController.editCRUD);
  router.post('/put-crud', homeController.putCRUD);
  router.get('/delete-crud', homeController.deleteCRUD);
  router.post('/api/login', userControl.handleLogin);
  router.get('/api/get-allUser', userControl.handleGetAllUser);
  router.post('/api/create-user', userControl.handleCreateUser);
  router.put('/api/editUser', userControl.handleEditUser);
  router.delete('/api/deleteUser', userControl.handleDeleteUser);
  router.get('/api/code', userControl.getCodeApi)
  router.get('/api/get-top-doctor', doctorController.getTopDoctors)
  router.get('/api/get-all-doctor', doctorController.getAllDoctors)
  router.post('/api/save-doc-info', doctorController.saveDoctorInfos)
  router.get('/api/get-doctor-byID', doctorController.getDoctorDetailById)
  router.post('/api/bulk-schedule-post', doctorController.bulkCreateSchedule)
  router.get('/api/get-schedule-byDate', doctorController.getScheduleByDate)
  router.get('/api/get-extra-info-byID', doctorController.getExtraInfo)
  router.get('/api/get-profile-doc-byID', doctorController.getProfileDoc)
  router.get('/api/get-patient-list', doctorController.getPatientList)
  router.post('/api/patient-booking-doctor',patientController.bookDoctor)
  router.post('/api/verify-booking',patientController.verifyBooking)

  return app.use('/', router);
};

module.exports = initWebRoutes;