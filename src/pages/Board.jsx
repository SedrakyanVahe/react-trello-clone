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

  const handleAddList = (listTitle) => {
    dispatch(addList({ id: Date.now(), title: listTitle }))
  }

  const handleUpdateListName = (listTitle) => {
    dispatch(updateListName({ id: id, title: listTitle }))
  }

  return (
    <>
      <section className='board-content'>
        <div className='container board-content__container'>
          <h2 className='board-content__title'>{board?.title}</h2>
          <section className='lists-container'>
            {lists.map((list) => (
              <List key={list.id} listId={list.id} title={list.title} onUpdateListName={handleUpdateListName} />
            ))}

            <button className='add-list-btn btn' onClick={() => setModalOpen(true)}>
              Add a list
            </button>
          </section>
        </div>

        {isModalOpen && <Modal resource={'List'} onClose={() => setModalOpen(false)} onAddResource={handleAddList} />}
      </section>
    </>
  )
}
