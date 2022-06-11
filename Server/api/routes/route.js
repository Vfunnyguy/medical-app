import express from 'express';
import homeController from '../controllers/homeController';
// import {
//   handleLogin,
//   handleGetAllUser,
//   handleCreateUser,
//   handleEditUser,
//   handleDeleteUser,
//   getCodeApi
// } from '../controllers/userController';
import userControl from '../controllers/userController'
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
  router.get('/api/code',userControl.getCodeApi)

  return app.use('/', router);
};

module.exports = initWebRoutes;
