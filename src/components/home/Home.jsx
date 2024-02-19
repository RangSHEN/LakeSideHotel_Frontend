import React from 'react';
import MainHeader from "../layouts/MainHeader.jsx";
import HotelService from "../common/HotelService.jsx";
import Parallax from "../common/Parallax.jsx";
import RoomCarousel from "../common/RoomCarousel.jsx";
import RoomSearch from "../common/RoomSearch.jsx";
import {useLocation} from "react-router-dom";

const Home = () => {
    const location = useLocation()
    const message = location.state && location.state.message
    const currentUser = localStorage.getItem("userId")

    return (
        <section>
            {message && <p className="text-warning px-5">{message}</p>}
            {currentUser && <h6 className="text-success text-center">You are logged-In as {currentUser}</h6>}
            <MainHeader/>
            <div className="container">
                <RoomSearch/>
                <Parallax/>
                <RoomCarousel/>
                <HotelService/>
                <Parallax/>
                <RoomCarousel/>
            </div>
        </section>
    );
};

export default Home;
