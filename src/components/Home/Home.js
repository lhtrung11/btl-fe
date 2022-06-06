import { React, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext/AppContext';
import Login from '../../features/Auth/login/Login';
import './Home.css';

const Home = () => {
    const { state, dispatch } = useContext(AppContext);

    return (
        state.account ? (
            <div className="homeAction">
                <ul className="actionList">
                    {state?.role === 'admin' && (
                        <li className="dropdown">
                            <div className="dropbtn">chuyên viên</div>
                            <div className="content">
                                <Link to='/users'>Danh sách chuyên viên</Link>
                                <Link to='/#'>Đăng ký tài khoản cho chuyên viên mới</Link>
                            </div>
                        </li>
                    )}

                    <li className="dropdown">
                        <div className="dropbtn">cơ sở kinh doanh</div>
                        <div className="content">
                            <Link to="/facilities">Danh sách các cơ sở kinh doanh</Link>
                            <Link to='/facilities/register'>Đăng ký cơ sở kinh doanh mới</Link>
                        </div>
                    </li>

                    {state.role === 'admin' && (
                        <li className="dropdown">
                            <div className="dropbtn">khu vực quản lý</div>
                            <div className="content">
                                <Link to="#">Danh sách các khu vực</Link>
                                <Link to='#'>Đăng ký khu vực mới</Link>
                            </div>
                        </li>
                    )}

                    <li className="dropdown">
                        <div className="dropbtn">thanh tra</div>
                        <div className="content">
                            <Link to="#">Xem lịch thanh tra</Link>
                            <Link to="#">Lên lịch thanh tra</Link>
                        </div>
                    </li>
                </ul>
            </div>
        ) : (
            <div className="middle">
              <section className="intro">
                <h1>Trang web quản lý cơ sở thực phẩm hàng đầu</h1>
                <p>Tiện lợi, nhanh chóng, linh hoạt</p>
              </section>
              <section>
                <Login />
              </section>
            </div>
        )   
    )
}

export default Home