import React from 'react'
import { homeImage } from '../assets/imagesAssets/globalImages'

export const Home = () => {
  return (
    <>
      <div className='site'>
        <h1 className='site__title'>Fast paced way to grow your business</h1>
        <h2 className='site__subtitle'>Manage analytics like a boss</h2>
        <div className='site__box-link'>
          <a className='btn btn__width' href=''>
            Pricing
          </a>
          <a className='btn btn__revert btn__width' href=''>
            Contact
          </a>
        </div>
        <img className='site__img' src={homeImage} />
      </div>
    </>
  )
}
