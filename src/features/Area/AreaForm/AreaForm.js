import React from 'react'
import "./AreaForm.css"

const AreaForm = () => {
  return (
    <form class="area-form">
        <label htmlFor="name">Tên khu vực:</label><br/>
        <input type="text" id="name" name="name"></input><br/>
        <label htmlFor="managers">Tên chuyên viên:</label><br/>
        <input type="text" id="managers" name="managers"></input><br/>
        <button type="submit">Đăng ký</button>
    </form>
  )
}

export default AreaForm