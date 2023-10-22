import { configureStore } from '@reduxjs/toolkit'
import boardsSlice from './boardsSlice'
import listsSlice from './listsSlice'

export default configureStore({
  reducer: {
    boards: boardsSlice,
    lists: listsSlice,
  },
})
