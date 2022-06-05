import { React, useState, useRef } from 'react'
import axios from '../../../api/axios';
import './FacilityForm.css'

const FACILITY_URL = '/facilities/';

const FacilityForm = () => {    
    const [ mode, setMode ] = useState(true); //true -> đăng ký, false -> chỉnh sửa
    const [ msg, setMsg ] = useState('');
    const [ facility, setFacility ] = useState({ address: {}});
    const [ address, setAddress ] = useState({});
    const [ license, setLicense ] = useState({
        business: null,
        issueDate: null,
        expireDate: null,
        isActive: false,
    });
    const createFacility = async (e) => {
        e.preventDefault();
        try {
            setFacility({...facility, address, license});
            console.log(facility);
            const token = localStorage.getItem('token');
            const option = {
                method: 'post',
                url: `${FACILITY_URL}`,
                data: facility,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios(option);
            setMsg("Đăng ký cơ sở mới thành công!")
        } catch (error) {
            console.log(error);
        }
    }
    const updateFacility = async (e) => {
        e.preventDefault();
        try {

        } catch (err) {
            setMsg("Chỉnh sửa không thành công");
            console.log(err);
        }
    }

    return (
        <form 
            className='facilityForm'
            onSubmit={ 
                mode ? (
                    (e) => { createFacility(e) }
                ) : (
                    (e) => { updateFacility(e) }
                )
            }
        >
            <h1>
                {mode ? (
                    "Đăng ký cơ sở mới"
                ) : (
                    "Chỉnh sửa thông tin cơ sở"
                )} 
            </h1>
            
            <label htmlFor="name">Tên cơ sở:</label>
            <input 
                placeholder="Nhập tên cơ sở"
                type="text" 
                name="name"
                value={facility?.name || ''}
                onChange={(e) => {
                    setFacility({...facility, name: e.target.value})
                }}
                required
            />
            
            <label htmlFor="area">Khu vực:</label>
            <select 
                name="area" 
                value={facility?.area}
                onChange={(e) => {
                    setFacility({...facility, area: e.target.value});
                }}
            >
                <option value={'null'}>Chưa được đăng ký khu vực</option>
                <option value={'caugiay'}>Cầu Giấy</option>
                <option value={'thanhxuan'}>Thanh Xuân</option>
                <option value={'hoankiem'}>Hoàn Kiếm</option>
                <option value={'tayho'}>Tây Hồ</option>
                <option value={'hoangmai'}>Hoàng Mai</option>
            </select>

            <label>Địa chỉ:</label>
            <ul>
                <li>
                    <label htmlFor="ward">Xã phường:</label>
                    <input 
                        placeholder='Nhập xã/phường'
                        type="text" 
                        name="ward"
                        value={address?.ward || ''}
                        onChange={(e) => {
                            setAddress({...address, ward: e.target.value});
                        }}
                        required 
                    />
                </li>
                <li>
                    <label htmlFor="street">Phố:</label>
                    <input 
                        placeholder='Nhập tên phố'
                        type="text" 
                        name="street" 
                        value={address?.street || ''}
                        onChange={(e) => {
                            setAddress({...address, street: e.target.value});
                        }}
                        required
                    />
                </li>
                <li>
                    <label htmlFor="detail">Chi tiết khác (Không bắt buộc):</label>
                    <input 
                        placeholder='Nhập các thông tin khác'
                        type="text" 
                        name="detail" 
                        value={address?.detail || ''}
                        onChange={(e) => {
                            setAddress({...address, detail: e.target.value});
                        }}
                    />
                </li>
            </ul>
                            
            <label htmlFor="contact">Số điện thoại:</label>
            <input 
                placeholder='Nhập số điện thoại'
                type="text" 
                name="contact" 
                value={facility?.contact || ''}
                onChange={(e) => {
                    setFacility({...facility, contact: e.target.value});
                }}
                required
            />
            
            <label htmlFor="business">Loại hình kinh doanh:</label>
            <input 
                placeholder='Nhập loại hình kinh doanh'
                type="text" 
                name="business" 
                value={facility?.business || ''}
                onChange={(e) => {
                    setFacility({...facility, business: e.target.value});
                    setLicense({...license, business: e.target.value});
                }}
                required
            />
            
            <label>Giấy phép hoạt động: </label>
            <ul>
                <li>
                    <label htmlFor="business">Loại hình kinh doanh</label>
                     <input 
                        placeholder='Nhập loại hình kinh doanh'
                        type="text" 
                        name="business" 
                        value={license?.business || ''}
                        onChange={(e) => {
                            setFacility({...facility, business: e.target.value});
                            setLicense({...license, business: e.target.value});
                        }}
                    />
                </li>
                <li>
                    <label htmlFor="issueDate">Ngày cấp:</label>
                    <input 
                        type="date" 
                        name="issueDate" 
                        value={license?.issueDate || ''}
                        onChange={(e) => {
                            setMsg('');
                            if (!license?.expireDate){
                                setLicense({...license, issueDate: e.target.value, expireDate: e.target.value});
                            }
                            else if (e.target.value <= license.expireDate){
                                setLicense({...license, issueDate: e.target.value});
                            } else {
                                setMsg('Ngày cấp phát không được sau ngày hết hạn');
                            }
                        }}
                        required={license?.isActive}
                    />
                </li>
                <li>
                    <label htmlFor="expireDate">Ngày hết hạn:</label>
                    <input 
                        type="date" 
                        name="expireDate" 
                        value={license?.expireDate || ''}
                        onChange={(e) => {
                            setMsg('');
                            if (!license?.issueDate){
                                setLicense({...license, issueDate: e.target.value, expireDate: e.target.value});
                            }
                            else if (e.target.value >= license.issueDate){
                                setLicense({...license, expireDate: e.target.value});
                            } else {
                                setMsg('Ngày hết hạn không được trước ngày cấp phát');
                            }
                        }}
                        required={license?.isActive}
                    />
                </li>
                <li>
                    <label htmlFor="isActive">Trạng thái:</label>
                    <select 
                        name="isActive" 
                        onChange={(e) => {
                            setLicense({...license, isActive: e.target.value});
                        }}
                        required
                    >
                        <option value={false}>Không đạt tiêu chuẩn</option>
                        <option value={true}>Đạt tiêu chuẩn</option>
                    </select>
                </li>
            </ul>

            <p
                className={msg ? 'msg' : 'offscreen'}
            >
                {msg}
            </p>

            {mode ? (
                <button type='submit'>Đăng ký</button>
            ) : (
                <button type='submit'>Cập nhật</button>
            )}

        </form>
    )
}

export default FacilityForm