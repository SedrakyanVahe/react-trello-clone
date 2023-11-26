import { Link } from 'react-router-dom'
import { useGetBoardsQuery, useUpdateBoardMutation, useDeleteBoardMutation } from '../../redux/boardsSlice'

const BoardsExcerpt = ({ boardId }) => {
  const [updatePost, { isLoading }] = useUpdateBoardMutation()
  const [deleteBoard] = useDeleteBoardMutation()

  const { board } = useGetBoardsQuery('getBoards', {
    selectFromResult: ({ data }) => ({
      board: data?.entities[boardId],
    }),
  })

  const startEditingBoard = (boardId, name) => {
    // setBoardName(name)
  }

  const stopEditingBoard = () => {
    // setBoardName('')
  }

  const handleNameChange = (e) => {
    // setBoardName(e.target.value)
  }

  const onDeleteBoardClicked = async () => {
    if (confirm('Are you sure?')) {
      try {
        await deleteBoard({ id: board?.id }).unwrap()
      } catch (err) {
        console.error('Failed to delete the post', err)
      }
    }
  }

  return (
    <>
      <div key={board.id} className='board'>
        {false ? (
          <div className='material_textfield'>
            <input
              type='text'
              className='board_title_input'
              placeholder=' '
              value={boardTitle}
              onChange={handleTitleChange}
              onBlur={() => saveBoardTitle(board.id)}
              autoFocus
            />

            <label htmlFor='resource'>Title</label>
          </div>
        ) : (
          <>
            <h3 className='board_title' onClick={() => startEditingBoard(board.id, board.name)}>
              {board.name}
            </h3>
            <div className='board_actions'>
              <Link className='btn' to={`${board.id}`}>
                Show
              </Link>
              <button className='btn btn_red' onClick={onDeleteBoardClicked}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default BoardsExcerpt
