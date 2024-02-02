import { createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

const boardsAdapter = createEntityAdapter({})
const initialState = boardsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => '/boards',
      transformResponse: (responseData) => {
        const loadedBoards = responseData

        return boardsAdapter.setAll(initialState, loadedBoards)
      },

      providesTags: (result, error, arg) => [{ type: 'Board', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Board', id }))],
    }),

    addNewBoard: builder.mutation({
      query: (initialBoard) => ({
        url: '/boards',
        method: 'POST',
        body: {
          board: {
            ...initialBoard,
          },
        },
      }),

      invalidatesTags: [{ type: 'Board', id: 'LIST' }],
    }),

    updateBoard: builder.mutation({
      query: (initialBoard) => ({
        url: `/boards/${initialBoard.id}`,
        method: 'PATCH',
        body: {
          board: {
            ...initialBoard,
          },
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Board', id: arg.id }],
    }),

    deleteBoard: builder.mutation({
      query: ({ id }) => ({
        url: `/boards/${id}`,
        method: 'DELETE',
        body: { id },
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'Board', id: arg.id }],
    }),

    getBoardUsers: builder.query({
      query: ({ boardId }) => `/boards/${boardId}/users`,
      transformResponse: (responseData) => {
        const loadedBoardLists = responseData
        return boardsAdapter.setAll(initialState, loadedBoardLists)
      },

      providesTags: (result, error, arg) => [{ type: 'Board', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Board', id }))],
    }),
  }),
})

export const { useGetBoardsQuery, useAddNewBoardMutation, useUpdateBoardMutation, useDeleteBoardMutation, useGetBoardUsersQuery } = extendedApiSlice
