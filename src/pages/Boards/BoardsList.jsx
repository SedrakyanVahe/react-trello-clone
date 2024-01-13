import BoardsExcerpt from './BoardsExcerpt'
import { useGetBoardsQuery } from '../../redux/boardsSlice'

const BoardsList = () => {
  const { data: boards, isLoading, isSuccess, isError, error } = useGetBoardsQuery('getBoards')
  let content

  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = boards.ids.map((boardId) => <BoardsExcerpt key={boardId} boardId={boardId} />)
  } else if (isError) {
    content = <p>ERROR: {error}</p>
  }

  return <section>{content}</section>
}
export default BoardsList
