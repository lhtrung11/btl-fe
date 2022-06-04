import React from 'react';
import './Dropdown.css';
import '../Buttons/Buttons.css';

export default function Dropdown({ items, buttons }) {
    console.log(items, buttons);
    return (
        <ul className="dropdown-content">
            {items.map((item, index) => (
                <li key={index} className="info">
                    {item}
                </li>
            ))}
            {buttons.map((button, index) => (
                <li key={index} className="btn btn-primary">
                    {button}
                </li>
            ))}
        </ul>
    );
}
