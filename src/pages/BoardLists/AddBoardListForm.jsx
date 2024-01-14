import { useState } from 'react'
import { useAddNewBoardListMutation } from '../../redux/boardListsSlice'

export const AddBoardListForm = ({ boardId, onClose }) => {
  const [name, setName] = useState('')
  const [addNewBoardList, { isLoading }] = useAddNewBoardListMutation()
  const onNameChanged = (e) => setName(e.target.value)

  const onSaveClicked = async () => {
    const canSave = [name].every(Boolean) && !isLoading

    console.log(boardId)
    console.log(name)

    if (canSave) {
      try {
        await addNewBoardList({ boardId, data: { name } }).unwrap()
        setName('')
        onClose()
      } catch (e) {
        console.error('Failed to save the board: ', e)
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
          <h2>Add a new board list</h2>
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
  )
}
