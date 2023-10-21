import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <>
      <header class='header'>
        <div class='container header__container'>
          <div class='header__logo'>
            <h1 class='header__title'>Trello</h1>
          </div>

          <label for='menu-toggle' class='mobile-menu-icon'>
            <div class='bar bar--1'></div>
            <div class='bar bar--2'></div>
            <div class='bar bar--3'></div>
          </label>
          <div class='header__menu'>
            <nav id='navbar' class='header__nav collapse'>
              <ul class='header__elenco'>
                <li class='header__el'>
                  <Link to={'/'} class='header__link'>
                    Home
                  </Link>
                </li>
                <li class='header__el'>
                  <Link to={'/boards'} class='header__link'>
                    Boards
                  </Link>
                </li>
                <li class='header__el header__el--blue'>
                  <Link href='' class='btn btn--white'>
                    Sign In →
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
