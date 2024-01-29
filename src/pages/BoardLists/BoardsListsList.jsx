import { BoardListsExcerpt } from './BoardListsExcerpt'
import { useGetBoardListsQuery } from '../../redux/boardListsSlice'

export const BoardsListsList = ({ boardId }) => {
  const { data: boardLists, isLoading, isSuccess, isError, error } = useGetBoardListsQuery({ boardId })
  let content

  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = boardLists?.ids?.map((boardListId) => <BoardListsExcerpt key={boardListId} boardListId={boardListId} boardId={boardId} boardLists={boardLists} />)
  } else if (isError) {
    content = <p>ERROR: {error}</p>
  }

  return <>{content}</>
}
