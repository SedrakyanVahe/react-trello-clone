import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layout/MainLayout'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { Boards } from '../pages/Boards/Boards'
import { SingleBoard } from '../pages/Boards/SingleBoard'

export const RootScreen = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={'/'} element={<Home />} />
        <Route path={'/boards'} element={<Boards />} />
        <Route path={'/boards/:boardId'} element={<SingleBoard />} />
        <Route path={'*'} element={<NotFound />} />
      </Route>
    </Routes>
  )
}
