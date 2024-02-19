import React, {useEffect, useState} from 'react';
import {bookRoom, getRoomById} from "../utils/ApiFunctions.jsx";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment"
import {Button, Card, Col, Container, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import BookingSummary from "./BookingSummary.jsx";

//from RoomCarousel
const BookingForm = () => {

    const [isValidated, setIsValidated] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [roomPrice, setRoomPrice] = useState(0)
    const currentUser = localStorage.getItem("userId")

    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: currentUser,
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: ""
    })

    const {roomId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getRoomPriceById(roomId)
    }, [roomId])

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setBooking({...booking, [name]: value})
        setErrorMessage("")
    }

    const getRoomPriceById = async (roomId) => {
        try {
            const response = await getRoomById(roomId)
            setRoomPrice(response.roomPrice)
        } catch (e) {
            throw new Error(e)
        }
    }

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diffInDays = checkOutDate.diff(checkInDate,"days")
        const price = roomPrice ? roomPrice : 0
        return diffInDays * price
    }

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numOfAdults)
        const childrenCount = parseInt(booking.numOfChildren)
        const totalCount = adultCount + childrenCount
        return adultCount >= 1 && totalCount >= 1
    }

    const isCheckOutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage("Check-out date must come before check in date")
            return false
        } else {
            setErrorMessage("")
            return true
        }
    }

    //a function to handle the submit to validate all this we have created
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget //currentTarget 始终指向绑定事件处理函数的元素
        if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
            e.stopPropagation()
        } else {
            setIsSubmitted(true)
        }
        setIsValidated(true)
    }

    const handleBooking = async () => {
        try {
            const confirmationCode = await bookRoom(roomId, booking)
            setIsSubmitted(true)
            navigate("/booking-success", {state: {message: confirmationCode}})
        } catch (error) {
            const errorMessage = error.message
            console.log(errorMessage)
            navigate("/booking-success", {state: {error: errorMessage}}) //这个error是用来接收后端的自定义的error
        }
    }

    return (
        <>
            <Container className="mb-5">
                <Row>
                    <Col md={6}>
                        <Card className="mt-5">
                            <Card.Body>
                                <Card.Title>
                                    <h4>Reserve Room</h4>
                                </Card.Title>
                                <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label htmlFor="guestFullName" className="hotel-color"> Full Name : </Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            id="guestFullName"
                                            name="guestFullName"
                                            value={booking.guestFullName}
                                            placeholder="Enter your full name"
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter your fullname.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label htmlFor="guestEmail" className="hotel-color"> Email : </Form.Label>
                                        <Form.Control
                                            required
                                            type="email"
                                            id="guestEmail"
                                            name="guestEmail"
                                            value={booking.guestEmail}
                                            placeholder="Enter your email"
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter your email address.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <fieldset style={{border: "2px"}}>
                                        <legend>Lodging period</legend>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Label htmlFor="checkInDate" className="hotel-color">
                                                    Check-In date:
                                                </Form.Label>
                                                <FormControl
                                                    required
                                                    type="date"
                                                    id="checkInDate"
                                                    name="checkInDate"
                                                    value={booking.checkInDate}
                                                    placeholder="check-in Date"
                                                    min={moment().format("MMM Do, YYYY")}
                                                    onChange={handleInputChange}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please select a check-in-date
                                                </Form.Control.Feedback>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Label htmlFor="checkOutDate" className="hotel-color">
                                                    Check-Out date:
                                                </Form.Label>
                                                <FormControl
                                                    required
                                                    type="date"
                                                    id="checkOutDate"
                                                    name="checkOutDate"
                                                    value={booking.checkOutDate}
                                                    placeholder="check-out Date"
                                                    min={moment().format("MMM Do, YYYY")}
                                                    onChange={handleInputChange}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please select a check-out-date
                                                </Form.Control.Feedback>
                                            </Col>
                                            {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                                        </Row>
                                    </fieldset>

                                    <fieldset>
                                        <legend>Number of Guest</legend>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Label htmlFor="numOfAdults" className="hotel-color">Adults :</Form.Label>
                                                <FormControl
                                                    required
                                                    type="number"
                                                    id="numOfAdults"
                                                    name="numOfAdults"
                                                    value={booking.numOfAdults}
                                                    placeholder="0"
                                                    min={1}
                                                    onChange={handleInputChange}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please select at least 1 adult.
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Label htmlFor="numOfChildren" className="hotel-color">Children :</Form.Label>
                                                <FormControl
                                                    required
                                                    type="number"
                                                    id="numOfChildren"
                                                    name="numOfChildren"
                                                    value={booking.numOfChildren}
                                                    placeholder="0"
                                                    min={0}
                                                    onChange={handleInputChange}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Select 0 if no children
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                    </fieldset>

                                    <FormGroup className="mt-2 mb-2">
                                        <Button type="submit" className="btn-hotel">
                                            Continue
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        {isSubmitted && (
                            <BookingSummary
                                booking={booking}
                                payment={calculatePayment()}
                                isFormValid={isValidated}
                                onConfirm={handleBooking}
                            />
                        )}
                    </Col>

                </Row>
            </Container>
        </>
    );
};

export default BookingForm;
