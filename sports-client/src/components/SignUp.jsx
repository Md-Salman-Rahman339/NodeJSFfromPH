import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const { createNewUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const navigate=useNavigate();
  
    const handleSignUp = async (e) => {
      e.preventDefault();
      setError(null);
  
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const photo = e.target.photo.value;
  
      try {
        
        const userCredential = await createNewUser(email, password);
        const user = userCredential.user;
  
        if (!user) {
          throw new Error("User creation failed.");
        }
  
        
        await user.reload();
        const createdAt = user.metadata.creationTime;
  
        if (!createdAt) {
          throw new Error("User creation time is not available.");
        }
  
       
  
        const newUser = { name, email, password, photo, createdAt };
  
        const response = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
  
        const data = await response.json();
        if (data.insertedId) {
          console.log("User saved in database");
          navigate('/')
        }
      } catch (err) {
        setError(err.message);
        console.error("Signup error:", err);
      }
    };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">Agree to become involved in an organized activity.</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignUp} className="card-body">
            {error && <p className="text-red-500">{error}</p>}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="Write your name" name="name" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="Email" name="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="Password" name="password" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input type="text" placeholder="Photo URL" name="photo" className="input input-bordered" required />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-dash">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
