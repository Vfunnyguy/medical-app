import React from 'react'
import MetVideo from './metVideo'
import Spectality from './spectality'
import Clinic from './clinic'
import Doctor from './doctor'
const Carousel = () => {
  return (
    <div className='carousel'>
    <h3 className='fs-18 fw-bold mt-1 title is-3 is-capitalized'>Bác Sĩ Từ xa qua video</h3>
    <MetVideo/>
    <h3 className='fs-18 fw-bold mt-1 title is-3 is-capitalized'>chuyên khoa đặc biệt</h3>
    <Spectality/>
    <h3 className='fs-18 fw-bold mt-1 title is-3 is-capitalized'>cơ sở y tế </h3>
    <Clinic/>
    <h3 className='fs-18 fw-bold mt-1 title is-3 is-capitalized'>Bác sĩ nổi bật </h3>
    <Doctor/>
    </div>
  )
}

export default Carousel