import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetBoardsQuery, useUpdateBoardMutation, useDeleteBoardMutation } from '../../redux/boardsSlice'

export const BoardsExcerpt = ({ boardId }) => {
  const { board } = useGetBoardsQuery('getBoards', { selectFromResult: ({ data }) => ({ board: data?.entities[boardId] }) })
  const [updateBoard, { isLoading: isUpdating }] = useUpdateBoardMutation()
  const [deleteBoard] = useDeleteBoardMutation()
  const [editingBoardId, setEditingBoardId] = useState(null)
  const [boardName, setBoardName] = useState('')

  const startEditingBoard = (boardId, name) => {
    setEditingBoardId(boardId)
    setBoardName(name)
  }

  const stopEditingBoard = () => {
    setEditingBoardId(null)
    setBoardName('')
  }

  const handleNameChange = (e) => {
    setBoardName(e.target.value)
  }

  const onUpdateBoard = async (boardId) => {
    const canSave = boardName.trim() !== '' && !isUpdating

    if (canSave) {
      try {
        await updateBoard({ id: boardId, name: boardName }).unwrap()
      } catch (e) {
        console.error('Failed to save the board: ', e.data.error)
      }
    }

    stopEditingBoard()
  }

  const onDeleteBoardClicked = async () => {
    if (confirm('Are you sure?')) {
      try {
        await deleteBoard({ id: board?.id }).unwrap()
      } catch (e) {
        console.error('Failed to delete the board: ', e.data.error)
      }
    }
  }

  return (
    <>
      <div key={board.id} className='board'>
        {editingBoardId === board.id ? (
          <div className='material_textfield'>
            <input
              type='text'
              className='board_title_input'
              placeholder=' '
              value={boardName}
              onChange={handleNameChange}
              onBlur={() => onUpdateBoard(board.id)}
              autoFocus
            />

            <label htmlFor='resource'>Name</label>
          </div>
        ) : (
          <>
            <h3 className='board_title' onClick={() => startEditingBoard(board.id, board.name)}>
              {board.name}
            </h3>
            <div className='board_actions'>
              <Link className='btn' to={`${board.id}`}>
                Show
              </Link>
              <button className='btn btn_red' onClick={onDeleteBoardClicked}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
