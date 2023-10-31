import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { avatarImage } from '../assets/imagesAssets/globalImages'

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <header className='header'>
        <div className='container header_container'>
          <Link to={'/'} className='header_link'>
            <div className='header_logo'>
              <h1 className='header_title'>Trello</h1>
            </div>
          </Link>

          <div className='header_menu'>
            <nav id='navbar' className='header_nav collapse'>
              <ul>
                <li className='header_el'>
                  <Link to={'/'} className='header_link'>
                    Home
                  </Link>
                </li>
                <li className='header_el'>
                  <Link to={'/boards'} className='header_link'>
                    Boards
                  </Link>
                </li>
                <li className='header_el'>
                  <div className='myProfile'>
                    <div className='avatar'>
                      <img src={avatarImage} />
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </div>

          <div className='header_menu_mobile'>
            <input id='menu_toggle' type='checkbox' checked={menuOpen} onChange={toggleMenu} />
            <label className='menu_button_container' htmlFor='menu_toggle'>
              <div className='menu_button'></div>
            </label>
            <ul className='menu'>
              <li className='header_el' onClick={toggleMenu}>
                <Link to={'/'} className='header_link'>
                  Home
                </Link>
              </li>
              <li className='header_el' onClick={toggleMenu}>
                <Link to={'/boards'} className='header_link'>
                  Boards
                </Link>
              </li>
              <li className='header_el'>
                <div className='myProfile'>
                  <div className='avatar'>
                    <img src={avatarImage} />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  )
}
