import { useGetListTasksQuery } from '../../redux/listTasksSlice'
import { ListTasksExcerpt } from './ListTasksExcerpt'

export const ListTasksList = ({ boardId, boardListId }) => {
  const { data: listTasks, isLoading, isSuccess, isError, error } = useGetListTasksQuery({ boardId, boardListId })
  let content

  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = listTasks.ids.map((listTaskId) => (
      <ListTasksExcerpt key={listTaskId} boardId={boardId} boardListId={boardListId} listTaskId={listTaskId} listTasks={listTasks} />
    ))
  } else if (isError) {
    content = <p>ERROR: {error}</p>
  }

  return <>{content}</>
}
