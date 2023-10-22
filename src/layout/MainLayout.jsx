import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../components/Header'

export const MainLayout = () => {
  return (
    <>
      <Header />
      <div className='sect sect--padding-top'>
        <div className='container'>
          <div className='col-md-12'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
