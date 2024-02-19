import React, {useContext, useEffect, useState} from 'react';
import {loginUser} from "../utils/ApiFunctions.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Button, Container, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {AuthContext} from "./AuthProvider.jsx";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const location = useLocation()
    const redirectUrl = location.state?.path || "/"  //是否正在访问某个页面

    /** */
    const {handleLogin} = useContext(AuthContext)  //from component AuthProvider
    const handleInputChange = (e) => {
      const {name, value} = e.target
      setLogin({...login, [name]: value})
    }

    const handleSubmit= async(e) => {
        e.preventDefault()
        const success = await loginUser(login)
        if (success){
            const token = success.token
            // const decodedToken = jwtDecode(token)
            // localStorage.setItem("token", token)
            // localStorage.setItem("userId", decodedToken.sub) //userEmail
            // localStorage.setItem("userRole", decodedToken.roles.join(","))//join 方法用于将数组的所有元素连接为一个字符串，连接时使用指定的分隔符
            auth.handleLogin(token)
            navigate(redirectUrl, { replace: true })//{ replace: true } 是一个选项对象，其中的 replace: true 表示将当前路由记录替换为新的路由，而不是添加新的历史记录。这样，用户在使用浏览器的后退按钮时将直接跳过被替换的路由记录，而不是回到之前的记录。
            //refresh our page refresh the content that the user can get access to
            //window.location.reload()
        }else {
            setErrorMessage("Invalid username or password. Please try again.")
        }
        setTimeout(()=>{
            setErrorMessage("")
        },4000)
    }
    return (
        <Container className="col-6 mt-5 mb-5">
                {errorMessage && (<p className='alert alert-danger'>{errorMessage}</p>)}
                <h2>Login</h2>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-3">
                        <FormLabel htmlFor="email">
                            Email
                        </FormLabel>
                        <FormControl
                            id="email"
                            name="email"
                            type="email"
                            value={login.email}
                            onChange={handleInputChange}
                            placeholder="enter your email"
                       />
                    </FormGroup>

                    <FormGroup className="mb-3" >
                        <FormLabel htmlFor="password">
                            Password
                        </FormLabel>
                        <FormControl
                            id="password"
                            name="password"
                            type="password"
                            value={login.password}
                            onChange={handleInputChange}
                            placeholder="enter your password"
                        />
                    </FormGroup>
                    <div className="mb-3">
                        <Button
                            type="submit"
                            className="btn-hotel"
                            style={{marginRight : "10px"}}
                        >
                            Login
                        </Button>
                        <span style={{marginLeft: "10px"}}>
                            Don't have an account yet? <Link to={"/register"}> Register</Link>
                        </span>
                    </div>
                </Form>
        </Container>
    );
};

export default Login;
