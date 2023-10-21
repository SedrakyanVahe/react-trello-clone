import React from 'react'
import { homeImage } from '../assets/imagesAssets/globalImages'

export const Home = () => {
  return (
    <>
      <div class='sect sect--padding-top'>
        <div class='container'>
          <div class='row'>
            <div class='col-md-12'>
              <div class='site'>
                <h1 class='site__title'>Fast paced way to grow your business</h1>
                <h2 class='site__subtitle'>Manage analytics like a boss</h2>
                <div class='site__box-link'>
                  <a class='btn btn--width' href=''>
                    Pricing
                  </a>
                  <a class='btn btn--revert btn--width' href=''>
                    Contact
                  </a>
                </div>
                <img class='site__img' src={homeImage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
