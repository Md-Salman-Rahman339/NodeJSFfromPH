import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='max-w-6xl mx-auto'>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  )
}

export default Layout
