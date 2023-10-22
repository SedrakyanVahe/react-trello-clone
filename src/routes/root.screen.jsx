import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layout/MainLayout'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { Boards } from '../pages/Boards'
import { Board } from '../pages/Board'

export const RootScreen = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={'/'} element={<Home />} />
        <Route path={'/boards'} element={<Boards />} />
        <Route path={'/boards/:id'} element={<Board />} />
        <Route path={'*'} element={<NotFound />} />
      </Route>
    </Routes>
  )
}
