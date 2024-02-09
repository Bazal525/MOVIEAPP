import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from "./pages/home";
import Login from "./pages/Login";
import NewUser from "./pages/NewUser";
import MovieRanking from "./pages/List";
import Details from "./pages/Details";
import Form from "./pages/Form";
import { isExpired } from "react-jwt";
import Watchlist from "./pages/Towatch";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path = "/" element = {<App />}>
                <Route index element={<Home/>}/>
                <Route path = "signin" element={<Login/>}/>
                <Route path = "signup" element={<NewUser/>}/>
                <Route path = "all" element={<MovieRanking/>}/>
                <Route path = "details/:id" element={<Details/>}/>
                <Route path = "add" element={isExpired(localStorage.getItem('token')) ? <Navigate replace to ="/"/> : <Form/>}/>
                <Route path = "watchlist" element={isExpired(localStorage.getItem('token')) ? <Navigate replace to ="/"/> : <Watchlist/>}/>

              </Route>
          </Routes>

      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
