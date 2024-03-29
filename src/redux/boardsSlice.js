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
        const loadedBoardUsers = responseData
        return boardsAdapter.setAll(initialState, loadedBoardUsers)
      },

      providesTags: (result, error, arg) => [{ type: 'Board', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Board', id }))],
    }),

    assignUser: builder.mutation({
      query: ({ boardId, userId }) => ({
        url: `/boards/${boardId}/assign_user`,
        method: 'POST',
        body: {
          board_user: { user_id: userId },
        },
      }),

      invalidatesTags: [{ type: 'Board', id: 'LIST' }],
    }),
  }),
})

export const { useGetBoardsQuery, useAddNewBoardMutation, useUpdateBoardMutation, useDeleteBoardMutation, useGetBoardUsersQuery, useAssignUserMutation } =
  extendedApiSlice
