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
            from:`Booking Medical`,
            to:data.recivermail,
            subject:'Thông tin đặt lịch khám bệnh',
            html:`
            <h1>Xin chào ${data.patientName}</h1>
            <p>Chúc mừng bạn đã đặt lịch khám thành công trên trang web của chúng tôi</p>
            <h4>Thông tin lịch khám</h4>
            <span>Thời gian: <b>${data.time}</b></span><br/>
            <span>Bác sĩ: <b>${data.docName}</b></span><br/>
            <p>Bạn vui lòng thanh toán hóa đơn và gửi bill thanh toán vào mail này để nhận link khám trực tuyến</p>
            <b> Số tài khoản 0909088656</b>
            <a href='${process.env.GG_MEET_LINK}'>Link khám trực tuyến của bạn</a>
            <p>Xin chân thành  cảm ơn vì đã sủ dụng dịch vụ của chúng tôi</p>
            `
        })
        return info
    } catch (error) {
        console.log(error);
    }
}
export default sendEmail