import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'

const Header = () => {
    const {user,logOut}=useContext(AuthContext)
    const links=<>
    <li><NavLink to='/'>Home</NavLink></li>
    {user && user?.email &&(
       <>
        <li><NavLink to='/addSports'>Add Sports Item</NavLink></li>
        <li><NavLink to='/'>My Equipments</NavLink></li>
       </>
    )}
       <li><NavLink to='/allsportsitem'>All Sports Equipment</NavLink></li>
       {/* <li><NavLink to='/signIn'>Sign In</NavLink></li> */}
       {/* <li><NavLink to='/users'>Users</NavLink></li> */}
    </>
  return (
    <div className="navbar bg-base-100 shadow-sm">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          {links}
        </ul>
      </div>
      <a className="btn btn-ghost text-xl">Lotus Sports</a>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        {links}
      </ul>
    </div>
    <div className="navbar-end">
    {user && user?.email?(
     
     <button onClick={logOut} className="btn btn-neutral rounded-none">
     Log-Out
   </button>
   ):(
     <Link to="/signIn" className="btn btn-neutral rounded-none">
            Login
          </Link>
   )}
    </div>
  </div>
  )
}

export default Header
