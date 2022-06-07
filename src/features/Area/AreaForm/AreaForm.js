import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import './AreaForm.css';

const AreaForm = () => {
    const [area, setArea] = useState({});
    const [managerNumber, setManagerNumber] = useState(1);
    const [manager, setManager] = useState({});

    const handleSubmit = (e) => {};

    return (
        <>
            <Link to="/areas" className="backBtn">
                <i className="fa fa-caret-square-o-left" />
                <text>Danh sách khu vực</text>
            </Link>

            <form
                className="area-form"
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                <h1>Đăng ký khu vực</h1>
                <label htmlFor="name">Tên khu vực:</label>
                <input
                    placeholder="Nhập tên khu vực"
                    type="text"
                    name="name"
                    value={area?.name || ''}
                    onChange={(e) => {
                        setArea({ ...area, name: e.target.value });
                    }}
                    required
                />

                <label htmlFor="managerNumber">
                    Số lượng chuyên viên quản lý:
                </label>
                <input
                    placeholder="Nhập số lượng chuyên viên"
                    type="number"
                    name="managerNumber"
                    value={managerNumber || 1}
                    onChange={(e) => {
                        if (e.target.value < 1) {
                            setManagerNumber(1);
                        } else {
                            setManagerNumber(e.target.value);
                        }
                    }}
                    required
                />

                <label htmlFor="managers">Tên chuyên viên:</label>
                <input
                    placeholder="Nhập tên chuyên viên"
                    type="text"
                    name="managers"
                    value={area?.manager || ''}
                    onChange={(e) => {
                        setArea({ ...area, manager: e.target.value });
                    }}
                    required
                />

                <label htmlFor="managers">Tên chuyên viên:</label>
                <input
                    placeholder="Nhập tên chuyên viên"
                    type="text"
                    name="managers"
                    value={area?.manager || ''}
                    onChange={(e) => {
                        setArea({ ...area, manager: e.target.value });
                    }}
                    required
                />

                <button type="submit">Đăng ký</button>
            </form>
        </>
    );
};

export default AreaForm;
