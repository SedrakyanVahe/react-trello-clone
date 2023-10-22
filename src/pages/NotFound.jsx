import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <>
      <div className='not_found'>
        <h1 className='not_found_error_code'>404</h1>
        <div className='not_found_message'>Ooops!!! The page you are looking for is not found</div>
        <Link className='btn' to={'/'}>
          Back to home
        </Link>
      </div>
    </>
  )
}
