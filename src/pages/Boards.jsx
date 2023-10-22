import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addBoard, deleteBoard } from '../redux/boardsSlice'
import { Modal } from '../components/Modal'

export const Boards = () => {
  const boards = useSelector((state) => state.boards.boardsList)
  const [isModalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()

  const handleAddBoard = (boardName) => {
    dispatch(addBoard({ id: Date.now(), title: boardName }))
  }

  const handleDeleteBoard = (boardId) => {
    if (confirm('Are you sure?')) {
      dispatch(deleteBoard(boardId))
    }
  }

  return (
    <>
      <section className='boards'>
        <div className='container boards__container'>
          <h2 className='boards__title'>Boards</h2>
          <button className='btn' onClick={() => setModalOpen(true)}>
            +
          </button>
          {boards.map((board) => (
            <div key={board.id} className='board'>
              <Link to={`${board.id}`}>
                <h3 className='board__title'>{board.title}</h3>
              </Link>
              <button className='btn btn__red' onClick={() => handleDeleteBoard(board.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>

        {isModalOpen && <Modal resource={'Board'} onClose={() => setModalOpen(false)} onAddResource={handleAddBoard} />}
      </section>
    </>
  )
}
