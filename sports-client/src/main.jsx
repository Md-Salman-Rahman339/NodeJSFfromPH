import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/Layout.jsx';
import Home from './components/Home.jsx';
import AddSportsItem from './components/AddSportsItem.jsx';
import UpdateEquipment from './components/UpdateEquipment.jsx';
import AllSportsItem from './components/AllSportsItem.jsx';
import ItemDetails from './components/ItemDetails.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import Dashboard from './components/Dashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children:[
      {
        path:'/',
        element:<Home></Home>,
        loader:()=>fetch('http://localhost:5000/sports')
      },
      {
        path:'addSports',
        element:<AddSportsItem></AddSportsItem>
      },
      {
        path:'updateEquipment',
        element:<UpdateEquipment></UpdateEquipment>
      },
      {
        path:'allsportsitem',
        element:<AllSportsItem></AllSportsItem>,
        loader:()=>fetch('http://localhost:5000/sports')

      },
      {
        path:'details/:id',
        element:<ItemDetails></ItemDetails>,
        loader:({params})=>fetch(`http://localhost:5000/sports/${params.id}`)
      },
      {
        path:'signIn',
        element:<SignIn></SignIn>,
      },
      {
        path:'signUp',
        element:<SignUp></SignUp>

      },
      {
       path:'/user',
       element: <Dashboard></Dashboard>,
       loader:()=>fetch('http://localhost:5000/users')
      }
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
 <AuthProvider>
 <RouterProvider router={router} />
 </AuthProvider>
  </StrictMode>,
)
