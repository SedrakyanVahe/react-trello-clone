import React, { useState } from 'react'

export const CardModal = ({ title, description, onClose, onUpdateCard }) => {
  const [isTitleEditing, setIsTitleEditing] = useState(false)
  const [cardTitle, setCardTitle] = useState(title)
  const [isDescEditing, setIsDescEditing] = useState(false)
  const [cardDesc, setCardDesc] = useState(description)

  const handleTitleClick = () => {
    setIsTitleEditing(true)
  }

  const handleTitleBlur = () => {
    setIsTitleEditing(false)
  }

  const handleTitleChange = (e) => {
    setCardTitle(e.target.value)
  }

  const handleDescClick = () => {
    setIsDescEditing(true)
  }

  const handleDescBlur = () => {
    setIsDescEditing(false)
  }

  const handleDescChange = (e) => {
    setCardDesc(e.target.value)
  }

  const handleSave = () => {
    onUpdateCard(cardTitle, cardDesc)
    onClose()
  }

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='modal-header'>
          <h2>Update card</h2>

          <button className='close-button' onClick={onClose}>
            &times;
          </button>
        </div>
        <div className='modal-content'>
          {isTitleEditing ? (
            <input title='Name' type='text' value={cardTitle} onChange={handleTitleChange} onBlur={handleTitleBlur} autoFocus />
          ) : (
            <h3 title='Name' className='modal-resource-title' onClick={handleTitleClick}>
              {cardTitle}
            </h3>
          )}

          {isDescEditing ? (
            <textarea title='Description' type='text' value={cardDesc} onChange={handleDescChange} onBlur={handleDescBlur} autoFocus />
          ) : (
            <p title='Description' className='modal-resource-description' onClick={handleDescClick}>
              {cardDesc}
            </p>
          )}
        </div>

        <div className='modal-footer'>
          <button className='btn' onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
