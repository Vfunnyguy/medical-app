import db from '../models/index';
import  sendEmail  from '../utils/email';
export let handleBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            if (!data.email) {
                resolve({
                    errCode: 1,
                    msg: 'error'
                })
            } else {
               await sendEmail({
                recivermail:data.email,
                patientName:data.fullName,
                time:data.timeString,
                docName:data.docName,
                link:'https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications'
               })
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleID: 'R3'
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
                            timeType: data.timeType
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
