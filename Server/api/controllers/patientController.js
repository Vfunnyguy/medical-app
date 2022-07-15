
import { handleBooking,handleVerify } from '../service/service__Patient'
const patientController = {
   bookDoctor: async (req, res) => {
      try {
         let data = await handleBooking(req.body)
         return res.status(200).json(data)
      } catch (e) {
         console.log(e);
         res.status(500).send('error')
      }
   },
   verifyBooking:async(req,res)=>{
      try {
         let verifyData=await handleVerify(req.body)
         return res.status(200).json(verifyData)
      } catch (e) {
         console.log(e);
         res.status(500).send('error')
      }
   }
}
export default patientController