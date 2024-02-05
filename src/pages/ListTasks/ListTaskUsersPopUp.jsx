import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useGetBoardUsersQuery } from '../../redux/boardsSlice'
import { useAssignUserToListTaskMutation } from '../../redux/listTasksSlice'

export const ListTaskUsersPopUp = ({ cardUsersList, boardListId, listTaskId }) => {
  const { boardId } = useParams()
  let boardUsersList = []
  const { data: boardUsersObject } = useGetBoardUsersQuery({ boardId })
  const [boardUsers, setBoardUsers] = useState(boardUsersList)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [assignUser] = useAssignUserToListTaskMutation()

  useEffect(() => {
    if (boardUsersObject) {
      const boardUsersList = Object.keys(boardUsersObject.entities).map((key) => ({
        ...boardUsersObject.entities[key],
      }))

      setBoardUsers(boardUsersList)
    }
  }, [boardUsersObject])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOverlayClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOverlayClick)

    return () => {
      document.removeEventListener('mousedown', handleOverlayClick)
    }
  }, [])

  const handleCheckboxChange = async (e, userId) => {
    try {
      await assignUser({ boardId, boardListId, listTaskId, userId }).unwrap()
    } catch (e) {
      console.error('Failed to save the board: ', e.data.error)
    }
  }

  return (
    <>
      <h4 className='members_title'>Members</h4>

      <div className='add_user_to_card_box'>
        <div ref={dropdownRef} className='add_users_dropdown'>
          <button onClick={toggleDropdown} type='button'>
            +
          </button>
          {isOpen && (
            <ul>
              {boardUsers.map((user) => (
                <li key={user.id}>
                  <span>{user?.full_name}</span>
                  <label className='checkbox_container'>
                    <input type='checkbox' onChange={(e) => handleCheckboxChange(e, user.id)} />
                    <span className='checkmark'></span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        <ol className='card_users_left'>
          {cardUsersList?.map((user) => (
            <li key={user.id} className='card_users_item'>
              {user.avatar ? <img src={user.avatar} alt='avatar' className='avatar_image' /> : <h4 key={user.id}>{user.full_name[0]}</h4>}
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
