import React from 'react'
import { useLoaderData } from 'react-router-dom'
import SportsItems from './SportsItems';

const Home = () => {
    const items=useLoaderData();
    console.log(items)
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8  '>
      {
        items.map(item=><SportsItems item={item} key={item._id}></SportsItems>)
      }
    </div>
  )
}

export default Home
