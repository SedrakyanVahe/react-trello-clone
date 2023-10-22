import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  boardsList: [
    {
      id: 1,
      title: 'board 1',
    },

    {
      id: 2,
      title: 'board 2',
    },

    {
      id: 3,
      title: 'board 3',
    },
  ],

  currentBoard: null,
}

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    showBoard: (state, action) => {
      state.currentBoard = state.boardsList.find((board) => board.id == action.payload)
    },

    addBoard: (state, action) => {
      state.boardsList.push(action.payload)
    },

    deleteBoard: (state, action) => {
      const boardIndex = state.boardsList.findIndex((board) => board.id === action.payload)

      if (boardIndex !== -1) {
        state.boardsList.splice(boardIndex, 1)
      }
    },
  },
})

export const { showBoard, addBoard, deleteBoard } = boardsSlice.actions
export default boardsSlice.reducer
