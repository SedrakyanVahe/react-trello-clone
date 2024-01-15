import { useState } from 'react'
import { useAddNewBoardMutation } from '../../redux/boardsSlice'

export const AddBoardForm = ({ onClose }) => {
  const [name, setName] = useState('')
  const [addNewBoard, { isLoading }] = useAddNewBoardMutation()
  const onNameChanged = (e) => setName(e.target.value)

  const onSaveClicked = async () => {
    const canSave = [name].every(Boolean) && !isLoading

    if (canSave) {
      try {
        await addNewBoard({ name }).unwrap()
        setName('')
      } catch (e) {
        console.error('Failed to save the board: ', e.data.error)
      }
    }

    onClose()
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <form>
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
              <input type='text' placeholder=' ' id='name' value={name} onChange={onNameChanged} autoFocus />
              <label htmlFor='name'>Name</label>
            </div>
          </div>
          <div className='modal_footer'>
            <button className='btn' onClick={onSaveClicked}>
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
