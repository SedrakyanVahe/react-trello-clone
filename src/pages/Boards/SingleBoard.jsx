import React, { useEffect, useState } from 'react'
import { useGetBoardsQuery } from '../../redux/boardsSlice'
import { useParams } from 'react-router-dom'
import { NotFound } from '../NotFound'
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
// import { showBoard } from '../redux/boardsSlice'
// import { Modal } from '../components/Modal'
// import { addList, getCurrentBoardLists, updateListName } from '../redux/listsSlice'
// import { List } from './List'

export const SingleBoard = () => {
  // const [isModalOpen, setModalOpen] = useState(false)
  // const { id } = useParams()
  // const dispatch = useDispatch()
  // const board = useSelector((state) => state.boards.currentBoard)
  // const lists = useSelector((state) => state.lists.currentBoardLists)

  // useEffect(() => {
  //   dispatch(showBoard(id))
  //   dispatch(getCurrentBoardLists(id))
  // }, [dispatch, id])

  // const handleAddList = (listTitle) => {
  //   dispatch(addList({ id: Date.now(), title: listTitle }))
  // }

  // const handleUpdateListName = (listTitle) => {
  //   dispatch(updateListName({ id: id, title: listTitle }))
  // }

  const { boardId } = useParams()

  const { board, isLoading } = useGetBoardsQuery('getBoards', {
    selectFromResult: ({ data, isLoading }) => ({
      board: data?.entities[boardId],
      isLoading,
    }),
  })

  if (isLoading) return <p>Loading...</p>

  if (!board) {
    return <NotFound />
  }

  return (
    <>
      <section className='board_content'>
        <div className='container board_content_container'>
          <h2 className='board_content_title'>{board?.name}</h2>
          <section className='lists_container'>
            {/* {lists.map((list) => (
              <List key={list.id} listId={list.id} title={list.title} onUpdateListName={handleUpdateListName} />
            ))} */}

            <button className='add_list_btn btn' onClick={() => setModalOpen(true)}>
              Add a list
            </button>
          </section>
        </div>

        {/* {isModalOpen && <Modal resource={'List'} onClose={() => setModalOpen(false)} onAddResource={handleAddList} />} */}
      </section>
    </>
  )
}
