import React, { useState } from 'react'

export const Modal = ({ resource, onClose, onAddResource }) => {
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

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='modal-header'>
          <h2>Add a New {resource}</h2>
          <button className='close-button' onClick={onClose}>
            &times;
          </button>
        </div>
        <div className='modal-content'>
          <label htmlFor='resource'> Name: </label>
          <input type='text' id='resource' value={resourceName} onChange={handleNameChange} />
        </div>
        <div className='modal-footer'>
          <button className='btn' onClick={handleAddClick}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
