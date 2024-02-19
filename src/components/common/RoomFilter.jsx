/* eslint-disable */
import React, {useState} from 'react';

//this component is used to filter rooms(select control)
const RoomFilter = ({data, setFilteredData}) => {

    const [filter, setFilter] = useState("")

    const handleSelectChange = (e) => {
        const selectedRoomType = e.target.value
        setFilter(selectedRoomType)
        const filteredRooms = data.filter((room) =>
            // room.roomType.toLowerCase().includes(filter.toLowerCase())) 错误原因filter数组是自动排的
            room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()))
        setFilteredData(filteredRooms)
    }

    const clearFilter = () => {
        setFilter("")
        setFilteredData(data)
    }

    //"", 是用空的 和有roomtype的组成一个新的数组
    // ... 运算符用于展开 Set 对象，将其元素逐个放入新数组中
    const roomTypes = ["", ...new Set(data.map((room) => room.roomType))]

    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="room-type-filter">
                Filter by room type
            </span>
            <select
            className="form-select"
            value={filter}
            onChange={handleSelectChange}
            >
                <option value={""}>select a room type to filter...</option>
                {roomTypes.map((type,index)=>(
                    <option key={index} value={type}>{type}</option>
                ))}
            </select>
            <button className="btn btn-hotel" type="button" onClick={clearFilter}>Clear Filter</button>

        </div>
    );
};

export default RoomFilter;
