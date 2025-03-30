// src/pages/OrdersPage.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import OrdersTable from '../components/OrdersTable';
import './OrdersPage.css';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Извлечение параметров поиска из URL
    const searchType = queryParams.get('search[searchType]');
    const searchValue = queryParams.get('search[searchValue]');

    useEffect(() => {
        // Здесь будет запрос к API когда будет готов бэкенд
        // Пока используем эмуляцию

        if (searchValue) {
            setLoading(true);

            // Эмуляция запроса к API
            setTimeout(() => {
                // Тестовые данные
                const mockOrders = searchValue ? [
                    {
                        id: 1,
                        orderNumber: '12345',
                        status: 'Доставлен',
                        createdAt: '2025-03-15',
                        customerPhone: '+7 (999) 123-45-67',
                        compensation: 'Нет',
                        deliveryType: 'Курьер',
                        delay: 'Нет',
                        deliveryAddress: 'ул. Примерная, 10'
                    },
                    {
                        id: 2,
                        orderNumber: '12346',
                        status: 'В пути',
                        createdAt: '2025-03-20',
                        customerPhone: '+7 (999) 123-45-67',
                        compensation: 'Нет',
                        deliveryType: 'Самовывоз',
                        delay: '1 час',
                        deliveryAddress: 'ул. Тестовая, 5'
                    }
                ] : [];

                setOrders(mockOrders);
                setLoading(false);
            }, 500);
        } else {
            setOrders([]);
        }
    }, [searchType, searchValue]);

    return (
        <div className="app-container">
            <Sidebar />

            <div className="main-content">
                <div className="page-header">
                    <h1>Заказы</h1>
                </div>

                <SearchBar currentPage="orders" />

                <FilterBar rowCount={orders.length} />

                <OrdersTable orders={orders} loading={loading} />
            </div>
        </div>
    );
};

export default OrdersPage;

