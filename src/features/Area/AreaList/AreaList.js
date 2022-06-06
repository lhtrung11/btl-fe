import React from 'react'
import "./AreaList.css"
export const AreaList = () => {
  return (
    <>
    <content class="header">Bảng dữ liệu hệ thống khu vực</content>
    <table class="table">
        <tr>
            <th>STT</th>
            <th>Tên khu vực</th>
            <th>Trạng thái</th>
        </tr>
        <tr>
            <td>1</td>
            <td>Tùng</td>
            <td>Hoạt động</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Trung</td>
            <td>Không hoạt động</td>
        </tr>
    </table>
    </>
  )
}

export default AreaList

