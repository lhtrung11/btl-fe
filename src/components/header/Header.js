import { useContext } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './Header.css';
import AppContext from '../AppContext/AppContext';
import { Link } from 'react-router-dom';

function Header() {
    const { state, dispatch } = useContext(AppContext);
    
    return (
        <header>
            <Link to="/" className="logo">
                Quản lý <span>Thực phẩm</span>
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Trang chủ</Link>
                    </li>
                    <li>
                        {state.account ? (
                            <div className="dropdown">
                                Tài khoản
                                <Dropdown
                                    items={Object.keys(state)
                                        .filter (
                                            (key) => key === 'account' || key === 'area' || key === 'role'
                                        )
                                        .map (
                                            (key) =>
                                                `${key.toUpperCase()}: ${
                                                    state[key]
                                                }`
                                        )
                                    }
                                    buttons={['Đăng xuất']}
                                />
                            </div>
                        ) : (
                            <Link to="/auth/login">Đăng nhập</Link>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
