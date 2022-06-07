import { React, useState } from 'react';
import axios from '../../../api/axios';
import AppContext from '../../../components/AppContext/AppContext';
import './InspectionForm.css';

const INSPECTION_URL = '/inspections';

const InspectionForm = () => {
    const [mode, setMode] = useState(true);

    return (
        <>
            <button className="btn">
                <i className="fa fa-caret-square-o-left"></i>
                Quay lại
            </button>

            <form className="inspectionForm">
                <h1 className="inspectionHeader">Lịch thanh tra</h1>
                <label htmlFor="facility">Tên cơ sở:</label>
                <input type="text" name="facility" />
                <label htmlFor="area">Khu vực:</label>
                <input type="text" name="area" />
                <label htmlFor="from">Ngày bắt đầu:</label>
                <br />
                <input type="date" id="from" name="from" />
                <br />
                <label htmlFor="to">Ngày kết thúc:</label>
                <br />
                <input type="date" id="to" name="to" />
                <button type="submit">Tạo lịch</button>
            </form>
        </>
    );
};

export default InspectionForm;
