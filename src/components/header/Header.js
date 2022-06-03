import React from "react";

function Header() {
    return (
        <header>
            <a href="/" class="logo">
                Quản lý <span>Thực phẩm</span>
            </a>
            <nav>
                <ul>
                    <li>
                        <a href="/">Trang chủ</a>
                    </li>
                    <li>
                        <a href="/register">Đăng ký</a>
                    </li>
                    <li>
                        <a href="/login">Đăng nhập</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
