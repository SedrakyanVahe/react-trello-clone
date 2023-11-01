import { useState } from 'react'

export const Modal = ({ resource, field, onClose, onAddResource }) => {
  const [resourceName, setResourceName] = useState('')

  const handleNameChange = (e) => {
    setResourceName(e.target.value)
  }

  const handleAddClick = () => {
    if (resourceName.trim() !== '') {
      onAddResource(resourceName)
      onClose()
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && resourceName.trim() !== '') {
      onAddResource(resourceName)
      onClose()
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className='modal_overlay' onClick={handleOverlayClick}>
      <div className='modal'>
        <div className='modal_header'>
          <h2>Add a New {resource}</h2>
          <button className='close_button' onClick={onClose}>
            &times;
          </button>
        </div>
        <div className='modal_content'>
          <div className='material_textfield'>
            <input type='text' placeholder=' ' id='{field}' value={resourceName} onChange={handleNameChange} onKeyDown={handleKeyPress} autoFocus />
            <label htmlFor='resource'>{field}</label>
          </div>
        </div>
        <div className='modal_footer'>
          <button className='btn' onClick={handleAddClick}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
