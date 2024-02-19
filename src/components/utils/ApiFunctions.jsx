import axios from "axios";

export const api = axios.create({
    baseURL :"http://localhost:9394"
})

export const getHeader = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

/* This function adds a new room to the database */
export const addRoom = async(photo, roomType, roomPrice) => {
    //用 FormData 主要是因为涉及到文件上传（例如，上传图片），而传统的 JSON 对象无法直接包含文件数据。
    const formData = new FormData()
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)

    const response = await api.post("/rooms/add/new-room", formData,{
        headers: getHeader()
    })
    return response.status === 201;
}

/* This function gets all room types from the database*/
export const getRoomTypes = async() => {
    try{
        const response = await api.get("/rooms/room/types")
        return response.data
    }catch (e) {
        throw new Error("Error fetching room types")
    }
}

/*This functions gets all rooms from the database */
export const getAllRooms = async() => {
    try{
        const result = await api.get("/rooms/all-rooms")
        return result.data
    }catch (e) {
        throw new Error("Error fetching rooms")
    }
  
}

/* This function deletes a room by the Id */
export const deleteRoom = async(roomId) => {

    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`,{
            headers: getHeader() //需要身份验证的的都需要添加 某些不需要的是游客都可以访问
        })
        return result.data
    }catch (e) {
        throw new Error(`Error deleting room ${e.message}`)
    }

}

/* This function update a room */
export const updateRoom = async (roomId, roomData) => {
    const formData = new FormData
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
    const  response = await api.put(`/rooms/update/${roomId}`, formData,{
        headers: getHeader()
    })
    return response
}

/* This function gets a room by the id */
export const getRoomById = async (roomId) => {
    try {
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    }catch (e) {
        throw new Error(`Error fetching room ${e.message}`)
    }
}

/* This function saves a new booking to the database */
export const bookRoom = async (roomId, booking) => {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
    }catch (e) {
        //使用 if (e.response && e.response.data) 判断的目的是为了区分网络请求错误和其他类型的错误，并对它们采取不同的处理方式
        if(e.response && e.response.data){
            throw new Error(e.response.data)
        }else {
            throw new Error(`Error booking room : ${e.message} `)
        }
    }
}

/* This function gets all bookings from the database */
export const getAllBookings = async () => {
  try {
      const result = await api.get("/bookings/all-bookings",{
          headers: getHeader()
      })
      return result.data
  }catch (e) {
      throw new Error(`Error fetching bookings: ${e.message}`)
  }
}

/* This function gets booking by the confirmation code*/
export const getBookingByConfirmationCode = async (confirmationCode) => {
  try {
      const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
      return result.data
  }catch (e) {
      //if后是数据请求不到（一般后端自定义了就加上） else后面比如是roomisnotAvailable 错误 或者逻辑错误
    if(e.response && e.response.data){
        throw new Error(e.response.data)
    }else {
        throw new Error(`Error find booking : ${e.message}`)
    }
  }
}

/* This function cancels booking*/
export const cancelBooking = async (bookingId) => {
  try {
      const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
      return result.data
  }catch (e) {
        throw new Error(`Error cancelling booking :${e.message}`)
  }
}

/* This function gets all available rooms from the database with a given date and a room type */

export const getAvailableRooms = async (checkInDate, checkOutDate, roomType) => {
  try {
      const result = await api.get(
          `rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
      return result.data
  }catch (e) {
      throw new Error(`Error get available rooms : ${e.message}`)
  }
}

export const registerUser = async (registration) => {
  try {
      const  response = await api.post("/auth/register-user", registration)
      return response.data
  }catch (error) {
      if (error.response && error.response.data){
          throw new Error(error.response.data)
      }else {
          throw new Error(`User registration error : ${error.message}`)
      }
  }
}

export const loginUser = async (login) => {

    try {
        const response = await api.post("/auth/login", login)
        if (response.status >= 200 && response.status <300){
            return response.data
        }else {
            return null
        }
    }catch (error) {
        console.error(error)
        return null
    }
}

export const getUserProfile = async (userId,token) => {
    try {
        const response = await api.get(`users/profile/${userId}`,{
            headers : getHeader()
        })
        return response.data
    }catch (error) {
        throw error
    }
}

export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(`/users/delete/${userId}`,{
            headers : getHeader()
        })
        return response.data
    } catch (error){
        return error.message
    }
}

//const token = localStorage.getItem("token")
export const getUser = async (userId, token) => {
    try {
        const response = await api.get(`/users/${userId}`,{
            headers: getHeader()
        })
        return response.data
    }catch (error) {
        throw error
    }
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId, token) {
    try {
        const response = await api.get(`/bookings/user/${userId}/bookings`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        console.error("Error fetching bookings:", error.message)
        throw new Error("Failed to fetch bookings")
    }
}