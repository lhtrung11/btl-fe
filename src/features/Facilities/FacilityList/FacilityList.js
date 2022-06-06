import React from 'react';
import { useState } from 'react';
import './FacilityList.css';

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

export default function FacilityList() {
    return (
        <table>
            <tr>
                <th>STT</th>
                <th>Tên cơ sở</th>
                <th>
                    <button onclick="myFunction()" className="dropbtn">
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
                    <button onclick="myFunction2()" class="dropbtn">
                        Loại hình kinh doanh
                    </button>
                    <div id="myDropdown2" class="dropdown-content">
                        <a href="#Home">Home</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                    </div>
                </th>
                <th>
                    <button onclick="myFunction3()" class="dropbtn">
                        Giấy phép
                    </button>
                    <div id="myDropdown3" class="dropdown-content">
                        <a href="#Home">Home</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                    </div>
                </th>
                <th>Xóa</th>
                <th>Chỉnh sửa</th>
            </tr>
            <tr>
                <td>1</td>
                <td>Thực phẩm</td>
                <td>Cầu Giấy</td>
                <td>0123456789</td>
                <td>Kinh doanh thực phẩm</td>
                <td>Hoạt động</td>
                <td>
                    <button type="submit">Xóa</button>
                </td>
                <td>
                    <button type="submit">Chỉnh sửa</button>
                </td>
            </tr>
        </table>
    );
}
