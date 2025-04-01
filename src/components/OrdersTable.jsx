import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrdersTable.css';

const OrdersTable = ({ orders, loading }) => {
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const navigate = useNavigate();

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-message">
                    <h3>Что показать?</h3>
                    <p>Введите поисковый запрос, и мы покажем всё, что найдём</p>
                </div>
            </div>
        );
    }

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getSortIcon = (field) => {
        if (sortField !== field) return '↕';
        return sortDirection === 'asc' ? '↑' : '↓';
    };

    const handleRowClick = (orderId) => {
        navigate(`/orders/${orderId}`);
    };

    // Apply sorting to orders
    const sortedOrders = [...orders].sort((a, b) => {
        if (!sortField) return 0;

        const valueA = a[sortField] || '';
        const valueB = b[sortField] || '';

        if (sortDirection === 'asc') {
            return valueA.toString().localeCompare(valueB.toString());
        } else {
            return valueB.toString().localeCompare(valueA.toString());
        }
    });

    // Field mappings for sorting
    const fieldMappings = {
        'orderNumber': 'Заказ',
        'status': 'Статус',
        'createdAt': 'Оформлен',
        'customerPhone': 'Телефон клиента',
        'compensation': 'Компенсация',
        'deliveryType': 'Тип доставки',
        'delay': 'Опоздание',
        'deliveryAddress': 'Адрес доставки'
    };

    const renderSortableHeader = (field, label) => (
        <div
            className="table-cell sortable-header"
            onClick={() => handleSort(field)}
        >
            {label} <span className="sort-icon">{getSortIcon(field)}</span>
        </div>
    );

    return (
        <div className="orders-table">
            <div className="table-header">
                {renderSortableHeader('orderNumber', 'Заказ')}
                {renderSortableHeader('status', 'Статус')}
                {renderSortableHeader('createdAt', 'Оформлен')}
                {renderSortableHeader('customerPhone', 'Телефон клиента')}
                {renderSortableHeader('compensation', 'Компенсация')}
                {renderSortableHeader('deliveryType', 'Тип доставки')}
                {renderSortableHeader('delay', 'Опоздание')}
                {renderSortableHeader('deliveryAddress', 'Адрес доставки')}
            </div>

            <div className="table-body">
                {sortedOrders.map(order => (
                    <div
                        className="table-row"
                        key={order.id}
                        onClick={() => handleRowClick(order.id)}
                    >
                        <div className="table-cell">{order.orderNumber}</div>
                        <div className="table-cell status-cell">
                            <span className={`status-badge ${order.status.toLowerCase()}`}>
                                {order.status}
                            </span>
                        </div>
                        <div className="table-cell">
                            {order.createdDate} {order.createdTime}
                        </div>
                        <div className="table-cell">{order.customerPhone}</div>
                        <div className="table-cell">{order.compensation || '—'}</div>
                        <div className="table-cell">{order.deliveryType}</div>
                        <div className="table-cell">{order.delay || '—'}</div>
                        <div className="table-cell">{order.deliveryAddress}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersTable;