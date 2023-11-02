import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  usersList: [
    {
      id: 1,
      boardId: 1,
      cardId: 1,
      avatar: 'https://i.cbc.ca/1.5359228.1577206958!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/smudge-the-viral-cat.jpg',
      email: 'vahe@mail.com',
    },

    {
      id: 2,
      boardId: 1,
      cardId: 2,
      avatar: 'https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg',
      email: 'michael@mail.com',
    },

    {
      id: 3,
      boardId: 1,
      cardId: 2,
      avatar: 'https://m.media-amazon.com/images/I/51RgIJXLhaL._AC_UF894,1000_QL80_.jpg',
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
