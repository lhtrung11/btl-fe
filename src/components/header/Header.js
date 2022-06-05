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
                    {state.account && (
                        <li>
                            <Link to="/management">Quản lý</Link>
                        </li>
                    )}
                    <li>
                        {state.account ? (
                            <Link to={'/'} className="dropdown">
                                Tài khoản
                                <Dropdown
                                    items={Object.keys(state).map(
                                        (key) =>
                                            `${key.toUpperCase()}: ${
                                                state[key]
                                            }`
                                    )}
                                    buttons={['Đăng xuất']}
                                />
                            </Link>
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
