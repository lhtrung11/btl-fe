import React from 'react'
import { useState, useCallback, useEffect, useContext } from 'react';
import { Navigate } from 'react-router';
import axios from '../../../api/axios';
import AppContext from '../../../components/AppContext/AppContext';
import "./AreaList.css";

export default function AreaList() {
  const { state, dispatch } = useContext(AppContext);
  const [areas, setAreas] = useState([]);

  const getAreaList = useCallback(async () => {
    try {
        const token = localStorage.getItem('token');
        const option = {
            method: 'get',
            url: '/admin/areas',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios(option);
        const areas = response.data.data.areas;

        if (areas) {
            setAreas(areas);
        }
    } catch (error) {}
  }, [setAreas]);

  useEffect(() => {
    getAreaList();
  }, [getAreaList]);

  const handleDelete = async (e) => {
        const token = localStorage.getItem('token');
        const areaID = e.target.value;
        const option = {
            method: 'delete',
            url: `admin/areas/${areaID}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        await axios(option);
        setAreas((prevAreas) => {
            return prevAreas.filter((area) => area._id !== areaID);
        });
    };

  return (
    state?.role === 'admin' ? (
      <>
        <h1 className="areaListHeader">Khu vực quản lý</h1>
        <table className="areaTable">
            <tr>
                <th>STT</th>
                <th>Tên khu vực</th>
                <th>Trạng thái</th>
                <th>Xóa</th>
            </tr>
            {areas.map((area, index) => {
              return (
                  <tr>
                      <td>{index + 1}</td>
                      <td>{area.name}</td>
                      <td>{area.license?.isManaged ? 'Có' : 'Không'}</td>
                      <td>
                          <button
                              type="submit"
                              onClick={(e) => handleDelete(e)}
                              value={area._id}
                          >
                              Xóa
                          </button>
                      </td>
                  </tr>
              );})
            }
        </table>
      </>
    ) : (
      <Navigate to='/' replace></Navigate>
    )
  )
}


