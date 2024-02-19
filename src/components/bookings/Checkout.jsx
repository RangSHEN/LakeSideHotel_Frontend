import React, {useEffect, useState} from 'react';
import BookingForm from "./BookingForm.jsx";
import {getRoomById} from "../utils/ApiFunctions.jsx";
import {useParams} from "react-router-dom";
import {Col, Container, Image, Row, Table} from "react-bootstrap";
import {FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt} from "react-icons/fa";
import RoomCarousel from "../common/RoomCarousel.jsx";


const Checkout = () => {
    const[error, setError] = useState("")
    const[isLoading, setIsLoading] = useState(true)
    const[roomInfo, setRoomInfo] = useState({photo: "", roomType: "", roomPrice:""})

    const{roomId} = useParams()

    useEffect(()=>{
        setTimeout(()=>{
            fetchRoomById()
        },2000)
    },[roomId])
    
    const fetchRoomById = async () => {
        try {
            const roomData = await getRoomById(roomId)
            setRoomInfo(roomData)
            setIsLoading(false)
        }catch (error) {
            setError(error)
            setIsLoading(false)
        }
    
    }

    return (
        <>
            <Container>
                <Row className="flex-column flex-md-row align-items-center">
                    <Col md={4} className="mt-5 mb-5">
                        {isLoading? (
                            <p>Loading room information</p>
                        ): error? (
                            <p>{error}</p>
                        ): (
                            <div className="room-info">
                                <Image
                                    src={`data:image/png;base64,${roomInfo.photo}`}
                                    alt="Room Photo"
                                    style={{width : "100%", height: "200px"}}
                                />
                                <Table striped bordered hover>
                                    <tbody>
                                        <tr>
                                            <th>Room Type :</th>
                                            <td>{roomInfo.roomType}</td>
                                        </tr>
                                        <tr>
                                            <th>Room Price :</th>
                                            <td>${roomInfo.roomPrice}</td>
                                        </tr>

                                        <tr>
                                            <th>Room Service :</th>
                                            <td>
                                                <ul>
                                                    <li><FaWifi/> Wifi</li>
                                                    <li><FaTv/> Netflix Premium</li>
                                                    <li><FaUtensils/> Breakfast</li>
                                                    <li><FaWineGlassAlt/> Mini bar refreshment</li>
                                                    <li><FaCar/> Car Service</li>
                                                    <li><FaParking/> Parking Space</li>
                                                    <li><FaTshirt/> Laundry</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        )}
                    </Col>
                    <Col md={8}>
                        <BookingForm/>
                    </Col>
                </Row>
            </Container>
            <Container>
                <RoomCarousel />
            </Container>
        </>
    );
};

export default Checkout;
