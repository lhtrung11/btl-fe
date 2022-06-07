import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../api/axios';
import "./AreaForm.css"

const AREA_URL ='/areal';

const AreaForm = ({value}) => {
  //KIỂM TRA NẾU LÀ CHUYÊN VIÊN -> CHỈ ĐƯỢC ĐĂNG KÝ/CẬP NHẬT CƠ SỞ TRONG KHU VỰC CỦA MÌNH
  const [mode, setMode] = useState(value); //true -> đăng ký, false -> chỉnh sửa
  const [msg, setMsg] = useState('');
  const [area, setArea] = useState({});
  // const [address, setAddress] = useState("");
  const [license, setLicense] = useState({

  });

  const createArea = async (e) => {
    e.preventDefault();
    try {
        setArea({ ...area });
        const token = localStorage.getItem('token');
        const option = {
            method: 'post',
            url: `${AREA_URL}`,
            data: area,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios(option);
        setMsg('Đăng ký khu vực thành công!');
        } catch (error) {
            console.log(error);
        }
    };
  const updateArea = async (e) => {
        e.preventDefault();
        try {
        } catch (err) {
            setMsg('Chỉnh sửa không thành công');
            console.log(err);
        }
    };

  return (
    <>
        <Link to='/area' className="backBtn">
            <i className="fa fa-caret-square-o-left" /> 
            <text>Khu VỰC</text>
        </Link>
        <form 
        class="area-form" onSubmit={
        mode
            ? (e) => {
                createArea(e);
            }
            : (e) => {
                updateArea(e);
            }
        }
        >
            <label htmlFor="name">Tên khu vực:</label><br/>
            <input 
            placeholder="Nhập tên khu vực"
            type="text" 
            id="name" 
            name="name"
            value={area?.name || ''}
                        onChange={(e) => {
                        setMsg('');
                        setArea({ ...area, name: e.target.value });
                        }}
                        required>
            </input><br/>
            <button type="submit">Đăng ký</button>
        </form>
    </>
  )
}

export default AreaForm