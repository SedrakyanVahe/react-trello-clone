import { useEffect, useState } from 'react'
import { useGetBoardUsersQuery, useGetBoardsQuery } from '../../redux/boardsSlice'
import { useParams } from 'react-router-dom'
import { NotFound } from '../NotFound'
import { BoardsListsList } from '../BoardLists/BoardsListsList'
import { AddBoardListForm } from '../BoardLists/AddBoardListForm'
import { AddUsersModal } from '../Users/AddUsersModal'

export const SingleBoard = () => {
  const { boardId } = useParams()
  let boardUsersList = []
  const [isAddBoardListModalOpen, setAddBoardListModalOpen] = useState(false)
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false)
  const { data: boardUsersObject } = useGetBoardUsersQuery({ boardId })
  const [boardUsers, setBoardUsers] = useState(boardUsersList)

  useEffect(() => {
    if (boardUsersObject) {
      const boardUsersList = Object.keys(boardUsersObject.entities).map(key => ({
        ...boardUsersObject.entities[key]
      }))

      setBoardUsers(boardUsersList)
    }
  }, [boardUsersObject])

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
          <div className='board_content_container_header'>
            <h2 className='board_content_title'>{board?.name}</h2>

            <div className='right'>
              <div className='board_users_list'>
                {
                  boardUsers.map(user => <h4 key={user.id}>{user.full_name[0]}</h4>)
                }
              </div>
              <button className='btn btn_green' onClick={() => setAddUserModalOpen(true)}>
                + Share
              </button>
            </div>
          </div>
          <section className='lists_container'>
            <BoardsListsList boardId={boardId} />

            <button className='add_list_btn btn' onClick={() => setAddBoardListModalOpen(true)}>
              Add a list
            </button>
          </section>
        </div>

        {isAddBoardListModalOpen && <AddBoardListForm boardId={boardId} onClose={() => setAddBoardListModalOpen(false)} />}
        {isAddUserModalOpen && <AddUsersModal boardId={boardId} onClose={() => setAddUserModalOpen(false)} />}
      </section>
    </>
  )
}
