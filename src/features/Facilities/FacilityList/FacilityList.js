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
        document.getElementById('myDropdown2').classList.toggle('show');
    };

    const myFunction3 = () => {
        document.getElementById('myDropdown3').classList.toggle('show');
    };

    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName('dropdown-content');
            var dropdowns1 =
                document.getElementsByClassName('dropdown-content1');
            var dropdowns2 =
                document.getElementsByClassName('dropdown-content2');
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
        <>
            <h1 className="listName"> Danh s??ch c?? s???</h1>
            <table className="FacilityList">
                <tr>
                    <th>STT</th>
                    <th>T??n c?? s???</th>
                    <th>Khu v???c</th>
                    <th>S??? ??i???n tho???i</th>
                    <th>
                        <button onClick={() => myFunction2()} class="dropbtn">
                            Lo???i h??nh kinh doanh
                        </button>
                        <div id="myDropdown2" className="dropdown-content1">
                            <a href="#Home">Home</a>
                            <a href="#about">About</a>
                            <a href="#contact">Contact</a>
                        </div>
                    </th>
                    <th>Lo???i h??nh kinh doanh</th>
                    <th>
                        <button
                            onClick={() => myFunction3()}
                            className="dropbtn"
                        >
                            Gi???y ph??p
                        </button>
                        <div id="myDropdown3" className="dropdown-content2">
                            <a href="#Home">Home</a>
                            <a href="#about">About</a>
                            <a href="#contact">Contact</a>
                        </div>
                    </th>
                    <th>X??a</th>
                    <th>Chi ti???t</th>
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
                            <td>{fac.license?.isActive ? 'C??' : 'Kh??ng'}</td>
                            <td>
                                <button
                                    type="submit"
                                    onClick={(e) => handleDelete(e)}
                                    value={fac._id}
                                >
                                    X??a
                                </button>
                            </td>
                            <td>
                                <button
                                    type="submit"
                                    onClick={(e) => handleInsert(e)}
                                    value={fac._id}
                                >
                                    Chi ti???t
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </table>
        </>
    );
}
