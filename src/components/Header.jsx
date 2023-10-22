import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <>
      <header className='header'>
        <div className='container header__container'>
          <Link to={'/'} className='header__link'>
            <div className='header__logo'>
              <h1 className='header__title'>Trello</h1>
            </div>
          </Link>

          <label htmlFor='menu-toggle' className='mobile-menu-icon'>
            <div className='bar bar--1'></div>
            <div className='bar bar--2'></div>
            <div className='bar bar--3'></div>
          </label>
          <div className='header__menu'>
            <nav id='navbar' className='header__nav collapse'>
              <ul className='header__elenco'>
                <li className='header__el'>
                  <Link to={'/'} className='header__link'>
                    Home
                  </Link>
                </li>
                <li className='header__el'>
                  <Link to={'/boards'} className='header__link'>
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
