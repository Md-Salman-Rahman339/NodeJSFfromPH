import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Coffee from './Coffee';

const Home = () => {
    const coffees=useLoaderData();
    // console.log(useLoader)
  return (
    <div>
        <h2>Welcome Home:{coffees.length}</h2>
        {
            coffees.map(coffee=><Coffee coffee={coffee} key={coffee._id}></Coffee>)
        }
       
      
    </div>
  )
}

export default Home
