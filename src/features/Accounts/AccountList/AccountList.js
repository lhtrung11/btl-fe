import React from 'react';
import './AccountList.css';

const AccountList = () => {
    return (
        <>
            <h1 className="listName">dữ liệu người dùng</h1>
            <table className="list">
                <tr>
                    <th>STT</th>
                    <th>Tên người dùng</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                    <th>Chỉnh sửa</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Tùng</td>
                    <td>Hoạt động</td>
                    <td>
                        <button type="submit">Xóa</button>
                    </td>
                    <td>
                        <button type="submit">Chỉnh sửa</button>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Trung</td>
                    <td>Không hoạt động</td>
                    <td>
                        <button type="submit">Xóa</button>
                    </td>
                    <td>
                        <button type="submit">Chỉnh sửa</button>
                    </td>
                </tr>
            </table>
        </>
    );
};

export default AccountList;
