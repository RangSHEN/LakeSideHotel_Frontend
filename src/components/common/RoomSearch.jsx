import React, {useState} from 'react';
import moment from "moment";
import {getAvailableRooms} from "../utils/ApiFunctions.jsx";
import {Button, Col, Container, Form, FormLabel, Row} from "react-bootstrap";
import RoomTypeSelector from "./RoomTypeSelector.jsx";
import RoomSearchResult from "./RoomSearchResult.jsx";

const RoomSearch = () => {
    const[searchQuery, setSearchQuery] = useState({
        checkInDate : "",
        checkOutDate: "",
        roomType: ""
    })
    const[errorMessage, setErrorMessage] = useState("")
    const[availableRooms, setAvailableRooms] = useState([])
    const[isLoading, setIsLoading] = useState(false)

    const handleSearch = (e)=> {
        e.preventDefault();
        const checkIn = moment(searchQuery.checkInDate)
        const checkOut = moment(searchQuery.checkOutDate)
        if(!checkIn.isValid() || !checkOut.isValid()){
            setErrorMessage("Please, enter valid date range")
            return //return 语句通常用于退出当前函数或方法
        }
        if(!checkOut.isSameOrAfter(checkIn)){
            setErrorMessage("Check-In Date must come before Check-Out Date")
            return
        }
        setIsLoading(true)
        fetchAvailableRooms()
    }

    const fetchAvailableRooms = async () => {
        try {
            const result = await getAvailableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType)
            setAvailableRooms(result)
            setTimeout(()=>{
                setIsLoading(false)
            },2000)
        }catch (error){
            console.log(error)
        }finally { //finally 语句块中的代码通常用于确保在任何情况下都会执行，无论是否发生异常
            setIsLoading(false)
        }
    }

    const handleInputChange = (e) => {
      const { name, value} = e.target
      setSearchQuery({...searchQuery, [name]: value})
      const checkIn = moment(searchQuery.checkInDate)
      const checkOut = moment(searchQuery.checkOutDate)
      if (checkIn.isValid() && checkOut.isValid()){ //moment() 是 Moment.js 中用于创建日期时间对象的函数，而 isValid() 用于检查日期时间对象是否有效
        setErrorMessage("")
      }
    }

    const ClearSearch = () => {
      setSearchQuery({
          checkInDate: "",
          checkOutDate: "",
          roomType: ""
      })
      setAvailableRooms([])
    }



    return (
        <>
            <Container className='mt-5 mb-5 py-5 shadow'>
                <Form onSubmit={handleSearch}>
                    <Row className="justify-content-center">
                       <Col xs={12} md={3}>
                           <Form.Group controlId='checkInDate'>
                               <Form.Label>Check-in date</Form.Label>
                               <Form.Control
                                    type="date"
                                    name="checkInDate"
                                    value={searchQuery.checkInDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                               />
                           </Form.Group>
                       </Col>

                        <Col xs={12} md={3}>
                            <Form.Group controlId='checkOutDate'>
                                <Form.Label>Check-out date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="checkOutDate"
                                    value={searchQuery.checkOutDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group>
                                <FormLabel>Room Type</FormLabel>
                                <div className='d-flex'>
                                    <RoomTypeSelector
                                        handleRoomInputChange={handleInputChange}
                                        newRoom={searchQuery}
                                    />
                                    <Button variant="secondary" type="submit" onClick={handleSearch}>Search</Button>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                {isLoading ? (
                    <p>finding available rooms .....</p>
                ): availableRooms ? (
                    <RoomSearchResult
                        results={availableRooms}
                        onClearSearch={ClearSearch}/>
                ):(
                    <p>No rooms available for the selected dates and room type</p>
                )}
                {errorMessage && (
                    <p className="text-danger">{errorMessage}</p>
                )}

            </Container>
        </>
    );
};

export default RoomSearch;
