import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listsList: [
    {
      id: 1,
      boardId: 1,
      title: 'Backlog',
    },

    {
      id: 2,
      boardId: 1,
      title: 'In progress',
    },

    {
      id: 3,
      boardId: 1,
      title: 'Done',
    },

    {
      id: 4,
      boardId: 2,
      title: 'Backlog',
    },

    {
      id: 5,
      boardId: 2,
      title: 'In progress',
    },

    {
      id: 6,
      boardId: 2,
      title: 'Done',
    },
  ],

  currentBoardLists: [],
}

const listsSlice = createSlice({
  name: 'lists',
  initialState,

  reducers: {
    getCurrentBoardLists: (state, action) => {
      state.currentBoardLists = state.listsList.filter((list) => list.boardId == action.payload)
    },

    addList: (state, action) => {
      state.currentBoardLists.push(action.payload)
    },

    updateListName: (state, action) => {
      const list = state.listsList.find((list) => list.id == action.payload.id)

      if (!!list.id) {
        list.title = action.payload.title
      }
    },
  },
})

export const { getCurrentBoardLists, addList, updateListName } = listsSlice.actions
export default listsSlice.reducer
