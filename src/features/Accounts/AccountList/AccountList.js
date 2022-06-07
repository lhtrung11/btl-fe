import { React, useState, useCallback, useContext, useEffect } from 'react';
import AppContext from '../../../components/AppContext/AppContext';
import axios from '../../../api/axios';
import { Navigate, useLocation } from 'react-router-dom';
import './AccountList.css';

const ACCOUNT_URL = '/admin/accounts';

const AccountList = () => {
    const { state, dispatch } = useContext(AppContext);
    const location = useLocation();
    // QUERY
    const [query, setQuery] = useState({ role: '', isActive: '', area: '' });

    // const [accounts, setAccounts] = useState([]);
    const [users, setUsers] = useState([]);

    const getAllAccounts = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const option = {
                method: 'get',
                url: ACCOUNT_URL,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios(option);
            setUsers(
                response.data.data.users
                    .filter((account) => account.role === 'user')
                    .sort((account1, account2) => {
                        if (account2.isActive === false) {
                            return -1;
                        } else if (account1.isActive === false) {
                            return 1;
                        }
                    })
            );
        } catch (error) {}
    }, []);

    const handleDelete = async (e) => {
        const token = localStorage.getItem('token');
        const userID = e.target.value;
        const option = {
            method: 'delete',
            url: `${ACCOUNT_URL}/${userID}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios(option);
        setUsers((prevUsers) => {
            return prevUsers.filter((user) => user._id !== userID);
        });
    };

    useEffect(() => {
        getAllAccounts();
    }, [getAllAccounts]);

    return state.role === 'admin' ? (
        <>
            <h1 className="listName">quản lý người dùng</h1>
            <table className="list">
                <tr>
                    <th>STT</th>
                    <th>Tên tài khoản</th>
                    <th>Trạng thái</th>
                    <th>Khu vực</th>
                    <th>Xóa tài khoản</th>
                    <th>Chỉnh sửa</th>
                </tr>

                {users ? (
                    users.map((account, key) => {
                        return (
                            <tr>
                                <td>{key + 1}</td>
                                <td>{account.username}</td>
                                <td>
                                    {account.isActive
                                        ? 'Hoạt động'
                                        : 'Không hoạt động'}
                                </td>
                                <td>
                                    {!account.area &&
                                        'Chưa được đăng ký khu vực'}
                                    {account.area ===
                                        '629c67cc77b1cff0da27ee72' &&
                                        'Quận Cầu Giấy'}
                                    {account.area ===
                                        '629c67ea77b1cff0da27ee74' &&
                                        'Quận Thanh Xuân'}
                                    {account.area ===
                                        '629c681077b1cff0da27ee7a' &&
                                        'Quận Hoàn Kiếm'}
                                    {account.area ===
                                        '629c67f677b1cff0da27ee76' &&
                                        'Quận Tây Hồ'}
                                    {account.area ===
                                        '629c682177b1cff0da27ee7e' &&
                                        'Quận Long Biên'}
                                    {account.area ===
                                        '629c687277b1cff0da27ee82' &&
                                        'Quận Bắc Từ Liêm'}
                                    {account.area === '-' &&
                                        'Quận Hai Bà Trưng'}
                                    {account.area ===
                                        '629cda29c6bb221d0fb7b8dd' &&
                                        'Quận Hoàng Mai'}
                                    {account.area ===
                                        '629cda2fc6bb221d0fb7b8df' &&
                                        'Quận Hà Đông'}
                                    {account.area ===
                                        '629c687777b1cff0da27ee84' &&
                                        'Quận Nam Từ Liêm'}
                                    {account.area ===
                                        '629cda36c6bb221d0fb7b8e1' &&
                                        'Quận Đống Đa'}
                                    {account.area ===
                                        '629cda69c6bb221d0fb7b8e9' &&
                                        'Huyện Ba Vì'}
                                    {account.area ===
                                        '629cda58c6bb221d0fb7b8e5' &&
                                        'Huyện Gia Lâm'}
                                    {account.area ===
                                        '629cda63c6bb221d0fb7b8e7' &&
                                        'Huyện Hoài Đức'}
                                    {account.area ===
                                        '629cda78c6bb221d0fb7b8eb' &&
                                        'Huyện Mê Linh'}
                                    {account.area ===
                                        '629cda82c6bb221d0fb7b8ed' &&
                                        'Huyện Sóc Sơn'}
                                    {account.area ===
                                        '629cda9bc6bb221d0fb7b8f1' &&
                                        'Huyện Thanh Trì'}
                                    {account.area ===
                                        '629cda8bc6bb221d0fb7b8ef' &&
                                        'Huyện Thạch Thất'}
                                    {account.area ===
                                        '629cda4ec6bb221d0fb7b8e3' &&
                                        'Huyện Đan Phượng'}
                                    {account.area ===
                                        '629c682d77b1cff0da27ee80' &&
                                        'Huyện Đông Anh'}
                                </td>
                                <td>
                                    <button
                                        type="submit"
                                        value={account._id}
                                        onClick={(e) => handleDelete(e)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                                <td>
                                    <button
                                        value={account.username}
                                        type="submit"
                                    >
                                        <a href={`users/${account._id}`}>
                                            Chỉnh sửa
                                        </a>
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <p>Không có dữ liệu</p>
                )}
            </table>
        </>
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default AccountList;
