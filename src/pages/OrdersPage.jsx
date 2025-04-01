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
                // Мок данных
                const mockOrders = [
                    {
                        id: 1,
                        orderNumber: '55501',
                        status: 'Доставлен',
                        createdDate: '25.03.25',
                        createdTime: '13:08',
                        customerPhone: '0123456789',
                        compensation: '—',
                        deliveryType: 'Прямая',
                        delay: '7 мин.',
                        deliveryAddress: 'Москва, улица Зеленая, 15, 3'
                    },
                    {
                        id: 2,
                        orderNumber: '7405',
                        status: 'Доставлен',
                        createdDate: '22.03.25',
                        createdTime: '13:54',
                        customerPhone: '0123456789',
                        compensation: '—',
                        deliveryType: 'Прямая',
                        delay: '1 мин.',
                        deliveryAddress: 'Москва, улица Заречная, 77, 85'
                    },
                    {
                        id: 3,
                        orderNumber: '480',
                        status: 'Доставлен',
                        createdDate: '29.07.24',
                        createdTime: '18:47',
                        customerPhone: '0123456789',
                        compensation: '—',
                        deliveryType: 'Прямая',
                        delay: '15 мин.',
                        deliveryAddress: 'Ижевск, улица Центральная, 56, 57'
                    }
                ];

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