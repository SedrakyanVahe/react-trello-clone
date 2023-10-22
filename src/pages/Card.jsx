import React, { useState } from 'react'

export const Card = ({ title }) => {
  return (
    <div className='card'>
      <p className='card__text'>{title}</p>
    </div>
  )
}
