import { React, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import axios from '../../../api/axios';
import './InspectionList.css';

export default function InspectionList() {
    const [inspections, setInspections] = useState([]);
    const navigate = useNavigate();
    const getAllInspections = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const option = {
                method: 'get',
                url: '/inspections',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios(option);
            setInspections(response.data?.data?.inspections);
        } catch (error) {}
    }, []);

    useEffect(() => {
        getAllInspections();
    }, [getAllInspections]);

    const handleButton = (e) => {
        return navigate(`/inspections/${e.target.value}`);
    };

    return (
        <>
            <content>BẢNG DỮ LIỆU THANH TRA</content>
            <table>
                <tr>
                    <th>STT</th>
                    <th>Tên cơ sở cần thanh tra</th>
                    <th>Tên khu vực</th>
                    <th>Thời hạn kiểm tra</th>
                    <th>Trạng thái</th>
                    <th>Kết quả</th>
                    <th>Thao tác</th>
                </tr>
                {inspections.map((ins, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{ins.facility.name}</td>
                            <td>{ins.area.name}</td>
                            <td>{ins.to}</td>
                            <td>
                                {ins.status.isComplete
                                    ? 'Đã hoàn thành'
                                    : 'Chưa hoàn thành'}
                            </td>
                            <td>
                                {ins.status.isComplete
                                    ? ins.status.isQualified
                                        ? 'Đạt'
                                        : 'Không Đạt'
                                    : 'Chưa có'}
                            </td>
                            <td>
                                <button
                                    type="submit"
                                    onClick={(e) => handleButton(e)}
                                    value={ins._id}
                                >
                                    Chi tiết
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </table>
        </>
    );
}
