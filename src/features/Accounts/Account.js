import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AppContext from '../../components/AppContext/AppContext';
import './Account.css';

const Account = () => {
    const { state, dispatch } = useContext(AppContext);
    
    return (
        state.role === "admin" ? (
            <form className="form">
                <label htmlFor="username">Tên chuyên viên:</label>
                <br />
                <input type="text" name="username" />
                <br />
                <label htmlFor="area">Khu vực:</label>
                <select name="area">
                    <option value={'caugiay'}>Cầu Giấy</option>
                    <option value={'thanhxuan'}>Thanh Xuân</option>
                    <option value={'hoankiem'}>Hoàn Kiếm</option>
                    <option value={'tayho'}>Tây Hồ</option>
                    <option value={'hoangmai'}>Hoàng Mai</option>
                    <option value={'null'}>Chưa được đăng ký khu vực</option>
                </select>
                <br />
                <label htmlFor="isActive">Trạng thái:</label>
                <select name="isActive">
                    <option value={true}>Đang hoạt động</option>
                    <option value={false}>Không còn hoạt động</option>
                </select>
                <br />
                <button type="submit">Cập nhật</button>
            </form>
        ) : (
            <Navigate to='/' push/>
        )
    );
}

export default Account;