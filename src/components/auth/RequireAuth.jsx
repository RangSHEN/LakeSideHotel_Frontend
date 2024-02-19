import React from 'react';
import {Navigate, useLocation} from "react-router-dom";

//children 属性代表在 <RequireAuth>...</RequireAuth> 中嵌套的子组件或元素。
const RequireAuth = ({ children }) => {
    const user = localStorage.getItem("userId")
    const location = useLocation()
    //为假 null、undefined 或空字符串 将当前路径 (location.pathname) 包含在状态中，以便在成功登录后将用户重定向回最初请求的页面。
    if (!user) {
        return <Navigate to="/login" state={{ path: location.pathname }} />  //uselocation 用于获取当前页面的路由信息
    }
    //如果已经身份验证，则返回子组件 bookingform
    return children
}
export default RequireAuth
