// import { configureStore } from '@reduxjs/toolkit'
// // import boardsSlice from './boardsSlice'
// import listsSlice from './listsSlice'
// import cardsSlice from './cardsSlice'

// export default configureStore({
//   reducer: {
//     // boards: boardsSlice,
//     lists: listsSlice,
//     cards: cardsSlice,
//   },
// })

import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})
