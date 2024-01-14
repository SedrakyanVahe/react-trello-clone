import { useState } from 'react'
import { useGetBoardsQuery } from '../../redux/boardsSlice'
import { useParams } from 'react-router-dom'
import { NotFound } from '../NotFound'
import { BoardsListsList } from '../BoardLists/BoardsListsList'
import { AddBoardListForm } from '../BoardLists/AddBoardListForm'

export const SingleBoard = () => {
  const [isModalOpen, setModalOpen] = useState(false)
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
            <BoardsListsList boardId={boardId} />

            <button className='add_list_btn btn' onClick={() => setModalOpen(true)}>
              Add a list
            </button>
          </section>
        </div>

        {isModalOpen && <AddBoardListForm boardId={boardId} onClose={() => setModalOpen(false)} />}
      </section>
    </>
  )
}
