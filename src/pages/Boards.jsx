import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addBoard, deleteBoard, updateBoardTitle } from '../redux/boardsSlice'
import { Modal } from '../components/Modal'

export const Boards = () => {
  const boards = useSelector((state) => state.boards.boardsList)
  const [isModalOpen, setModalOpen] = useState(false)
  const [editingBoardId, setEditingBoardId] = useState(null)
  const [boardTitle, setBoardTitle] = useState('')
  const dispatch = useDispatch()

  const handleAddBoard = (boardTitle) => {
    dispatch(addBoard({ id: Date.now(), title: boardTitle }))
  }

  const saveBoardTitle = (boardId) => {
    if (boardTitle.trim() !== '') {
      dispatch(updateBoardTitle({ id: boardId, title: boardTitle }))
    }

    stopEditingBoard()
  }

  const handleDeleteBoard = (boardId) => {
    if (confirm('Are you sure?')) {
      dispatch(deleteBoard(boardId))
    }
  }

  const startEditingBoard = (boardId, title) => {
    setEditingBoardId(boardId)
    setBoardTitle(title)
  }

  const stopEditingBoard = () => {
    setEditingBoardId(null)
    setBoardTitle('')
  }

  const handleTitleChange = (e) => {
    setBoardTitle(e.target.value)
  }

  return (
    <>
      <section className='boards'>
        <div className='container boards_container'>
          <h2 className='boards_title'>Boards</h2>
          <button className='btn' onClick={() => setModalOpen(true)}>
            Add board
          </button>
          {boards.map((board) => (
            <div key={board.id} className='board'>
              {editingBoardId === board.id ? (
                <>
                  <input
                    type='text'
                    className='board_title_input'
                    placeholder='Title'
                    value={boardTitle}
                    onChange={handleTitleChange}
                    onBlur={() => saveBoardTitle(board.id)}
                    autoFocus
                  />
                </>
              ) : (
                <>
                  <h3 className='board_title' onClick={() => startEditingBoard(board.id, board.title)}>
                    {board.title}
                  </h3>
                  <div className='board_actions'>
                    <Link className='btn' to={`${board.id}`}>
                      Show
                    </Link>
                    <button className='btn btn_red' onClick={() => handleDeleteBoard(board.id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {isModalOpen && <Modal resource={'Board'} onClose={() => setModalOpen(false)} onAddResource={handleAddBoard} />}
      </section>
    </>
  )
}
