 import React from 'react';
import {useLocation} from "react-router-dom";
import Header from "../common/Header.jsx";

const BookingSuccess = () => {
    const location = useLocation()
    const message = location.state?.message
    const error = location.state?.error

    return (
        <div className='container'>
            <Header title="Booking Success"/>
            <div className='mt-5'>
                {error ? (
                    <div>
                        <h3 className="text-danger"> Error Booking Room </h3>
                        <p className='text-danger'>{error}</p>
                    </div>
                ) : (
                    message && (
                        <div>
                            <h3 className='text-success'> Booking Success!</h3>
                            {/*"Room booked successfully, Your booking confirmation Code is :" + confirmationCode,*/}
                            <p className='text-success'>{message}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

 export default BookingSuccess;
