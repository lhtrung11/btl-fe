import { React, useState, useContext } from 'react';
import axios from '../../api/axios';
import { Navigate, useParams, Link } from 'react-router-dom';
import AppContext from '../../components/AppContext/AppContext';
import './Account.css';

const Account = () => {
    const { state, dispatch } = useContext(AppContext);
    const [ user, setUser ] = useState('');
    const [ area, setArea ] = useState('');
    const [ isActive, setActive ] = useState(false);

    const [ msg, setMsg ] = useState('');
    const { userId } = useParams();
    
    const token = localStorage.getItem('token');

    axios.get(`/admin/accounts/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => {
        setUser(response?.data?.data?.user?.username);
    })
    .catch((error) => {
        console.log(error);
        setMsg("Không tìm thấy tài khoản phù hợp, vui lòng quay lại");
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const option = {
                method: 'put',
                url: `/admin/accounts/${userId}`,
                data: { area, isActive},
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios(option);
            setMsg('Cập nhật thành công!');
            
        } catch (error) {
            console.log(error);
            setMsg('Cập nhật không thành công');
        }
    }
    
    return (
        <>
            <Link to='/users' className="backBtn">
                <i className="fa fa-caret-square-o-left" /> 
                <text>Danh sách cơ sở</text>
            </Link>

            <form className="accountForm" onSubmit={handleSubmit}>
                <label htmlFor="username">Tên chuyên viên:</label>
                <br />
                <input type="text" name="username" 
                    value={user || ''}   
                    disabled 
                />
                <br />
                <label htmlFor="area">Khu vực:</label>
                <select
                    name="area"
                    value={area || 'null'}
                    onChange={(e) => {
                        setArea(e.target.value);
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
                <br />
                <label htmlFor="isActive">Trạng thái:</label>
                <select name="isActive"
                    value={isActive || false}
                    onChange={(e) => {
                        setActive(e.target.value)
                    }}
                >
                    <option value={true}>Đang hoạt động</option>
                    <option value={false}>Không còn hoạt động</option>
                </select>
                <br />
                <p className={msg ? 'msg' : 'offscreen'}>
                    {msg}
                </p>
                <button type="submit">Cập nhật</button>
            </form>
        </>
    );
};

export default Account;
