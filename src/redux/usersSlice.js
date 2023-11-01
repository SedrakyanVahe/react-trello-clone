import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  usersList: [
    {
      id: 1,
      boardId: 1,
      listId: null,
      email: 'vahe@mail.com',
    },

    {
      id: 2,
      boardId: 1,
      listId: null,
      email: 'michael@mail.com',
    },

    {
      id: 3,
      boardId: 2,
      listId: null,
      email: 'nare@mail.com',
    },
  ],

  currentBoardUsers: [],
}

const usersSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {
    getCurrentBoardUsers: (state, action) => {
      state.currentBoardUsers = state.usersList.filter((user) => user.boardId == action.payload)
    },

    addUser: (state, action) => {
      state.currentBoardUsers.push(action.payload)
    },
  },
})

export const { getCurrentBoardUsers, addUser } = usersSlice.actions
export default usersSlice.reducer
