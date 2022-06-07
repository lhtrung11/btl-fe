import { React, useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import './Inspection.css';
import axios from '../../../api/axios';

export default function Inspection() {
    const { inspectionId } = useParams();
    const [form, setForm] = useState({});
    const getInspection = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const option = {
                url: `/inspections/${inspectionId}`,
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios(option);
            const form = response.data.data.inspection;
            console.log(form);
            setForm(form);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getInspection();
    }, [getInspection]);

    return (
        <>
            <button className="btn">
                <i className="fa fa-home"></i> Home
            </button>
            <h1 className="form-name">FORM KIỂM TRA</h1>
            <form>
                <label htmlFor="name">Tên cơ sở:</label>
                <br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    disabled
                    value={form.facility._id || ''}
                >
                    {form.facility.name || ''}
                </input>
                <br />
                <label htmlFor="begin">Ngày bắt đầu:</label>
                <input
                    type="date"
                    id="begin"
                    name="begin"
                    max="2022-12-31"
                    // value={form.from}
                ></input>
                <label htmlFor="end">Ngày kết thúc:</label>
                <input
                    type="date"
                    id="end"
                    name="end"
                    max="2022-12-31"
                    // value={form.to}
                ></input>
                <br />
                <label htmlFor="conclusion">Kết luận của thanh tra</label>
                <br />
                <input type="text" id="conclusion" name="conclusion"></input>
                <br />
                <label htmlFor="vio">Quyết định xử lí vi phạm:</label>
                <input type="checkbox" id="vio" name="vio"></input>
                <br />
                <label htmlFor="asses">Mẫu giám định:</label>
                <table>
                    <tr>
                        <th>Mã giám định</th>
                        <th>Chuyên viên</th>
                        <th>Trạng thái</th>
                        <th>Ngày nhận kết quả</th>
                        <th>Kết quả</th>
                    </tr>
                    <tr>
                        <td>01234</td>
                        <td>uet</td>
                        <td>Đã gửi</td>
                        <td>04/06/2022</td>
                        <td>Chưa có</td>
                    </tr>
                </table>
                <button type="submit">Cập nhật</button>
            </form>
        </>
    );
}
