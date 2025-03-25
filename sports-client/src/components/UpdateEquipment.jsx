import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const UpdateEquipment = () => {
     const navigate=useNavigate();
     const uSports=useLoaderData();
     const {_id,name,category,description,price,customization,photo}=uSports
  
  
      const handleUpdatedSports=e=>{
          e.preventDefault();
          const name = e.target.name.value;
          const category = e.target.category.value;
          const description = e.target.description.value;
          const price= e.target.price.value;
          const customization = e.target.customization.value;
          const photo = e.target.photo.value;
          
           const newSports={name,category,description,price,customization,photo}
          fetch(`http://localhost:5000/sports/${_id}`, {
              method: 'PUT', 
              headers: {
                  'content-type':'application/json'
              },
              body: JSON.stringify(newSports)
          })
              .then(res => res.json())
              .then(data => {
                  if (data.insertedId) {
                      console.log('successfully added');
                      navigate('/')
                      Swal.fire({
                          title: 'Success!',
                          text: 'Equipment Updated successfully',
                          icon: 'success',
                          confirmButtonText: 'Ok'
                      });
                      e.target.reset();
                  }
                  // console.log('response from server', data)
              })
  
      }
    return (
      <div className='lg:w-3/4 mx-auto'>
          <div className="text-center p-10">
              <h1 className="text-5xl font-bold">Update Equipment Item</h1>
              <p className="py-6">
                  Provident cupiditate voluptatem et in.Quaerat fugiat ut assumenda excepturi exercitationem
                  quasi. In deleniti eaque aut repudiandae et a id nisi.
              </p>
          </div>
          <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
              <form onSubmit={handleUpdatedSports}  className="card-body">
                  {/* form first row */}
                  <div className='flex flex-col lg:flex-row gap-5'>
                      <div className="form-control flex-1">
                          <label className="label">
                              <span className="label-text">Name</span>
                          </label>
                          <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                      </div>
                      <div className="form-control flex-1">
                          <label className="label">
                              <span className="label-text">Category</span>
                          </label>
                          <input type="text" name='category' placeholder="category" className="input input-bordered" required />
                      </div>
                  </div>
                  {/* form second row */}
                  <div className='flex flex-col lg:flex-row gap-5'>
                      <div className="form-control flex-1">
                          <label className="label ">
                              <span className="label-text">Description</span>
                          </label>
                          <input type="text" name='description' placeholder="Description" className="input input-bordered" required />
                      </div>
                      <div className="form-control flex-1">
                          <label className="label">
                              <span className="label-text">Price</span>
                          </label>
                          <input type="text" name='price' placeholder="Price" className="input input-bordered" required />
                      </div>
                  </div>
                  {/* form third row */}
                  <div className='flex flex-col lg:flex-row gap-5'>
                      <div className="form-control flex-1">
                          <label className="label">
                              <span className="label-text">Customization</span>
                          </label>
                          <input type="text" name='customization' placeholder="Customization" className="input input-bordered" required />
                      </div>
                    
                  </div>
  
  
                  <div className="form-control">
                      <label className="label">
                          <span className="label-text">Photo URL</span>
                      </label>
                      <input type="text" name='photo' placeholder="Photo url" className="input input-bordered" required />
  
                  </div>
                  <div className="form-control mt-6">
                      <button className="btn btn-primary">Update Equipment</button>
                  </div>
              </form>
          </div>
      </div>
    )
  }
  
 
  


export default UpdateEquipment
