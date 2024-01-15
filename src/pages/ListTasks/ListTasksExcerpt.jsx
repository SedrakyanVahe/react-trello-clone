import { useState } from 'react'
import { useGetListTasksQuery, useUpdateListTaskMutation } from '../../redux/listTasksSlice'
import { avatarImage } from '../../assets/imagesAssets/globalImages'
import { ListTaskModal } from './ListTaskModal'

export const ListTasksExcerpt = ({ boardId, boardListId, listTaskId }) => {
  const { data: listTasks } = useGetListTasksQuery({ boardId, boardListId })
  const listTask = listTasks.entities[listTaskId]
  const [updateListTask, { isLoading: isUpdating }] = useUpdateListTaskMutation()
  const [isListTaskModalOpen, setListTaskModalOpen] = useState(false)

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
          <ol className='card_avatars'>
            <li className='card_avatars_item'>
              <img src={avatarImage} alt='avatar' className='avatar_image' />
            </li>
          </ol>
        </ol>
      </li>

      {isListTaskModalOpen && (
        <ListTaskModal
          name={listTask?.name}
          description={listTask?.description}
          boardListId={boardListId}
          onClose={() => setListTaskModalOpen(false)}
          handleUpdateListTask={handleUpdateListTask}
        />
      )}
    </>
  )
}
