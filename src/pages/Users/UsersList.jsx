import { useEffect, useState } from 'react'
import { useGetUsersQuery } from '../../redux/usersSlice'
import { useAssignUserMutation } from '../../redux/boardsSlice'
import { useParams } from 'react-router-dom'

export default function UsersList() {
  const { boardId } = useParams()
  let usersList = []
  const { data: usersObject, isLoading, isSuccess, isError, error } = useGetUsersQuery()
  const [assignUser] = useAssignUserMutation()

  const [users, setUsers] = useState(usersList)

  useEffect(() => {
    if (usersObject) {
      const usersList = Object.keys(usersObject.entities).map(key => ({
        ...usersObject.entities[key]
      }))

      setUsers(usersList)
    }
  }, [usersObject])

  const onAddUserBtnClicked = async (e, userId) => {
    try {
      await assignUser({ boardId, userId }).unwrap()
    } catch (e) {
      console.error('Failed to save the board: ', e)
    }
  }

  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }

  if (isLoading) {
    return <p>Loading...</p>
  } else {
    return (
      <div className='users_list_wrapper'>
        <ul className='users_list'>
          {users.map(user => (
            <li key={user.id} className='users_list_item'>
              <div className='users_list_item_content'>
                <h3 className="users_list_item_first_letter" style={{ backgroundColor: getRandomColor() }}>
                  {user.full_name[0]}
                </h3>
                <h4 className='users_list_item_email'>{user.full_name} | </h4>
                <h4 className='users_list_item_email'>{user.email}</h4>
              </div>


              <button type='button' className='btn btn_blue' onClick={e => onAddUserBtnClicked(e, user.id)}>Add to card</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
