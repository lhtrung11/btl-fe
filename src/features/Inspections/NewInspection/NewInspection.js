import { React, useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from '../../../api/axios';
import AppContext from '../../../components/AppContext/AppContext';
import './NewInspection.css';

// const INSPECTION_URL = '/inspections';

const InspectionForm = () => {
    const { facilityId } = useParams();
    const area = { _id: null, name: null };

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
        } catch (error) {}
    }, []);

    useEffect(() => {
        getFacility();
    }, [getFacility]);

    return (
        <>
            <button className="btn">
                <i className="fa fa-caret-square-o-left"></i>
                Quay lại
            </button>

            <form className="inspectionForm">
                <h1 className="inspectionHeader">Lịch thanh tra</h1>
                <label htmlFor="facility">Tên cơ sở:</label>
                <input
                    type="text"
                    name="facility"
                    value={facilityId}
                    disabled
                />
                <label htmlFor="area">Khu vực:</label>
                <input type="text" name="area" value={area.name} disabled />
                <label htmlFor="from" className="labelDate">
                    Ngày bắt đầu:
                </label>
                <input
                    type="date"
                    id="from"
                    name="from"
                    className="inputDate"
                />
                <label htmlFor="to" className="labelDate">
                    Ngày kết thúc:
                </label>
                <input type="date" id="to" name="to" className="inputDate" />
                <button type="submit">Tạo lịch</button>
            </form>
        </>
    );
};

export default InspectionForm;
