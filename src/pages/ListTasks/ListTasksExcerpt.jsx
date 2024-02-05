import { useEffect, useState } from 'react'
import { useGetListTaskUsersQuery, useUpdateListTaskMutation } from '../../redux/listTasksSlice'
import { avatarImage } from '../../assets/imagesAssets/globalImages'
import { ListTaskModal } from './ListTaskModal'

export const ListTasksExcerpt = ({ boardId, boardListId, listTaskId, listTasks, boardLists }) => {
  const listTask = listTasks.entities[listTaskId]
  const [updateListTask, { isLoading: isUpdating }] = useUpdateListTaskMutation()
  const [isListTaskModalOpen, setListTaskModalOpen] = useState(false)

  const { data: listTaskUsersObject } = useGetListTaskUsersQuery({ boardId, boardListId, listTaskId })
  let listTaskUsersList = []
  const [listTaskUsers, setListTaskUsers] = useState(listTaskUsersList)

  useEffect(() => {
    if (listTaskUsersObject) {
      const listTaskUsers = Object.keys(listTaskUsersObject.entities).map((key) => ({
        ...listTaskUsersObject.entities[key],
      }))

      setListTaskUsers(listTaskUsers)
    }
  }, [listTaskUsersObject])

  const handleUpdateListTask = async (listTaskName, listTaskDescription) => {
    try {
      await updateListTask({
        boardId: boardId,
        boardListId: boardListId,
        id: listTask?.id,
        data: { name: listTaskName, description: listTaskDescription },
      }).unwrap()
    } catch (e) {
      console.error('Failed to save the board: ', e.data.error)
    }
  }

  return (
    <>
      <li onClick={() => setListTaskModalOpen(true)} className='list_item'>
        <span className='card_tag card_tag_browser'>Browser</span>
        <h6 className='card_title'>{listTask?.name}</h6>
        <ol className='card_actions'>
          {listTask?.description && <span className='bold'>...</span>}
          <ol className='card_users'>
            {listTaskUsers?.map((user) => (
              <li key={user.id} className='card_users_item'>
                {user.avatar ? <img src={user.avatar} alt='avatar' className='avatar_image' /> : <h4 key={user.id}>{user.full_name[0]}</h4>}
              </li>
            ))}
          </ol>
        </ol>
      </li>

      {isListTaskModalOpen && (
        <ListTaskModal
          name={listTask?.name}
          description={listTask?.description}
          onClose={() => setListTaskModalOpen(false)}
          handleUpdateListTask={handleUpdateListTask}
          boardLists={boardLists}
          boardId={boardId}
          boardListId={boardListId}
          listTaskId={listTask?.id}
          listTaskUsers={listTaskUsers}
        />
      )}
    </>
  )
}
