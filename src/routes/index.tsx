import React from 'react'
import { Routes as RouterRoutes, Route } from 'react-router-dom'
import { HomePage, NotFound } from '../pages'

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path='/' element={<HomePage />} />
      <Route path='*' element={<NotFound />} />
    </RouterRoutes>
  )
}

export default Routes