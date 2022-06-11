import express from 'express'
import chatControl from './controller/chat'
var route=express.Router()
const initRoutes=(app)=>{
    route.get('/webhook',chatControl.getWebHook)
    route.post('/webhook',chatControl.postWebHook)
    route.get('/',chatControl.test)
    return app.use('/',route)
}
export default initRoutes