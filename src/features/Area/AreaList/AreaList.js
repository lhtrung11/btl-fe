import React from 'react'
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from '../../../api/axios';
import "./AreaList.css"
export default function AreaList() {
  const [area, setArea] = useState([]);
  let navigate = useNavigate();
  const getAreaList = useCallback(async () => {
    try {
        const token = localStorage.getItem('token');
        const option = {
            method: 'get',
            url: '/areas',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios(option);
        const area = response.data.data.area;
        if (area) {
            setArea(area);
        }
    } catch (error) {}
  }, [setArea]);

  useEffect(() => {
    getAreaList();
  }, [getAreaList]);
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


