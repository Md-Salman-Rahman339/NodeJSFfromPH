import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import Coffee from './Coffee';

const Home = () => {
    const coffees=useLoaderData();
    const [loadedCoffees, setLoadedCoffees] = useState(coffees);
    // console.log(useLoader)
  return (
    <div>
        <h2>Welcome Home:{coffees.length}</h2>
        {
            coffees.map(coffee=><Coffee coffee={coffee} loadedCoffees={loadedCoffees} setLoadedCoffees={setLoadedCoffees} key={coffee._id}></Coffee>)
        }
       
      
    </div>
  )
}

export default Home
