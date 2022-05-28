import express from "express";
import homeController from "../controllers/homeController";
import {handleLogin}from "../controllers/userController"
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCrudPage);
    router.post('/post-crud',homeController.postCRUD);
    router.get('/get-crud',homeController.getCRUD);
    router.get('/edit-crud',homeController.editCRUD);
    router.post('/put-crud',homeController.putCRUD);
    router.get('/delete-crud',homeController.deleteCRUD);
    router.post('/api/login',handleLogin)

    return app.use("/", router);
}

module.exports = initWebRoutes;