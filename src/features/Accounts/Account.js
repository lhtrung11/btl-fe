import React from 'react';
import './Account.css';

export default function AccountList() {
    return (
        <form>
            <label htmlFor="username">Tên tài khoản:</label>
            <br />
            <input type="text" name="username" />
            <br />
            <label htmlFor="password">Mật khẩu:</label>
            <br />
            <input type="text" name="password" />
            <br />
            <label htmlFor="role">Quản lý</label>
            <br />
            <select>
                <option value={'Cầu Giấy'}>Cầu Giấy</option>
                <option value={'Thanh Xuân'}>Thanh Xuân</option>
                <option value={'Hoàn Kiếm'}>Hoàn Kiếm</option>
                <option value={'Tây Hồ'}>Tây Hồ</option>
            </select>
            <br />
            <label htmlFor="isActive">Trạng thái:</label>
            <br />
            <input type="checkbox" name="isActive" />
            <br />
            <button type="submit">Đăng ký</button>
        </form>
    );
}
