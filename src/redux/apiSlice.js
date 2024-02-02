import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://trello-back-064098635aa0.herokuapp.com' }),
  tagTypes: ['User', 'Board', 'BoardList', 'ListTask'],
  endpoints: (builder) => ({}),
})
