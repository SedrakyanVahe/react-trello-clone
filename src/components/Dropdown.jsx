import React, { useState } from 'react'

export const Dropdown = ({ img, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option) => {
    onSelect(option)
    toggleDropdown()
  }

  return (
    <div className='dropdown'>
      <button onClick={toggleDropdown}>
        <img className='three_dots' src={img} />
      </button>
      {isOpen && (
        <ul className='dropdown_options'>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
