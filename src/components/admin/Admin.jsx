import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../auth/AuthProvider.jsx";

const Admin = () => {

    //const user = useContext(AuthContext)
    const userRole = localStorage.getItem("userRole")
    const isLoggedInAsAdmin = userRole.includes("ROLE_ADMIN")
    return isLoggedInAsAdmin? (
        <section className="container mt-5">
            <h2>Welcome to Admin Panel</h2>
            <hr/>
            <Link to={"/existing-rooms"}>
                Manage Rooms
            </Link> <br/>
            <Link to={"/existing-bookings"}>
                Manage Bookings
            </Link>
        </section>
    ): (<p> You are not admin</p>);
};

export default Admin;

