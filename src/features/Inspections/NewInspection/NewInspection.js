import { React, useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from '../../../api/axios';
import AppContext from '../../../components/AppContext/AppContext';
import './NewInspection.css';

// const INSPECTION_URL = '/inspections';

const InspectionForm = () => {
    const { facilityId } = useParams();
    const [info, setInfo] = useState({});
    const [form, setForm] = useState({});

    const getFacility = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const option = {
                method: 'get',
                url: `/facilities/${facilityId}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios(option);
            console.log(response);
            setInfo({
                facilityName: response.data.data.facility.name,
                areaName: response.data.data.facility.area.name,
                areaId: response.data.data.facility.area._id,
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getFacility();
    }, [getFacility]);

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            const option = {
                url: `/inspections/`,
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: { ...form, area: info.areaId, facility: facilityId },
            };
            const response = await axios(option);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <button className="btn">
                <i className="fa fa-caret-square-o-left"></i>
                Quay lại
            </button>

            <form className="inspectionForm" onSubmit={() => handleSubmit()}>
                <h1 className="inspectionHeader">Lịch thanh tra</h1>
                <label htmlFor="facility">Tên cơ sở:</label>
                <input
                    type="text"
                    name="facility"
                    value={info.facilityName}
                    disabled
                />
                <label htmlFor="area">Khu vực:</label>
                <input type="text" name="area" value={info.areaName} disabled />
                <label htmlFor="from" className="labelDate">
                    Ngày bắt đầu:
                </label>
                <input
                    type="date"
                    id="from"
                    name="from"
                    className="inputDate"
                    onChange={(e) => handleChange(e)}
                    value={form.from || ''}
                />
                <label htmlFor="to" className="labelDate">
                    Ngày kết thúc:
                </label>
                <input
                    type="date"
                    id="to"
                    name="to"
                    className="inputDate"
                    onChange={(e) => handleChange(e)}
                    value={form.to || ''}
                />
                <button type="submit">Tạo lịch</button>
            </form>
        </>
    );
};

export default InspectionForm;
