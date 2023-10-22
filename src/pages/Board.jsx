import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { showBoard } from '../redux/boardsSlice'
import { Modal } from '../components/Modal'
import { addList, getCurrentBoardLists, updateListName } from '../redux/listsSlice'
import { List } from './List'

export const Board = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const { id } = useParams()
  const dispatch = useDispatch()
  const board = useSelector((state) => state.boards.currentBoard)
  const lists = useSelector((state) => state.lists.currentBoardLists)

  useEffect(() => {
    dispatch(showBoard(id))
    dispatch(getCurrentBoardLists(id))
  }, [dispatch, id])

  const handleAddList = (listName) => {
    dispatch(addList({ id: Date.now(), title: listName }))
  }

  const handleUpdateListName = (listName) => {
    dispatch(updateListName({ id: id, title: listName }))
  }

  return (
    <>
      <section className='board-content'>
        <div className='container board-content__container'>
          <h2 className='board-content__title'>{board?.title}</h2>
          <button className='btn' onClick={() => setModalOpen(true)}>
            +
          </button>
          <div className='lists'>
            {lists.map((list) => (
              <List key={list.id} title={list.title} onUpdateListName={handleUpdateListName} />
            ))}
          </div>
        </div>

        {isModalOpen && <Modal resource={'List'} onClose={() => setModalOpen(false)} onAddResource={handleAddList} />}
      </section>
    </>
  )
}
