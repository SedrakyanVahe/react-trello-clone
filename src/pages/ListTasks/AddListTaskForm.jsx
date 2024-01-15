import { useState } from 'react'
import { useAddNewListTaskMutation } from '../../redux/listTasksSlice'

export const AddListTaskForm = ({ boardId, boardListId, onClose }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [addNewListTask, { isLoading }] = useAddNewListTaskMutation()
  const onNameChanged = (e) => setName(e.target.value)
  const onDescriptionChanged = (e) => setDescription(e.target.value)

  const onSaveClicked = async (e) => {
    e.preventDefault()
    const canSave = !isLoading

    if (canSave) {
      try {
        await addNewListTask({ boardId, boardListId, data: { name, description } }).unwrap()
        setName('')
        setDescription('')
      } catch (e) {
        console.error('Failed to save the board: ', e)
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
            <h2>Add a new list task</h2>
            <button className='close_button' onClick={onClose}>
              &times;
            </button>
          </div>
          <div className='modal_content'>
            <div className='material_textfield'>
              <input type='text' placeholder='Name' value={name} onChange={onNameChanged} autoFocus />
              <label htmlFor='name'>Name</label>
            </div>
          </div>

          <div className='modal_content'>
            <div className='material_textfield'>
              <input type='text' placeholder='Description' value={description} onChange={onDescriptionChanged} />
              <label htmlFor='description'>Description</label>
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
