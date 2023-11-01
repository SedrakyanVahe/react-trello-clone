import { configureStore } from '@reduxjs/toolkit'
import boardsSlice from './boardsSlice'
import listsSlice from './listsSlice'
import cardsSlice from './cardsSlice'
import usersSlice from './usersSlice'

export default configureStore({
  reducer: {
    boards: boardsSlice,
    lists: listsSlice,
    cards: cardsSlice,
    users: usersSlice,
  },
})
