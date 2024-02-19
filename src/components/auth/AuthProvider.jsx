import React, {createContext, useState} from 'react';
import {jwtDecode} from "jwt-decode";


//this component is used to track our user authentication when user logs in and logs out

// React 上下文（Context）。上下文是 React 中一种用于在组件之间传递数据的机制，可以让您避免手动将 props 传递到每个层次深的组件。
export const AuthContext = createContext({
    user: null,
    handleLogin : (token)  => {},
    handleLogout : () =>{}
})

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)

    const handleLogin = (token) => {
      const decodedToken = jwtDecode(token)
        localStorage.setItem("userId", decodedToken.sub)
        localStorage.setItem("userRole",decodedToken.roles)
        localStorage.setItem("token", token)
        setUser(decodedToken)
    }

    const handleLogout = () => {
        localStorage.removeItem("userId")
        localStorage.removeItem("userRole")
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user,handleLogin,handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
