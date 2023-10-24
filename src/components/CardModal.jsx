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
    <div className='modal_overlay'>
      <div className='modal card_modal'>
        <div className='modal_header'>
          <h2>Update card</h2>

          <button className='close_button' onClick={onClose}>
            &times;
          </button>
        </div>
        <div className='modal_content'>
          {isTitleEditing ? (
            <input title='Name' className='modal_resource_title_input' cols="50" type='text' value={cardTitle} onChange={handleTitleChange} onBlur={handleTitleBlur} autoFocus />
          ) : (
            <h3 title='Name' className='modal_resource_title' onClick={handleTitleClick}>
              {cardTitle}
            </h3>
          )}

          {isDescEditing ? (
            <textarea title='Description' type='text' placeholder='Add a more detailed description...' value={cardDesc} onChange={handleDescChange} onBlur={handleDescBlur} autoFocus />
          ) : (
            <p title='Description' className='modal_resource_description' onClick={handleDescClick}>
              {!!cardDesc ? cardDesc : 'Add a more detailed description...'}
            </p>
          )}
        </div>

        <div className='modal_footer'>
          <button className='btn' onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
