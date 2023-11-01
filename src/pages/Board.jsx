import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { transformObject } from '../helpers/helpers'
import { showBoard } from '../redux/boardsSlice'
import { Modal } from '../components/Modal'
import { addList, getCurrentBoardLists, updateListName } from '../redux/listsSlice'
import { addUser, getCurrentBoardUsers } from '../redux/usersSlice'
import { List } from './List'
import { Dropdown } from '../components/Dropdown'

export const Board = () => {
  const [isAddListModalOpen, setAddListModalOpen] = useState(false)
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false)
  const { id } = useParams()
  const dispatch = useDispatch()
  const board = useSelector((state) => state.boards.currentBoard)
  const lists = useSelector((state) => state.lists.currentBoardLists)
  const users = useSelector((state) => state.users.currentBoardUsers)
  const usersObject = transformObject(users, 'users')

  useEffect(() => {
    dispatch(showBoard(id))
    dispatch(getCurrentBoardLists(id))
    dispatch(getCurrentBoardUsers(id))
  }, [dispatch, id])

  const handleAddList = (listTitle) => {
    dispatch(addList({ id: Date.now(), title: listTitle }))
  }

  const handleUpdateListName = (listTitle) => {
    dispatch(updateListName({ id: id, title: listTitle }))
  }

  const handleAddUser = (email) => {
    dispatch(addUser({ id: Date.now(), boardId: id, listId: null, email: email }))
  }

  const handleSelect = (option) => {
    console.log(option)
  }

  return (
    <>
      <section className='board_content'>
        <div className='container'>
          <div className='board_header'>
            <h2 className='board_content_title'>{board?.title}</h2>

            <div className='board_users'>
              <button className='btn' onClick={() => setAddUserModalOpen(true)}>
                + Add a user
              </button>
              <Dropdown img='' title='Users' resource='users' options={Object.keys(usersObject)} onSelect={handleSelect} />
            </div>
          </div>
          <section className='lists_container'>
            {lists.map((list) => (
              <List key={list.id} listId={list.id} title={list.title} onUpdateListName={handleUpdateListName} />
            ))}

            <button className='add_list_btn btn' onClick={() => setAddListModalOpen(true)}>
              + Add a list
            </button>
          </section>
        </div>

        {isAddListModalOpen && <Modal resource={'List'} field='Title' onClose={() => setAddListModalOpen(false)} onAddResource={handleAddList} />}
        {isAddUserModalOpen && <Modal resource={'User'} field='Email' onClose={() => setAddUserModalOpen(false)} onAddResource={handleAddUser} />}
      </section>
    </>
  )
}
