import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../components/Header'

export const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const currentUrl = location.pathname

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!mobileMenu)
  }

  return (
    <div className={`${currentUrl !== '/' ? 'flex' : ''} ${isMobileMenuOpen ? 'scroll-blocked' : ''}`}>
      <div className={'main-body'}>
        <Header handleMobileMenu={handleMobileMenu} />
        <Outlet />
      </div>
    </div>
  )
}
