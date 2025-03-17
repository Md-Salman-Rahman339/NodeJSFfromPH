import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home.jsx';
import AddCoffe from './components/AddCoffe.jsx';
import UpdateCoffe from './components/UpdateCoffe.jsx';
import Layout from './components/Layout.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children:[
      {
        path:'/',
        element:<Home></Home>,
        loader:()=>fetch('http://localhost:5000/coffee')
      },
      {
        path:'addCoffee',
        element:<AddCoffe></AddCoffe>
      },
      {
        path:'updateCoffee',
        element:<UpdateCoffe></UpdateCoffe>,
        loader:({params})=>fetch(`http://localhost:5000/coffee/${params.id}`)
  
      },
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
