import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layout/MainLayout'
import { Home } from '../pages/Home'
import { Boards } from '../pages/Boards'

export const RootScreen = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={'/'} element={<Home />} />
        <Route path={'/boards'} element={<Boards />} />
      </Route>
    </Routes>
  )
}
