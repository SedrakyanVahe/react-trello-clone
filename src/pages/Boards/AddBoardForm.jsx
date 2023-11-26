import React, { useState } from 'react'
import { useAddNewBoardMutation } from '../../redux/boardsSlice'

export const AddBoardModal = ({ onClose }) => {
  const [name, setName] = useState('')
  const [addNewBoard, { isLoading }] = useAddNewBoardMutation()

  const onNameChanged = (e) => setName(e.target.value)

  const onSaveBoardClicked = async () => {
    const canSave = [name].every(Boolean) && !isLoading

    if (canSave) {
      try {
        await addNewBoard({ name }).unwrap()
        setName('')
        onClose()
      } catch (err) {
        console.error('Failed to save the post', err)
      }
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
          <h2>Add a new board</h2>
          <button className='close_button' onClick={onClose}>
            &times;
          </button>
        </div>
        <div className='modal_content'>
          <div className='material_textfield'>
            <input type='text' placeholder=' ' id='name' value={name} onChange={onNameChanged} onKeyDown={handleKeyPress} autoFocus />
            <label htmlFor='name'>Name</label>
          </div>
        </div>
        <div className='modal_footer'>
          <button className='btn' onClick={onSaveBoardClicked}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
