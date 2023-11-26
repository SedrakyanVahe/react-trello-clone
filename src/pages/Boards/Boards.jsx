import React, { useState } from 'react'
import BoardsList from './BoardsList'
import { AddBoardModal } from './AddBoardForm'

export const Boards = () => {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <>
      <section className='boards'>
        <div className='container boards_container'>
          <h2 className='boards_title'>Boards</h2>
          <button className='btn' onClick={() => setModalOpen(true)}>
            Add board
          </button>
          <BoardsList />
        </div>

        {isModalOpen && <AddBoardModal onClose={() => setModalOpen(false)} />}
      </section>
    </>
  )
}
