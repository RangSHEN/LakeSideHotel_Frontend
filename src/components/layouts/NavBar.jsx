import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import Logout from "../auth/Logout.jsx";
import {AuthContext} from "../auth/AuthProvider.jsx";


const NavBar = () => {

    const [showAccount, setShowAccount] = useState(false)

    //const{user} = useContext(AuthContext)

    const handleAccountClick = () => {
      setShowAccount(!showAccount)
    }

    //const isLoggedIn = user !== null
    const isLoggedIn = localStorage.getItem("token")
    const userRole = localStorage.getItem("userRole")


    return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'>
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand">
                    <span className='hotel-color'> lakeSide Hotel</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className='collapse navbar-collapse' id="navbarScroll">
                    <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                        <li className='nav-item'>
                            {/*navLink has more css than link*/}
                            <Link className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
                                Browse all rooms
                            </Link>
                        </li>
                        {isLoggedIn && userRole.includes("ROLE_ADMIN") && (
                            <li className='nav-item'>
                                {/*navLink has more css than link*/}
                                <Link className="nav-link" aria-current="page" to={"/admin"}>
                                    Admin
                                </Link>
                            </li>
                        )}

                    </ul>

                    {/*push this one to the right hand side of menu*/}
                    <ul className='d-flex navbar-nav'>
                        <li className='nav-item'>
                            <Link className='nav-link' to={"/find-booking"}>
                                Find My Booking
                            </Link>
                        </li>

                        <li className="nav-item dropdown">
                            {/*Account 下面条纹是否显示*/}
                            <a
                                className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleAccountClick}>
                                {" "}
                                Account
                            </a>
                            <ul
                                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                                aria-labelledby="navbarDropdown">
                                {isLoggedIn ? (
                                    <Logout/>
                                ) : (
                                    <li>
                                        <Link className="dropdown-item" to={"/login"}>
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                            {/*<li>*/}
                            {/*    <Link to={"/profile"} className="dropdown-item">Profile</Link>*/}
                            {/*</li>*/}
                </li>
            </ul>
        </div>
</div>
</nav>
)
    ;
};

export default NavBar;
