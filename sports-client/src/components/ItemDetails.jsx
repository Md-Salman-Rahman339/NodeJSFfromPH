import React from 'react'
import { useLoaderData } from 'react-router-dom'

const ItemDetails = () => {
    const details=useLoaderData();
  return (
    <div className="card lg:card-side bg-base-100 shadow-sm">
  <figure>
    <img
      src={details.photo}
      alt="Album" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{details.name}</h2>
    <p>{details.description}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Place order</button>
    </div>
  </div>
</div>
  )
}

export default ItemDetails
