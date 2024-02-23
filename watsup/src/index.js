import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {RouterProvider,Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import Register from './pages/Register';
import Home from "./pages/Home.jsx"
import Chat from "./pages/Chat"

// const router = createBrowserRouter([
//   {
//     path:"",
//     element:<Home/>,
//     children:[
//       {
//         path:"/regsiter",
//         element:<Register/>
//       },
//       {
//         path:"/chat",
//         element:<Chat/>
//       }
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    
    <Route path="/" element={<Home/>}></Route>
    <Route path="register" element={<Register/>}></Route>
    <Route path="chat" element={<Chat/>}></Route>

    </>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
