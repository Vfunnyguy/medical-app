import React from 'react'
import { Link } from 'react-router-dom'
import { error_img } from '@/utils'
const Notfound = () => {
  return (
     <section id='notfound'>
      <div className='notfound'>
        <div className='notfound-img'>
        <img src={error_img} alt="404" />
        <h2>Page Not Found</h2>
        </div>
        <Link to="/">
          Về trang chủ
        </Link>
      </div>
    </section>
  )
}

export default Notfound