import nodemailer from 'nodemailer'
require('dotenv').config()

async function sendEmail(data){
    try {
        const tranport=nodemailer.createTransport({
            service: "Gmail",
              auth: {
                user: `${process.env.MAIL_USER}`,
                pass: `${process.env.MAIL_PASS}`,
              },
              tls: {
                rejectUnauthorized: false,
              },
        })

        let info=await tranport.sendMail({
            from:`${process.env.MAIL_USER}`,
            to:data.recivermail,
            subject:'Thông tin đặt lịch khám bệnh',
            html:`
            <h1>Xin chào ${data.patientName}</h1>
            <p>Chúc mừng bạn đã đặt lịch khám thành công trên trang web của chúng tôi</p>
            <h4>Thông tin lịch khám</h4>
            <span>Thời gian: <b>${data.time}</b></span><br/>
            <span>Bác sĩ: <b>${data.docName}</b></span><br/>
            <a href='${data.confirmLink}'>Link xác nhận của bạn</a>
            <p>Xin chân thành  cảm ơn vì đã sủ dụng dịch vụ của chúng tôi</p>
            `
        })
        return info
    } catch (error) {
        console.log(error);
    }
}
export default sendEmail