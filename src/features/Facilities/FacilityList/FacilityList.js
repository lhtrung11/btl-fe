import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from '../../../api/axios';
import './FacilityList.css';

export default function FacilityList() {
    const myFunction = () => {
        document.getElementById('myDropdown').classList.add('show');
    };

    const myFunction2 = () => {
        document.getElementById('myDropdown2').classList.add('show');
    };

    const myFunction3 = () => {
        document.getElementById('myDropdown3').classList.add('show');
    };

    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName('dropdown-content');
            var dropdowns1 = document.getElementsByClassName('dropdown-content1');
            var dropdowns2 = document.getElementsByClassName('dropdown-content2');
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
            for (i = 0; i < dropdowns1.length; i++) {
                var openDropdown = dropdowns1[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
            for (i = 0; i < dropdowns2.length; i++) {
                var openDropdown = dropdowns2[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };
    const [facilities, setFacilities] = useState([]);
    let navigate = useNavigate();
    const getFacilityList = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const option = {
                method: 'get',
                url: '/facilities',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios(option);
            const facilities = response.data.data.facilities;
            if (facilities) {
                setFacilities(facilities);
            }
        } catch (error) {}
    }, [setFacilities]);

    useEffect(() => {
        getFacilityList();
    }, [getFacilityList]);

    const handleDelete = async (e) => {
        const token = localStorage.getItem('token');
        const facilityId = e.target.value;
        const option = {
            method: 'delete',
            url: `facilities/${facilityId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios(option);
        setFacilities((prevFacilities) => {
            return prevFacilities.filter((fac) => fac._id !== facilityId);
        });
    };

    const handleInsert = (e) => {
        return navigate(`/facilities/${e.target.value}`);
    };

    return (
        <table className="FacilityList">
            <tr>
                <th>STT</th>
                <th>Tên cơ sở</th>
                <th>
                    <button onClick={() => myFunction()} class="dropbtn">
                        Khu vực
                    </button>
                    <div id="myDropdown" class="dropdown-content">
                        <a href="#Home">Home</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                    </div>
                </th>
                <th>Số điện thoại</th>
                <th>
                    <button onClick={() => myFunction2()} class="dropbtn">
                        Loại hình kinh doanh
                    </button>
                    <div id="myDropdown2" class="dropdown-content1">
                        <a href="#Home">Home</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                    </div>
                </th>
                <th>
                    <button onClick={() => myFunction3()} class="dropbtn">
                        Giấy phép
                    </button>
                    <div id="myDropdown3" class="dropdown-content2">
                        <a href="#Home">Home</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                    </div>
                </th>
                <th>Xóa</th>
                <th>Chỉnh sửa</th>
            </tr>
            <tr>
                {facilities.map((fac, index) => {
                    return (
                        <>
                            <td>{index}</td>
        <>
            <h1 className="facilityListName">Danh sách cơ sở</h1>
            <table className="FacilityList">
                <tr>
                    <th>STT</th>
                    <th>Tên cơ sở</th>
                    <th>
                        <button
                            onClick={() => myFunction()}
                            className="dropbtn"
                        >
                            Khu vực
                        </button>
                        <div id="myDropdown" className="dropdown-content">
                            <a href="#Home">Home</a>
                            <a href="#about">About</a>
                            <a href="#contact">Contact</a>
                        </div>
                    </th>
                    <th>Số điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>
                        <button
                            onClick={() => myFunction2()}
                            className="dropbtn"
                        >
                            Loại hình kinh doanh
                        </button>
                        <div id="myDropdown2" className="dropdown-content">
                            <a href="#Home">Home</a>
                            <a href="#about">About</a>
                            <a href="#contact">Contact</a>
                        </div>
                    </th>
                    <th>
                        <button
                            onClick={() => myFunction3()}
                            className="dropbtn"
                        >
                            Giấy phép
                        </button>
                        <div id="myDropdown3" className="dropdown-content">
                            <a href="#Home">Home</a>
                            <a href="#about">About</a>
                            <a href="#contact">Contact</a>
                        </div>
                    </th>
                    <th>Xóa</th>
                    <th>Chỉnh sửa</th>
                </tr>

                {facilities.map((fac, index) => {
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{fac.name}</td>
                            <td>{fac.area.name}</td>
                            <td>{fac.contact}</td>
                            <td>{fac.address}</td>
                            <td>{fac.business}</td>
                            <td>{fac.license?.isActive ? 'Có' : 'Không'}</td>
                            <td>
                                <button
                                    type="submit"
                                    onClick={(e) => handleDelete(e)}
                                    value={fac._id}
                                >
                                    Xóa
                                </button>
                            </td>
                            <td>
                                <button
                                    type="submit"
                                    onClick={(e) => handleInsert(e)}
                                    value={fac._id}
                                >
                                    Chỉnh sửa
                                </button>
                            </td>
                        </>
                    );
                })}
            </tr>
        </table>
                                    Chi tiết
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </table>
        </>
    );
}
