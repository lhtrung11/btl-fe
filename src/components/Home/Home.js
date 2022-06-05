import { React, useContext, useEffect } from 'react';
import AppContext from '../AppContext/AppContext';
import Login from '../../features/Auth/login/Login';
import './Home.css';

const Home = () => {
    const { state, dispatch } = useContext(AppContext)

    return (
        // state.account ? (
        //     <div className="homeAction">
        //         <ul className="actionList">
        //             <li className="dropdown">
        //                 <div className="dropbtn">chuyên viên</div>
        //                 <div className="dropdown-content">
        //                     <a href="#">Danh sách chuyên viên</a>
        //                     <div>Chỉnh sửa tài khoản chuyên viên</div>
        //                 </div>
        //             </li>

        //             <li className="dropdown">
        //                 <div className="dropbtn">cơ sở kinh doanh</div>
        //                 <div className="dropdown-content">
        //                     <a href="#">Danh sách các cơ sở kinh doanh</a>
        //                     <div>Chỉnh sửa cơ sở kinh doanh</div>
        //                 </div>
        //             </li>

        //             <li className="dropdown">
        //                 <div className="dropbtn">khu vực</div>
        //                 <div className="dropdown-content">
        //                     <a href="#">Danh sách các khu vực</a>
        //                     <div>Chỉnh sửa khu vực</div>
        //                 </div>
        //             </li>

        //             <li className="dropdown">
        //                 <div className="dropbtn">thanh tra</div>
        //                 <div className="dropdown-content">
        //                     <a href="#">Lên lịch thanh tra</a>
        //                     <a href="#">Xem lịch thanh tra</a>
        //                 </div>
        //             </li>
        //         </ul>
        //     </div>
        // ) : (
        //     <div className="middle">
        //       <section className="intro">
        //         <h1>Trang web quản lý cơ sở thực phẩm hàng đầu</h1>
        //         <p>Tiện lợi, nhanh chóng, linh hoạt</p>
        //       </section>
        //       <section>
        //         <Login />
        //       </section>
        //     </div>
        // )   

        <div className="homeAction">
                <ul className="actionList">
                    <li className="dropdown">
                        <div className="dropbtn">chuyên viên</div>
                        <div className="dropdown-content">
                            <a href="#">Danh sách chuyên viên</a>
                            <div>Chỉnh sửa tài khoản chuyên viên</div>
                        </div>
                    </li>

                    <li className="dropdown">
                        <div className="dropbtn">cơ sở kinh doanh</div>
                        <div className="dropdown-content">
                            <a href="#">Danh sách các cơ sở kinh doanh</a>
                            <div>Chỉnh sửa cơ sở kinh doanh</div>
                        </div>
                    </li>

                    <li className="dropdown">
                        <div className="dropbtn">khu vực</div>
                        <div className="dropdown-content">
                            <a href="#">Danh sách các khu vực</a>
                            <div>Chỉnh sửa khu vực</div>
                        </div>
                    </li>

                    <li className="dropdown">
                        <div className="dropbtn">thanh tra</div>
                        <div className="dropdown-content">
                            <a href="#">Lên lịch thanh tra</a>
                            <a href="#">Xem lịch thanh tra</a>
                        </div>
                    </li>
                </ul>
            </div>
    )
}

export default Home