import React from 'react'

export const NotFound = ({ title }) => {
  return (
    <>
      <div class='not_found'>
        <h1 class='not_found_error_code'>404</h1>
        <div class='not_found_message'>Ooops!!! The page you are looking for is not found</div>
        <a class='btn' href='#!'>
          Back to home
        </a>
      </div>
    </>
  )
}
