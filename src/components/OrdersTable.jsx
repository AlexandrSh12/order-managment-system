import React from 'react';
import './OrdersTable.css';

const OrdersTable = ({ orders, loading }) => {
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

    return (
        <div className="orders-table">
            <div className="table-header">
                <div className="table-cell">Заказ</div>
                <div className="table-cell">Статус</div>
                <div className="table-cell">Оформлен</div>
                <div className="table-cell">Телефон клиента</div>
                <div className="table-cell">Компенсация</div>
                <div className="table-cell">Тип доставки</div>
                <div className="table-cell">Опоздание</div>
                <div className="table-cell">Адрес доставки</div>
            </div>

            <div className="table-body">
                {orders.map(order => (
                    <div className="table-row" key={order.id}>
                        <div className="table-cell">{order.orderNumber}</div>
                        <div className="table-cell">{order.status}</div>
                        <div className="table-cell">{order.createdAt}</div>
                        <div className="table-cell">{order.customerPhone}</div>
                        <div className="table-cell">{order.compensation}</div>
                        <div className="table-cell">{order.deliveryType}</div>
                        <div className="table-cell">{order.delay}</div>
                        <div className="table-cell">{order.deliveryAddress}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersTable;