import { React, useCallback, useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../../../api/axios';
import './FacilityForm.css';
import AppContext from '../../../components/AppContext/AppContext';

const FACILITY_URL = '/facilities/';

const FacilityForm = ({ value }) => {
    //KIỂM TRA NẾU LÀ CHUYÊN VIÊN -> CHỈ ĐƯỢC ĐĂNG KÝ/CẬP NHẬT CƠ SỞ TRONG KHU VỰC CỦA MÌNH
    const { state, dispatch } = useContext(AppContext);
    const [mode, setMode] = useState(value);

    const [permission, setPermission] = useState(true);
    const [success, setSuccess] = useState(true);

    const [msg, setMsg] = useState('');
    const [facility, setFacility] = useState({});
    const [license, setLicense] = useState({});
    const { facilityId } = useParams();
    const token = localStorage.getItem('token');

    const getFacility = useCallback(() => {
        if (mode === false) {
            axios
                .get(`/facilities/${facilityId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    if (
                        state.role === 'user' &&
                        state.area != response.data.data.facility.area
                    ) {
                        setMsg('Bạn không được cấp phép, vui lòng quay lại');
                    } else {
                        setFacility({
                            ...facility,
                            name: response.data.data.facility.name,
                            area: response.data.data.facility.area.name,
                            address: response.data.data.facility.address,
                            business: response.data.data.facility.business,
                            contact: response.data.data.facility.contact,
                        });
                        setLicense({
                            ...license,
                            business: response.data.data.facility.business,
                        });
                        console.log(facility);
                    }
                })
                .catch((error) => {
                    setMsg('Không tìm thấy cơ sở phù hợp, vui lòng quay lại');
                    setSuccess(false);
                });
        }
    }, []);

    useEffect(() => getFacility(), [getFacility]);

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
            setMsg('Đăng ký không thành công');
            setSuccess(false);
        }
    };
    const updateFacility = async (e) => {
        e.preventDefault();
        try {
            console.log(facility, license);
            const token = localStorage.getItem('token');
            const option = {
                method: 'put',
                url: `/facilities/${facilityId}`,
                data: { ...facility, license: license },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios(option);
            setMsg('Chỉnh sửa thông tin cơ sở thành công!');
        } catch (err) {
            setMsg('Chỉnh sửa thông tin cơ sở không thành công');
        }
    };

    return (
        <>
            <Link to="/facilities" className="backBtn">
                <i className="fa fa-caret-square-o-left" />
                <text>Danh sách cơ sở</text>
            </Link>

            {success && (
                <Link
                    to={`/inspections/register/${facilityId}`}
                    className="backBtn"
                >
                    <i className="fa fa-caret-square-o-left" />
                    <text>Thanh tra cơ sở</text>
                </Link>
            )}

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
                <h1>
                    {mode ? 'Đăng ký cơ sở mới' : 'Chỉnh sửa thông tin cơ sở'}
                </h1>

                <label htmlFor="name">Tên cơ sở:</label>
                <input
                    placeholder="Nhập tên cơ sở"
                    type="text"
                    name="name"
                    value={facility?.name || ''}
                    onChange={(e) => {
                        if (mode === true) {
                            setFacility({ ...facility, name: e.target.value });
                        }
                    }}
                    disabled={mode ? false : true}
                    required
                />

                <label htmlFor="area">Khu vực:</label>
                <select
                    name="area"
                    value={facility.area}
                    onChange={(e) => {
                        if (mode) {
                            setFacility({ ...facility, area: e.target.value });
                        }
                    }}
                    disabled={!mode || state.role != 'user'}
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
                    <option value={'629c67f677b1cff0da27ee76'}>
                        Quận Tây Hồ
                    </option>
                    <option value={'629c682177b1cff0da27ee7e'}>
                        Quận Long Biên
                    </option>
                    <option value={'629c687277b1cff0da27ee82'}>
                        Quận Bắc Từ Liêm
                    </option>
                    <option value={'-'}>Quận Hai Bà Trưng</option>
                    <option value={'629cda29c6bb221d0fb7b8dd'}>
                        Quận Hoàng Mai
                    </option>
                    <option value={'629cda2fc6bb221d0fb7b8df'}>
                        Quận Hà Đông
                    </option>
                    <option value={'629c687777b1cff0da27ee84'}>
                        Quận Nam Từ Liêm
                    </option>
                    <option value={'629cda36c6bb221d0fb7b8e1'}>
                        Quận Đống Đa
                    </option>
                    <option value={'629cda69c6bb221d0fb7b8e9'}>
                        Huyện Ba Vì
                    </option>
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
                <select
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
                    }}
                >
                    <option value={'Dịch vụ ăn uống'}>Dịch vụ ăn uống</option>
                    <option value={'Sản xuất thực phẩm'}>
                        Sản xuất thực phẩm
                    </option>
                </select>

                <label>Giấy phép hoạt động: </label>
                <ul>
                    <li>
                        <label htmlFor="business">Loại hình kinh doanh</label>
                        <select
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
                            }}
                        >
                            <option value={'Dịch vụ ăn uống'}>
                                Dịch vụ ăn uống
                            </option>
                            <option value={'Sản xuất thực phẩm'}>
                                Sản xuất thực phẩm
                            </option>
                        </select>
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
                                } else if (
                                    e.target.value <= license.expireDate
                                ) {
                                    setLicense({
                                        ...license,
                                        issueDate: e.target.value,
                                    });
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
                                } else if (
                                    e.target.value >= license.issueDate
                                ) {
                                    setLicense({
                                        ...license,
                                        expireDate: e.target.value,
                                    });
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
