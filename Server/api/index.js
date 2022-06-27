import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import morgan from 'morgan'
import viewEngine from "./config/viewEngine";
import initWebRoutes from './routes/route';
import connectDb from './config/connectDB'
require('dotenv').config();

const app = express();
app.use(cors({origin:true}))

//config app
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: true,limit:'50mb' }))
app.use(morgan('dev'))

viewEngine(app);
initWebRoutes(app);
connectDb()
let port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})
