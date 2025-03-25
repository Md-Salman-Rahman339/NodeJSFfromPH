import React, { useContext } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider';

const AllSportsItem = () => {
    const {user}=useContext(AuthContext)
    const items=useLoaderData();
    const sortedItems = [...items].sort((a, b) => a.price - b.price);

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-4xl">
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
       
        {
            sortedItems.map(item=><tr key={item._id}>
                <th>{item.name}</th>
                <td>{item.category}</td>
                <td>{item.price}</td>
                
                <Link to={user && user.email? `/details/${item._id}`:""}><a className='btn btn-dash'> View details</a></Link>
                
              </tr>)
        }
      </tbody>
    </table>
  </div>
  )
}

export default AllSportsItem
