import { createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

const listTasksAdapter = createEntityAdapter({})
const initialState = listTasksAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListTasks: builder.query({
      query: ({ boardId, boardListId }) => `/boards/${boardId}/board_lists/${boardListId}/list_tasks`,
      transformResponse: (responseData) => {
        const loadedBoardLists = responseData

        return listTasksAdapter.setAll(initialState, loadedBoardLists)
      },

      providesTags: (result, error, arg) => [{ type: 'ListTask', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'ListTask', id }))],
    }),

    addNewListTask: builder.mutation({
      query: (initialListTask) => ({
        url: `/boards/${initialListTask.boardId}/board_lists/${initialListTask.boardListId}/list_tasks`,
        method: 'POST',
        body: {
          list_task: {
            ...initialListTask.data,
          },
        },
      }),

      invalidatesTags: [{ type: 'ListTask', id: 'LIST' }],
    }),

    updateListTask: builder.mutation({
      query: (initialListTask) => ({
        url: `/boards/${initialListTask.boardId}/board_lists/${initialListTask.boardListId}/list_tasks/${initialListTask.id}`,
        method: 'PATCH',
        body: {
          list_task: {
            ...initialListTask.data,
          },
        },
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'ListTask', id: arg.id }],
    }),

    deleteBoardList: builder.mutation({
      query: ({ boardId, id }) => ({
        url: `boards/${boardId}/board_lists/${id}`,
        method: 'DELETE',
        body: { id },
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'ListTask', id: arg.id }],
    }),

    getListTaskUsers: builder.query({
      query: ({ boardId, boardListId, listTaskId }) => `/boards/${boardId}/board_lists/${boardListId}/list_tasks/${listTaskId}/users`,
      transformResponse: (responseData) => {
        const loadedListTaskUsers = responseData
        return listTasksAdapter.setAll(initialState, loadedListTaskUsers)
      },

      providesTags: (result, error, arg) => [{ type: 'Board', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'ListTask', id }))],
    }),

    assignUserToListTask: builder.mutation({
      query: ({ boardId, boardListId, listTaskId, userId }) => ({
        url: `/boards/${boardId}/board_lists/${boardListId}/list_tasks/${listTaskId}/assign_user`,
        method: 'POST',
        body: {
          task_user: { user_id: userId },
        },
      }),

      invalidatesTags: [{ type: 'ListTask', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetListTasksQuery,
  useAddNewListTaskMutation,
  useUpdateListTaskMutation,
  useDeleteBoardListMutation,
  useGetListTaskUsersQuery,
  useAssignUserToListTaskMutation,
} = extendedApiSlice
