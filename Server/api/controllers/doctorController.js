import {getTopDoctor} from '../service/service_Doctor'
const doctorController={
    getTopDoctors:async(req,res)=>{
        var limit =req.query.limit||10
        try {
            let docs =await getTopDoctor(+limit)
            return res.status(200).json(docs)
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errCode:-1,
                message:'Internal server error'
            }
            )
        }
    }
}
export default doctorController