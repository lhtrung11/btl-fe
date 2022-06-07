import React from 'react';
import { useState, useCallback, useEffect } from 'react';
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
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };
    const [facilities, setFacilities] = useState([]);

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

    return (
        <table className='FacilityList'>
            <tr>
                <th>STT</th>
                <th>Tên cơ sở</th>
                <th>
                    <button onClick={() => myFunction()} className="dropbtn">
                        Khu vực
                    </button>
                    <div id="myDropdown" className="dropdown-content">
                        <a href="#Home">Home</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                    </div>
                </th>
                <th>Số điện thoại</th>
                <th>
                    <button onClick={() => myFunction2()} className="dropbtn">
                        Loại hình kinh doanh
                    </button>
                    <div id="myDropdown2" className="dropdown-content">
                        <a href="#Home">Home</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                    </div>
                </th>
                <th>
                    <button onClick={() => myFunction3()} className="dropbtn">
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
            <tr>
                {facilities.map((fac, index) => {
                    return (
                        <>
                            <td>{index}</td>
                            <td>{fac.name}</td>
                            <td>{fac.area.name}</td>
                            <td>{fac.contact}</td>
                            <td>{fac.address}</td>
                            <td>{fac.business}</td>
                            <td>
                                <button type="submit" onClick>
                                    Xóa
                                </button>
                            </td>
                            <td>
                                <button type="submit">Chỉnh sửa</button>
                            </td>
                        </>
                    );
                })}
            </tr>
        </table>
    );
}
