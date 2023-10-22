import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cardsList: [
    {
      id: 1,
      listId: 1,
      title: 'ticket 10',
      description: '500 error',
    },

    {
      id: 2,
      listId: 1,
      title: 'ticket 11',
      description: 'Mail issues',
    },
  ],
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,

  reducers: {
    addCard: (state, action) => {
      state.cardsList.push(action.payload)
    },

    updateCard: (state, action) => {
      console.log(action)
      const card = state.cardsList.find((card) => card.id == action.payload.id)

      if (!!card.id) {
        card.title = action.payload.title
        card.description = action.payload.description
      }
    },
  },
})

export const { addCard, updateCard } = cardsSlice.actions
export default cardsSlice.reducer