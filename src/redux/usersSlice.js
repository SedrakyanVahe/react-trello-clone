import { createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

const usersAdapter = createEntityAdapter({})
const initialState = usersAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (responseData) => {
        const loadedBoards = responseData

        return usersAdapter.setAll(initialState, loadedBoards)
      },

      providesTags: (result, error, arg) => [{ type: 'User', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'User', id }))],
    }),
  }),
})

export const { useGetUsersQuery } = extendedApiSlice
