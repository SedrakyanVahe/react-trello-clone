import React, { useState, useEffect, useRef } from 'react'

export const Dropdown = ({ img, title, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option) => {
    onSelect(option)
    toggleDropdown()
  }

  const handleOverlayClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOverlayClick)

    return () => {
      document.removeEventListener('mousedown', handleOverlayClick)
    }
  }, [])

  return (
    <div ref={dropdownRef} className='dropdown'>
      <button onClick={toggleDropdown}>
        {img && <img className='three_dots' src={img} />}
        {title && <strong style={{ border: '1px solid black', padding: '5px' }}>{title}...</strong>}
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
