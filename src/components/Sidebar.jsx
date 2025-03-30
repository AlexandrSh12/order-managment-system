import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="sidebar">
            <div className="logo">
                <Link to="/">
                    <img src="/logo.svg" alt="Logo" />
                </Link>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li className={location.pathname === '/customers' ? 'active' : ''}>
                        <Link to="/customers">Клиенты</Link>
                    </li>
                    <li className={location.pathname === '/orders' ? 'active' : ''}>
                        <Link to="/orders">Заказы</Link>
                    </li>
                    <li className={location.pathname === '/packages' ? 'active' : ''}>
                        <Link to="/packages">Посылки</Link>
                    </li>
                    <li className={location.pathname === '/darkstores' ? 'active' : ''}>
                        <Link to="/darkstores">Даркcторы</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;