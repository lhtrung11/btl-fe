import { React, useState, useCallback, useContext, useEffect } from 'react';
import AppContext from '../../../components/AppContext/AppContext';
import axios from '../../../api/axios';
import { Navigate, useLocation } from 'react-router-dom';
import './AccountList.css';

const ACCOUNT_URL = '/admin/accounts';

const AccountList = () => {
    const { state, dispatch } = useContext(AppContext);
    const location = useLocation();
    console.log(state);
    
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
            // setAccounts(() => {
            //     return response.data.data.users;
            // });
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
                                    {account.area
                                        ? account.area
                                        : 'Chưa được đăng ký khu vực'}
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
