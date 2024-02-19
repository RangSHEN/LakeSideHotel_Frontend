import React, {useEffect, useState} from 'react';
import {cancelBooking, getAllBookings} from "../utils/ApiFunctions.jsx";
import {Alert, Container} from "react-bootstrap";
import Header from "../common/Header.jsx";
import BookingsTable from "./BookingsTable.jsx";

const Bookings = () => {
    const[bookingInfo, setBookingInfo] = useState([])
    const[isLoading,setIsLoading] = useState(true)
    const[error, setError] = useState("")

    useEffect(()=>{
        setTimeout(()=>{
            fetchAllBookings()
        },1000)
    },[])

    const fetchAllBookings = async () => {
      try {
          const data = await getAllBookings()
          setBookingInfo(data)
          setIsLoading(false)
      }catch (error) {
          setError(error.message)
          setIsLoading(false)
      }
    }

    const handleBookingCancellation = async (bookingId) => {
      try {
          await cancelBooking(bookingId)
          fetchAllBookings()
      }catch (error) {
          setError(error.message)
      }
    }


    return (
        <section style={{backgroundColor: "whitesmoke"}}>
            <Header title={"Existing Bookings"}/>
            {error && (<Alert variant="danger">{error}</Alert>)}
            {isLoading ? (<div>Loading existing bookings</div>
            ): (
                <BookingsTable bookingInfo={bookingInfo} handleBookingCancellation={handleBookingCancellation}/>
            )}
        </section>
    );
};

export default Bookings;
