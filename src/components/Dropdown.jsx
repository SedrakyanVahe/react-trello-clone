import { useState, useEffect, useRef } from 'react'
import { getRandomColor } from '../helpers/helpers'

export const Dropdown = ({ img, title, resource, options, onSelect }) => {
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
        {title && <strong className='dropdown_title'>{title}...</strong>}
      </button>
      {isOpen && (
        <ul className='dropdown_options'>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {resource === 'users' ? (
                <div className='user_avatar' style={{ backgroundColor: getRandomColor() }}>
                  {option[0]}
                </div>
              ) : (
                option
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
