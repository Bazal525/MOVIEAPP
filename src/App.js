import Navbar from "./components/navbar";
import {Outlet} from "react-router-dom";
import './App.css';
import Footer from "./components/footer";
import {useState} from "react";
import {isExpired} from "react-jwt";
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!isExpired(localStorage.getItem('token')));

  return (
      <div className="app">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          <Outlet isLoggedIn={isLoggedIn}/>
        <Footer/>

      </div>
  );
}

export default App;
