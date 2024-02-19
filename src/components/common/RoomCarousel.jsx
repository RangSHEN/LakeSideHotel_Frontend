/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {getAllRooms} from "../utils/ApiFunctions.jsx";
import {Link} from "react-router-dom";
import {Card, CardTitle, Carousel, Col, Container, Row} from "react-bootstrap";

const RoomCarousel = () => {

    const [rooms, setRooms] = useState([{id:"", roomType:"",roomPrice:"",photo:""}])
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        fetchAllRooms()
    },[])

    const fetchAllRooms = async() => {
        setIsLoading(true)
        try {
            const result = await getAllRooms()
            setRooms(result)
            setIsLoading(false)
        }catch (e) {
            setErrorMessage(e.message)
        }
    }

    if (isLoading){
        return <div className="mt-5">Loading rooms...</div>
    }

    if (errorMessage){
        return <div className="text-danger mt-5">Error : {errorMessage}</div>
    }

    return (
        <section className="bg-light, mb-5 mt-5 shadow">
            <Link to={"/browse-all-rooms"} className="hotel-color text-center">
                Browse rooms
            </Link>

            <Container>
                <Carousel indicators={false}>
                    {/*一次4个轮播 one carousel item contains 4 rooms 相当于建立了一个index数组 如果只需要创建一个新数组而不需要展开其元素，那么可以省略 [...]*/}
                    {/*第一个参数 _ 表示当前元素的值（在这里是 undefined，但因为不使用它，所以用下划线 _ 表示不使用这个参数*/}
                    {/*const totalPages = Math.ceil(rooms.length / 4);
                       const arrayPages = Array.from({ length: totalPages }, (_, index) => index);
                    */}
                    {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {rooms.slice(index *4, index *4 + 4).map((room)=>(
                                    <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                                        <Card>
                                            <Link to={`/book-room/${room.id}`}>
                                                <Card.Img
                                                variant="top"
                                                src={`data:image/png;base64, ${room.photo}`}
                                                alt="Room photo"
                                                className="w-100"
                                                style={{height: "200px"}}
                                                />
                                            </Link>
                                            <Card.Body>
                                                <CardTitle className="hotel-color">{room.roomType}</CardTitle>
                                                <CardTitle className="room-price">${room.roomPrice}/night</CardTitle>

                                                <div className="flex-shrink-0">
                                                    <Link to={`/book-room/${room.id}`} className="btn btn-sm btn-hotel">
                                                        Book Now
                                                    </Link>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </section>
    );
};

export default RoomCarousel;
