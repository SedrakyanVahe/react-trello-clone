import { createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

const boardListsAdapter = createEntityAdapter({})
const initialState = boardListsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBoardLists: builder.query({
      query: ({ boardId }) => `/boards/${boardId}/board_lists`,
      transformResponse: (responseData) => {
        const loadedBoardLists = responseData

        return boardListsAdapter.setAll(initialState, loadedBoardLists)
      },

      providesTags: (result, error, arg) => [
        { type: 'BoardList', id: 'LIST' },
        ...result.ids.map((id) => ({ type: 'BoardList', id })),
      ],
    }),

    addNewBoardList: builder.mutation({
      query: (initialBoardList) => ({
        url: `/boards/${initialBoardList.boardId}/board_lists`,
        method: 'POST',
        body: {
          board_list: {
            ...initialBoardList.data,
          },
        },
      }),

      invalidatesTags: [{ type: 'BoardList', id: 'LIST' }],
    }),

    updateBoardList: builder.mutation({
      query: (initialBoardList) => ({
        url: `/boards/${initialBoardList.boardId}/board_lists/${initialBoardList.id}`,
        method: 'PATCH',
        body: {
          board_list: {
            ...initialBoardList.data,
          },
        },
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'BoardList', id: arg.id }],
    }),

    deleteBoardList: builder.mutation({
      query: ({ boardId, id }) => ({
        url: `boards/${boardId}/board_lists/${id}`,
        method: 'DELETE',
        body: { id },
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'BoardList', id: arg.id }],
    }),
  }),
})

export const {
  useGetBoardListsQuery,
  useAddNewBoardListMutation,
  useUpdateBoardListMutation,
  useDeleteBoardListMutation,
} = extendedApiSlice
