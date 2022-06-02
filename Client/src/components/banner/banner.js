import React from 'react'
import TypeWriterEffect from 'react-typewriter-effect';

const Banner = () => {
  const banner_img='https://bookingcare.vn/assets/anh/bookingcare-cover-4.jpg'
  
  return (
    <div className="banner hero is-halfheight is-small">
    <section className='banner-img' >
     <img alt='banner'src={banner_img}/>
    </section>
    <section className='banner-text has-text-centered is-uppercase fw-bold has-text-white-ter'>
       <TypeWriterEffect
        startDelay={2000}
        cursorColor="#fff"
        multiText={[
          'Medical Booking',
          'Nền tảng Y Tế chăm sóc sức khỏe ',
          'Đặt Lịch Khám',
          'Tận Tình Chu Đáo',
          'Chuyên  Sâu và Tổng Quát',
        ]}
        multiTextDelay={1000}
        typeSpeed={30}
      />
    </section>
    
    </div>
  )
}

export default Banner