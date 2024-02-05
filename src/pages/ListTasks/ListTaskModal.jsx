import { useState } from 'react'
import { Dropdown } from '../../components/Dropdown'
import { useUpdateListTaskMutation } from '../../redux/listTasksSlice'
import { ListTaskUsersPopUp } from './ListTaskUsersPopUp'

export const ListTaskModal = ({ name, description, onClose, handleUpdateListTask, boardLists, boardId, boardListId, listTaskId, listTaskUsers }) => {
  const [isNameEditing, setIsNameEditing] = useState(false)
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false)
  const [listTaskName, setListTaskName] = useState(name)
  const [listTaskDescription, setListTaskDescription] = useState(description)
  const [updateListTask, { isLoading: isUpdating }] = useUpdateListTaskMutation()
  const transformedBoardLists = Object.values(boardLists?.entities)?.map(({ id, name, board_id }) => ({ id, name, board_id }))

  const handleNameClick = () => {
    setIsNameEditing(true)
  }

  const handleNameBlur = () => {
    setIsNameEditing(false)
  }

  const handleNameChange = (e) => {
    setListTaskName(e.target.value)
    console.log(listTaskName)
  }

  const handleDescriptionClick = () => {
    setIsDescriptionEditing(true)
  }

  const handleDescriptionBlur = () => {
    setIsDescriptionEditing(false)
  }

  const handleDescriptionChange = (e) => {
    setListTaskDescription(e.target.value)
    console.log(listTaskDescription)
  }

  const onSaveClick = () => {
    handleUpdateListTask(listTaskName, listTaskDescription)
    onClose()
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleListBoardChange = async (option) => {
    try {
      await updateListTask({ boardId: boardId, boardListId: boardListId, id: listTaskId, data: { board_list_id: option.id } }).unwrap()
    } catch (e) {
      console.error('Failed to save the board: ', e.data.error)
    }
  }

  return (
    <form action=''>
      <div className='modal_overlay' onClick={handleOverlayClick}>
        <div className='modal card_modal'>
          <div className='modal_header'>
            <h2>Update card</h2>

            <button className='close_button' onClick={onClose}>
              &times;
            </button>
          </div>
          <div className='modal_content'>
            {isNameEditing ? (
              <div className='material_textfield'>
                <input
                  title='Name'
                  className='modal_resource_title_input'
                  cols='50'
                  type='text'
                  value={listTaskName}
                  onChange={handleNameChange}
                  onBlur={handleNameBlur}
                  autoFocus
                />
                <label htmlFor='resource'>Name</label>
              </div>
            ) : (
              <h3 title='Name' className='modal_resource_title' onClick={handleNameClick}>
                {listTaskName}
              </h3>
            )}

            {isDescriptionEditing ? (
              <div className='material_textfield'>
                <input
                  title='Description'
                  type='text'
                  placeholder='Add a more detailed description...'
                  value={listTaskDescription}
                  onChange={handleDescriptionChange}
                  onBlur={handleDescriptionBlur}
                  autoFocus
                />
                <label htmlFor='resource'>Description</label>
              </div>
            ) : (
              <p title='Description' className='modal_resource_description' onClick={handleDescriptionClick}>
                {!!listTaskDescription ? listTaskDescription : 'Add a more detailed description...'}
              </p>
            )}

            <div className='modal_resource_list' style={{ padding: '1rem' }}>
              <Dropdown img='' title='Lists' options={transformedBoardLists} onSelect={handleListBoardChange} />
            </div>

            <ListTaskUsersPopUp cardUsersList={listTaskUsers} boardListId={boardListId} listTaskId={listTaskId} />
          </div>

          <div className='modal_footer'>
            <button className='btn' onClick={onSaveClick}>
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
