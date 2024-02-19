import React, {useEffect, useState} from 'react';
import {parseISO} from "date-fns";
import {Button, Container, Table} from "react-bootstrap";
import DateSlider from "../common/DateSlider.jsx";

const BookingsTable = ({bookingInfo, handleBookingCancellation}) => {
    const [filteredBookings, setFilteredBookings] = useState(bookingInfo)

    const filterBookings = (startDate, endDate) => {
        let filtered = bookingInfo
        if(startDate && endDate){ //startDate and endDate Entered filter 方法的回调函数可以根据需要使用显式或隐式的 return 语句。如果回调函数的逻辑比较简单，通常可以采用隐式返回的形式
            filtered = bookingInfo.filter((booking) => {
                const bookingStartDate = parseISO(booking.checkInDate)
                const bookingEndDate = parseISO(booking.checkOutDate)
                return bookingStartDate >= startDate && bookingEndDate <= endDate &&
                    bookingEndDate > startDate
            })
        }
        setFilteredBookings(filtered)
    }

    useEffect(()=>{
        setFilteredBookings(bookingInfo)
    },[bookingInfo])

    return (
        <>
            <section className='p-4'>
                <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings}/>
                <Table bordered hover className="shadow">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Booking ID</th>
                            <th>Room ID</th>
                            <th>Room Type</th>
                            <th>Check-In Date</th>
                            <th>Check-Out Date</th>
                            <th>Guest Name</th>
                            <th>Guest Email</th>
                            <th>Adults</th>
                            <th>Children</th>
                            <th>Total Guest</th>
                            <th>Confirmation Code</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredBookings.map((booking,index)=>(
                            <tr key={booking.bookingId}>
                                <td>{index + 1}</td>
                                <td>{booking.bookingId}</td>
                                <td>{booking.room.id}</td>
                                <td>{booking.room.roomType}</td>
                                <td>{booking.checkInDate}</td>
                                <td>{booking.checkOutDate}</td>
                                <td>{booking.guestFullName}</td>
                                <td>{booking.guestEmail}</td>
                                <td>{booking.numOfAdults}</td>
                                <td>{booking.numOfChildren}</td>
                                <td>{booking.totalNumOfGuest}</td>
                                <td>{booking.bookingConfirmationCode}</td>
                                <td>
                                    <Button className="btn-danger btn-sm"
                                            onClick={() => handleBookingCancellation(booking.id)}>
                                        Cancel
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {filterBookings.length === 0 && <p> No booking found for the selected dates</p>}
            </section>

        </>
    );
};

export default BookingsTable;
