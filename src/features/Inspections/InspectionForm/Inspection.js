import React from 'react'
import './Inspection.css'

export const Inspection = () => {
    return (
        <>
            <button class="btn"><i class="fa fa-home"></i> Home</button>
            <h1 class="form-name">FORM KIỂM TRA</h1>
            <form>
                <label for="name">Tên cơ sở:</label><br/>
                <input type="text" id="name" name="name"></input><br/>
                <label for="begin">Ngày bắt đầu:</label>
                <input type="date" id="begin" name="begin" max="2022-12-31"></input>
                <label for="end">Ngày kết thúc:</label>
                <input type="date" id="end" name="end" max="2022-12-31"></input><br/>
                <label for="conclu">Kết luận của thanh tra</label><br/>
                <input type="text" id="conclu" name="conclu"></input><br/>
                <label for="vio">Quyết định xử lí vi phạm:</label>
                <input type="checkbox" id="vio" name="vio"></input><br/>
                <label for="asses">Mẫu giám định:</label>
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
