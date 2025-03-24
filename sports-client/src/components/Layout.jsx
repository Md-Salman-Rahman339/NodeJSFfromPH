import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

// const Layout = () => {
//   return (
//     <div className='max-w-6xl mx-auto'>
//       <Header></Header>
//       <Outlet></Outlet>
//       <div className=''>
//       <Footer></Footer>
//       </div>
//     </div>
//   )
// }
const Layout = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow max-w-6xl mx-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  };
  
export default Layout
