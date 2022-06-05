import React from 'react';
import './Account.css';

export default function Account() {
    
    
    return (
        <form className="form">
            <label for="username">Tên chuyên viên:</label>
            <br />
            <input type="text" name="username" />
            <br />
            <label for="area">Khu vực:</label>
            <select name="area">
                <option value={'caugiay'}>Cầu Giấy</option>
                <option value={'thanhxuan'}>Thanh Xuân</option>
                <option value={'hoankiem'}>Hoàn Kiếm</option>
                <option value={'tayho'}>Tây Hồ</option>
                <option value={'hoangmai'}>Hoàng Mai</option>
                <option value={'null'}>Chưa được đăng ký khu vực</option>
            </select>
            <br />
            <label for="isActive">Trạng thái:</label>
            <select name="isActive">
                <option value={true}>Đang hoạt động</option>
                <option value={false}>Không còn hoạt động</option>
            </select>
            <br />
            <button type="submit">Cập nhật</button>
        </form>
    );
}
