import React from 'react';
import './Account.css';

export default function AccountList() {
    return (
        <form className='form'>
            <label for="username">Tên chuyên viên:</label>
            <br />
            <input type="text" name="username" />
            <br />
            <label for="area">Khu vực:</label>
            <select name='area'>
                <option value={'Cầu Giấy'}>Cầu Giấy</option>
                <option value={'Thanh Xuân'}>Thanh Xuân</option>
                <option value={'Hoàn Kiếm'}>Hoàn Kiếm</option>
                <option value={'Tây Hồ'}>Tây Hồ</option>
            </select>
            <br />
            <label for="isActive">Trạng thái:</label>
            <select name='isActive'>
                <option value={true}>Đang hoạt động</option>
                <option value={false}>Không còn hoạt động</option>
            </select>
            <br />
            <button type="submit">Cập nhật</button>
        </form>
    );
}
