import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config";
import initRoutes  from "./route";
require('dotenv').config();

const app = express();

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
initRoutes(app);
let port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
