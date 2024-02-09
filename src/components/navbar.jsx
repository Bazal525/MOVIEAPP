// Navbar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { decodeToken } from "react-jwt";
import { logoutUser } from "../users";
import "./app.css"; // Importuj plik app.css

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const [user, setUser] = useState(decodeToken(localStorage.getItem('token')));

    useEffect(() => {
        setUser(decodeToken(localStorage.getItem('token')));
    }, [isLoggedIn]);

    const handleLogout = () => {
        logoutUser(user.userId);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-dark bg-dark custom-navbar">
            <div className="container-fluid d-flex justify-content-sm-between">
                <div className="nav nav-pills" id="pills-tab" role="tablist">
                    <Link to="/" className="nav-item nav-link yellow-text" id="pills-home-tab" data-toggle="pill" role="tab"
                          aria-controls="pills-home" aria-selected="true">Home</Link>
                    <div className="dropdown">
                        <div className="nav-item nav-link dropdown-toggle yellow-text" data-bs-toggle="dropdown" id="navbarDarkDropdownMenuLink"
                             aria-controls="pills-home" aria-expanded="false">Films</div>
                        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown"  >
                            <li><Link to="all" className="dropdown-item d-flex justify-content-center yellow-text">All films</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="nav nav-pills" id="pills-tab" role="tablist">
                    <Link to="/add" className="nav-item nav-link yellow-text" id="pills-home-tab" data-toggle="pill" role="tab"
                          aria-controls="pills-home" aria-selected="true">
                        <FaPlusSquare /> Add
                    </Link>
                    <Link to="/watchlist" className="nav-item nav-link yellow-text" id="pills-home-tab" data-toggle="pill" role="tab"
                          aria-controls="pills-home" aria-selected="true">Watchlist
                    </Link>
                    {!isLoggedIn && (
                        <Link to="/signin" className="nav-item nav-link yellow-text" id="pills-home-tab" data-toggle="pill" role="tab"
                              aria-controls="pills-home" aria-selected="true">Log in</Link>
                    )}
                    {isLoggedIn && (
                        <div className="dropdown">
                            <div className="nav-item nav-link dropdown-toggle yellow-text" data-bs-toggle="dropdown" id="navbarDarkDropdownMenuLink"
                                 aria-controls="pills-home" aria-expanded="false">{user.name}</div>
                            <ul className="dropdown-menu dropdown-menu-dark " aria-labelledby="navbarDropdown">
                                <li><Link to="/" className="dropdown-item d-flex justify-content-center yellow-text" onClick={handleLogout}>Log out</Link></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
