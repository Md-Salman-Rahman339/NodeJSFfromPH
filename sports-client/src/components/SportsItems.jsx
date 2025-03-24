import React from 'react'
import Swal from 'sweetalert2';

const SportsItems = ({item}) => {
    const {_id,name,category,description,price,customization,photo}=item;

    const handleDelete=_id=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result)=>{
            if(result.isConfirmed){
                fetch(`http://localhost:5000/sports/${_id}`,{
                     method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.deletedCount>0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                })

        }
    });
}
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
    <figure>
      <img
        src={photo}
        alt="Item" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">
       Name:{name}
        <a onClick={()=>handleDelete(_id)} className="badge badge-secondary btn btn-sm">X</a>
      </h2>
      <p> {description.split(" ").slice(0, 10).join(" ")}...</p>
      <div className="card-actions justify-end">
        <div className="badge badge-outline">Price:${price}</div>
        <div className="badge badge-outline">{category}</div>
      </div>
    </div>
  </div>
  )
}

export default SportsItems
