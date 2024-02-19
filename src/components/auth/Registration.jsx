import React, {useState} from 'react';
import {registerUser} from "../utils/ApiFunctions.jsx";
import {Button, Container, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Link} from "react-router-dom";

const Registration = () => {
    const [registration, setRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const [errorMessage, setErrorMessage]= useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const handleInputChange = (e) => {
      const {name, value} = e.target
        setRegistration({...registration, [name]: value})
    }

    const handleRegistration = async(e) => {
        e.preventDefault()
        try {
            const result = await registerUser(registration)
            setSuccessMessage(result)
            setErrorMessage("")
            setRegistration({firstName: "", lastName: "", email: "", password: ""})
        }catch (error){
            setSuccessMessage("")
            setErrorMessage(`Registration error : ${error.message}`)
        }
        setTimeout(()=>{
            setErrorMessage("")
            setSuccessMessage("")
        }, 5000)
    }
    return (
        <Container className="col-6 mt-5 mb-5">
            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            {successMessage && <p className="alert alert-success">{successMessage}</p>}
            <h2>Register</h2>
            <Form onSubmit={handleRegistration}>
                <FormGroup className="mb-3">
                    <FormLabel htmlFor="firstName" className="col-sm-2">
                        first Name
                    </FormLabel>
                    <div className="col-sm-10">
                        <FormControl
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={registration.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                </FormGroup>

                <FormGroup className="mb-3">
                    <FormLabel htmlFor="lastName" className="col-sm-2">
                        last Name
                    </FormLabel>
                    <div className="col-sm-10">
                        <FormControl
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={registration.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                </FormGroup>

                <FormGroup className="mb-3">
                    <FormLabel htmlFor="email" className="col-sm-2">
                        email
                    </FormLabel>
                    <div className="col-sm-10">
                        <FormControl
                            id="email"
                            name="email"
                            type="text"
                            value={registration.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </FormGroup>

                <FormGroup className="mb-3">
                    <FormLabel htmlFor="password" className="col-sm-2">
                        password
                    </FormLabel>
                    <div className="col-sm-10">
                        <FormControl
                            id="password"
                            name="password"
                            type="text"
                            value={registration.password}
                            onChange={handleInputChange}
                        />
                    </div>
                </FormGroup>
                <div className="mb-3">
                    <Button type="submit" className="btn-primary btn-hotel" style={{marginRight: "10px"}}>
                        Register
                    </Button>
                    <span style={{marginLeft: "10px"}}>
                        Already have an account？ <Link to={"/login"}>Login</Link>
                    </span>
                </div>

            </Form>
        </Container>
    );
};

export default Registration;
