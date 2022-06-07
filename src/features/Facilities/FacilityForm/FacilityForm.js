import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../api/axios';
import './FacilityForm.css';

const FACILITY_URL = '/facilities/';

const FacilityForm = ({value}) => {
    //KIỂM TRA NẾU LÀ CHUYÊN VIÊN -> CHỈ ĐƯỢC ĐĂNG KÝ/CẬP NHẬT CƠ SỞ TRONG KHU VỰC CỦA MÌNH
    const [mode, setMode] = useState(value); //true -> đăng ký, false -> chỉnh sửa
    const [msg, setMsg] = useState('');
    const [facility, setFacility] = useState({});
    // const [address, setAddress] = useState("");
    const [license, setLicense] = useState({
        // business: null,
        // issueDate: null,
        // expireDate: null,
        // isActive: false,
    });

    const createFacility = async (e) => {
        e.preventDefault();
        try {
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
            setMsg('Đăng ký cơ sở mới thành công!');
        } catch (error) {
            console.log(error);
        }
    };
    const updateFacility = async (e) => {
        e.preventDefault();
        try {
        } catch (err) {
            setMsg('Chỉnh sửa không thành công');
            console.log(err);
        }
    };

    return (
        <>
            <Link to='/facilities' className="backBtn">
                <i className="fa fa-caret-square-o-left" /> 
                <text>Danh sách cơ sở</text>
            </Link>

            <form
                className="facilityForm"
                onSubmit={
                    mode
                        ? (e) => {
                            createFacility(e);
                        }
                        : (e) => {
                            updateFacility(e);
                        }
                }
            >
                <h1>{mode ? 'Đăng ký cơ sở mới' : 'Chỉnh sửa thông tin cơ sở'}</h1>

                <label htmlFor="name">Tên cơ sở:</label>
                <input
                    placeholder="Nhập tên cơ sở"
                    type="text"
                    name="name"
                    value={facility?.name || ''}
                    onChange={(e) => {
                        setFacility({ ...facility, name: e.target.value });
                    }}
                    required
                />

                <label htmlFor="area">Khu vực:</label>
                <select
                    name="area"
                    value={facility?.area}
                    onChange={(e) => {
                        setFacility({ ...facility, area: e.target.value });
                    }}
                >
                    <option value={'null'}>Chưa được đăng ký khu vực</option>
                    <option value={'629c67cc77b1cff0da27ee72'}>
                        Quận Cầu Giấy
                    </option>
                    <option value={'629c67ea77b1cff0da27ee74'}>
                        Quận Thanh Xuân
                    </option>
                    <option value={'629c681077b1cff0da27ee7a'}>
                        Quận Hoàn Kiếm
                    </option>
                    <option value={'629c67f677b1cff0da27ee76'}>Quận Tây Hồ</option>
                    <option value={'629c682177b1cff0da27ee7e'}>
                        Quận Long Biên
                    </option>
                    <option value={'629c687277b1cff0da27ee82'}>
                        Quận Bắc Từ Liêm
                    </option>
                    <option value={'-'}>
                        Quận Hai Bà Trưng
                    </option>
                    <option value={'629cda29c6bb221d0fb7b8dd'}>
                        Quận Hoàng Mai
                    </option>
                    <option value={'629cda2fc6bb221d0fb7b8df'}>Quận Hà Đông</option>
                    <option value={'629c687777b1cff0da27ee84'}>
                        Quận Nam Từ Liêm
                    </option>
                    <option value={'629cda36c6bb221d0fb7b8e1'}>Quận Đống Đa</option>
                    <option value={'629cda69c6bb221d0fb7b8e9'}>Huyện Ba Vì</option>
                    <option value={'629cda58c6bb221d0fb7b8e5'}>
                        Huyện Gia Lâm
                    </option>
                    <option value={'629cda63c6bb221d0fb7b8e7'}>
                        Huyện Hoài Đức
                    </option>
                    <option value={'629cda78c6bb221d0fb7b8eb'}>
                        Huyện Mê Linh
                    </option>
                    <option value={'629cda82c6bb221d0fb7b8ed'}>
                        Huyện Sóc Sơn
                    </option>
                    <option value={'629cda9bc6bb221d0fb7b8f1'}>
                        Huyện Thanh Trì
                    </option>
                    <option value={'629cda8bc6bb221d0fb7b8ef'}>
                        Huyện Thạch Thất
                    </option>
                    <option value={'629cda4ec6bb221d0fb7b8e3'}>
                        Huyện Đan Phượng
                    </option>
                    <option value={'629c682d77b1cff0da27ee80'}>
                        Huyện Đông Anh
                    </option>
                </select>

                {/* <label>Địa chỉ:</label> */}
                <label htmlFor="address">Địa chỉ</label>
                <input
                    placeholder="Nhập địa chỉ chi tiết"
                    type="text"
                    name="address"
                    value={facility?.address || ''}
                    onChange={(e) => {
                        setFacility({ ...facility, address: e.target.value });
                    }}
                    required
                />
                {/* <ul>
                    <li>
                        <label htmlFor="ward">Xã phường:</label>
                        <input
                            placeholder="Nhập xã/phường"
                            type="text"
                            name="ward"
                            value={address?.ward || ''}
                            onChange={(e) => {
                                setAddress({ ...address, ward: e.target.value });
                            }}
                            required
                        />
                    </li>
                    <li>
                        <label htmlFor="street">Phố:</label>
                        <input
                            placeholder="Nhập tên phố"
                            type="text"
                            name="street"
                            value={address?.street || ''}
                            onChange={(e) => {
                                setAddress({ ...address, street: e.target.value });
                            }}
                            required
                        />
                    </li>
                    <li>
                        <label htmlFor="detail">
                            Chi tiết khác (Không bắt buộc):
                        </label>
                        <input
                            placeholder="Nhập các thông tin khác"
                            type="text"
                            name="detail"
                            value={address?.detail || ''}
                            onChange={(e) => {
                                setAddress({ ...address, detail: e.target.value });
                            }}
                        />
                    </li>
                </ul> */}

                <label htmlFor="contact">Số điện thoại:</label>
                <input
                    placeholder="Nhập số điện thoại"
                    type="text"
                    name="contact"
                    value={facility?.contact || ''}
                    onChange={(e) => {
                        setFacility({ ...facility, contact: e.target.value });
                    }}
                    required
                />

                <label htmlFor="business">Loại hình kinh doanh:</label>
                <input
                    placeholder="Nhập loại hình kinh doanh"
                    type="text"
                    name="business"
                    value={facility?.business || ''}
                    onChange={(e) => {
                        setMsg('');
                        setFacility({ ...facility, business: e.target.value });
                        setLicense({ ...license, business: e.target.value });
                    }}
                    required
                />

                <label>Giấy phép hoạt động: </label>
                <ul>
                    <li>
                        <label htmlFor="business">Loại hình kinh doanh</label>
                        <input
                            placeholder="Nhập loại hình kinh doanh"
                            type="text"
                            name="business"
                            value={license?.business || ''}
                            onChange={(e) => {
                                setMsg('');
                                setFacility({
                                    ...facility,
                                    business: e.target.value,
                                });
                                setLicense({
                                    ...license,
                                    business: e.target.value,
                                });
                                setFacility({...facility, license: license});
                            }}
                        />
                    </li>
                    <li>
                        <label htmlFor="issueDate">Ngày cấp:</label>
                        <br />
                        <input
                            type="date"
                            name="issueDate"
                            value={license?.issueDate || ''}
                            onChange={(e) => {
                                setMsg('');
                                if (!license?.expireDate) {
                                    setLicense({
                                        ...license,
                                        issueDate: e.target.value,
                                        expireDate: e.target.value,
                                    });
                                    setFacility({...facility, license: license});
                                } else if (e.target.value <= license.expireDate) {
                                    setLicense({
                                        ...license,
                                        issueDate: e.target.value,
                                    });
                                    setFacility({...facility, license: license});
                                } else {
                                    setMsg(
                                        'Ngày cấp phát không được sau ngày hết hạn'
                                    );
                                }
                            }}
                            required={license?.isActive}
                        />
                    </li>
                    <li>
                        <label htmlFor="expireDate">Ngày hết hạn:</label>
                        <br />
                        <input
                            type="date"
                            name="expireDate"
                            value={license?.expireDate || ''}
                            onChange={(e) => {
                                setMsg('');
                                if (!license?.issueDate) {
                                    setLicense({
                                        ...license,
                                        issueDate: e.target.value,
                                        expireDate: e.target.value,
                                    });
                                    setFacility({...facility, license: license});
                                } else if (e.target.value >= license.issueDate) {
                                    setLicense({
                                        ...license,
                                        expireDate: e.target.value,
                                    });
                                    setFacility({...facility, license: license});
                                } else {
                                    setMsg(
                                        'Ngày hết hạn không được trước ngày cấp phát'
                                    );
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
                                setLicense({
                                    ...license,
                                    isActive: e.target.value,
                                });
                                setFacility({...facility, license: license});
                            }}
                            required
                        >
                            <option value={false}>Không đạt tiêu chuẩn</option>
                            <option value={true}>Đạt tiêu chuẩn</option>
                        </select>
                    </li>
                </ul>
                
                <p className={msg ? 'msg' : 'offscreen'}>{msg}</p>

                {mode ? (
                    <button type="submit">Đăng ký</button>
                ) : (
                    <button type="submit">Cập nhật</button>
                )}
            </form>
        </>
    );
};

export default FacilityForm;
