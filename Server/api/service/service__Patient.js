import db from '../models/index';
import  sendEmail  from '../utils/email';
import { v4 as uuidv4} from 'uuid'
let urlEmail=(docID,token)=>{
    var result=`${process.env.APP_URL}/verify-booking?token=${token}&docID=${docID}`
    return result
}
export let handleBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email) {
                resolve({
                    errCode: 1,
                    msg: 'error'
                })
            } else {
               let token=uuidv4()
               await sendEmail({
                recivermail:data.email,
                patientName:data.fullName,
                time:data.timeString,
                docName:data.docName,
                confirmLink:urlEmail(data.docID,token),
                //link:'https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications'
               })
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleID: 'R3',
                        gender:data.selectGender,
                        address:data.address,
                        fullName:data.fullName
                    }
                })
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientID: user[0].id },
                        defaults: {
                            statusID: 'S1',
                            docID: data.docID,
                            patientID: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token:token
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    msg: 'Ok'
                })
            }

        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
}
export async function handleVerify(data){
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.token||!data.docID){
                resolve({
                    errCode:1,
                    msg:'not found params'
                })
            }else{
                let appointment=await db.Booking.findOne({
                    where:{
                        docID:data.docID,
                        token:data.token,
                        statusID:'S1'
                    },
                    raw:false
                })
                console.log(appointment);
                if(appointment){
                    appointment.statusID='S2'
                    await appointment.save()
                    resolve({
                        errCode:0,
                        msg:'Ok'
                    })
                }else{
                    resolve({
                        errCode:2,
                        msg:'Not Ok'
                    })
                }

            }
        } catch (e) {
            console.log(e);
            reject(e)
        }
    })

}