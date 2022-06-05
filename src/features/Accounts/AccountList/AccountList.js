import { React, useState, useCallback, useContext, useEffect } from 'react';
import AppContext from '../../../components/AppContext/AppContext';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import './AccountList.css';

const ACCOUNT_URL = '/admin/accounts';

const AccountList = () => {
    // KIỂM TRA TÀI KHOẢN CÓ PHẢI ADMIN KHÔNG -> KHÔNG THÌ NAVIGATE LẠI HOME
    const { state, dispatch } = useContext(AppContext);
    const { accounts } = state;
    const [users, setUsers] = useState({});
    const navigate = useNavigate();

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
            const accounts = response.data.data.users;
            dispatch({ type: 'GET_ALL_ACCOUNTS', payload: accounts });
            setUsers(
                accounts
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
    }, [dispatch]);

    useEffect(() => {
        getAllAccounts();
    }, [getAllAccounts]);

    const handleUpdate = (e) => {
        navigate('/accounts', { state: state });
    };

    return (
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

                {accounts ? (
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
                                    {account.area
                                        ? account.area
                                        : 'Chưa được đăng ký khu vực'}
                                </td>
                                <td>
                                    <button type="submit">Xóa</button>
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
    );
};

export default AccountList;
