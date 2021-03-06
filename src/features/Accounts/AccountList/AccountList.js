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
            <h1 className="listName">qu???n l?? ng?????i d??ng</h1>
            <table className="list">
                <tr>
                    <th>STT</th>
                    <th>T??n t??i kho???n</th>
                    <th>Tr???ng th??i</th>
                    <th>Khu v???c</th>
                    <th>X??a t??i kho???n</th>
                    <th>Ch???nh s???a</th>
                </tr>

                {users ? (
                    users.map((account, key) => {
                        return (
                            <tr>
                                <td>{key + 1}</td>
                                <td>{account.username}</td>
                                <td>
                                    {account.isActive
                                        ? 'Ho???t ?????ng'
                                        : 'Kh??ng ho???t ?????ng'}
                                </td>
                                <td>
                                    {!account.area &&
                                        'Ch??a ???????c ????ng k?? khu v???c'}
                                    {account.area ===
                                        '629c67cc77b1cff0da27ee72' &&
                                        'Qu???n C???u Gi???y'}
                                    {account.area ===
                                        '629c67ea77b1cff0da27ee74' &&
                                        'Qu???n Thanh Xu??n'}
                                    {account.area ===
                                        '629c681077b1cff0da27ee7a' &&
                                        'Qu???n Ho??n Ki???m'}
                                    {account.area ===
                                        '629c67f677b1cff0da27ee76' &&
                                        'Qu???n T??y H???'}
                                    {account.area ===
                                        '629c682177b1cff0da27ee7e' &&
                                        'Qu???n Long Bi??n'}
                                    {account.area ===
                                        '629c687277b1cff0da27ee82' &&
                                        'Qu???n B???c T??? Li??m'}
                                    {account.area === '-' &&
                                        'Qu???n Hai B?? Tr??ng'}
                                    {account.area ===
                                        '629cda29c6bb221d0fb7b8dd' &&
                                        'Qu???n Ho??ng Mai'}
                                    {account.area ===
                                        '629cda2fc6bb221d0fb7b8df' &&
                                        'Qu???n H?? ????ng'}
                                    {account.area ===
                                        '629c687777b1cff0da27ee84' &&
                                        'Qu???n Nam T??? Li??m'}
                                    {account.area ===
                                        '629cda36c6bb221d0fb7b8e1' &&
                                        'Qu???n ?????ng ??a'}
                                    {account.area ===
                                        '629cda69c6bb221d0fb7b8e9' &&
                                        'Huy???n Ba V??'}
                                    {account.area ===
                                        '629cda58c6bb221d0fb7b8e5' &&
                                        'Huy???n Gia L??m'}
                                    {account.area ===
                                        '629cda63c6bb221d0fb7b8e7' &&
                                        'Huy???n Ho??i ?????c'}
                                    {account.area ===
                                        '629cda78c6bb221d0fb7b8eb' &&
                                        'Huy???n M?? Linh'}
                                    {account.area ===
                                        '629cda82c6bb221d0fb7b8ed' &&
                                        'Huy???n S??c S??n'}
                                    {account.area ===
                                        '629cda9bc6bb221d0fb7b8f1' &&
                                        'Huy???n Thanh Tr??'}
                                    {account.area ===
                                        '629cda8bc6bb221d0fb7b8ef' &&
                                        'Huy???n Th???ch Th???t'}
                                    {account.area ===
                                        '629cda4ec6bb221d0fb7b8e3' &&
                                        'Huy???n ??an Ph?????ng'}
                                    {account.area ===
                                        '629c682d77b1cff0da27ee80' &&
                                        'Huy???n ????ng Anh'}
                                </td>
                                <td>
                                    <button
                                        type="submit"
                                        value={account._id}
                                        onClick={(e) => handleDelete(e)}
                                    >
                                        X??a
                                    </button>
                                </td>
                                <td>
                                    <button
                                        value={account.username}
                                        type="submit"
                                    >
                                        <a href={`users/${account._id}`}>
                                            Ch???nh s???a
                                        </a>
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <p>Kh??ng c?? d??? li???u</p>
                )}
            </table>
        </>
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default AccountList;
