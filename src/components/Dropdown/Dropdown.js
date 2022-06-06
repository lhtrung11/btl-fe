import { React, useContext } from 'react';
import './Dropdown.css';
import AppContext from '../AppContext/AppContext';
import { Navigate  } from 'react-router';
import '../Buttons/Buttons.css';

export default function Dropdown({ items, buttons }) {
    const { state, dispatch } = useContext(AppContext);
    const handleLogout = () => {
        localStorage.clear();
        dispatch({
            type: 'LOG_OUT',
            payload: { account: null, role: null, area: null },
        });
    };
    return (
        <ul className="dropdown-content">
            {items.map((item, index) => (
                <li key={index} className="info">
                    {item}
                </li>
            ))}
            {buttons.map((button, index) => (
                <li
                    key={index}
                    onClick={handleLogout}
                    className="btn btn-primary"
                >
                    {button}
                </li>
            ))}
        </ul>
    );
}
