import db from '../models/index';
export let handleBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // if (!data.email || !data.docID || !data.date) {
            //     resolve({
            //         errCode: 1,
            //         msg: 'missing input'
            //     })
            // }
            // else {
            // }
            var user = await db.User.findOrCreate({
                where: { email: data.email },
                defaults: {
                    email: data.email,
                    roleID: 'R3'
                }
            })
            console.log(user);
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
        } catch (e) {
            reject(e)
        }
    })
}
