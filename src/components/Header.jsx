import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <>
      <header className='header'>
        <div className='container header_container'>
          <Link to={'/'} className='header_link'>
            <div className='header_logo'>
              <h1 className='header_title'>Trello</h1>
            </div>
          </Link>

          <label htmlFor='menu-toggle' className='mobile-menu-icon'>
            <div className='bar bar_1'></div>
            <div className='bar bar_2'></div>
            <div className='bar bar_3'></div>
          </label>
          <div className='header_menu'>
            <nav id='navbar' className='header_nav collapse'>
              <ul className='header_elenco'>
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
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
