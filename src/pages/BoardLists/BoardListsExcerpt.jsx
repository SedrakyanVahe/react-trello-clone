import { useState } from 'react'
import { useUpdateBoardListMutation, useDeleteBoardListMutation } from '../../redux/boardListsSlice'
import { Dropdown } from '../../components/Dropdown'
import { threeDots } from '../../assets/imagesAssets/globalImages'
import { ListTasksList } from '../ListTasks/ListTasksList'
import { AddListTaskForm } from '../ListTasks/AddListTaskForm'

export const BoardListsExcerpt = ({ boardId, boardListId, boardLists }) => {
  const boardList = boardLists.entities[boardListId]
  const [updateBoardList, { isLoading: isUpdating }] = useUpdateBoardListMutation()
  const [deleteBoardList] = useDeleteBoardListMutation()
  const [isEditing, setIsEditing] = useState(false)
  const [newBoardListName, setBoardListName] = useState(boardList.name)
  const [isModalOpen, setModalOpen] = useState(false)
  const options = { Remove: 'deleteList', Edit: 'editList' }

  const handleNameClick = () => {
    setIsEditing(true)
  }

  const handleNameChange = (e) => {
    setBoardListName(e.target.value)
  }

  const handleSelect = (option) => {
    const action = options[option]

    if (action && action === 'deleteList') {
      onDeleteBoardListClicked()
    }
  }

  const onUpdateBoardList = async () => {
    const canSave = newBoardListName.trim() !== '' && !isUpdating

    if (canSave) {
      try {
        await updateBoardList({ boardId, id: boardList?.id, data: { name: newBoardListName } }).unwrap()
      } catch (e) {
        console.error('Failed to save the board: ', e.data.error)
      }
    }

    setIsEditing(false)
  }

  const onDeleteBoardListClicked = async () => {
    if (confirm('Are you sure?')) {
      try {
        await deleteBoardList({ boardId, id: boardList?.id }).unwrap()
      } catch (e) {
        console.error('Failed to delete the board: ', e.data.error)
      }
    }
  }

  return (
    <>
      <div className='list'>
        <div className='list_header'>
          {isEditing ? (
            <div className='material_textfield'>
              <input
                type='text'
                className='list_title_input'
                value={newBoardListName}
                onChange={handleNameChange}
                onBlur={() => onUpdateBoardList()}
                autoFocus
              />
              <label htmlFor='resource'>Name</label>
            </div>
          ) : (
            <h3 className='list_title' onClick={handleNameClick}>
              {newBoardListName}
            </h3>
          )}

          <Dropdown img={threeDots} boardListName='' options={Object.keys(options)} onSelect={handleSelect} />
        </div>

        <ul className='list_items'>
          <ListTasksList boardId={boardId} boardListId={boardListId} boardLists={boardLists} />
        </ul>

        <button className='add_card_btn' onClick={() => setModalOpen(true)}>
          Add a card
        </button>

        {isModalOpen && <AddListTaskForm boardId={boardId} boardListId={boardListId} onClose={() => setModalOpen(false)} />}
      </div>
    </>
  )
}
