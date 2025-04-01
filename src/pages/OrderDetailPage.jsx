import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './OrderDetailPage.css';

const OrderDetailPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('information');

    useEffect(() => {
        // Эмуляция запроса к API
        setLoading(true);
        setTimeout(() => {
            // Мок-данные заказа
            const mockOrder = {
                id: orderId,
                orderNumber: '55501',
                status: 'Доставлен',
                createdDate: '25.03.2025',
                createdTime: '13:08',
                deliveryAddress: 'Москва, улица Зеленая, 15, 3',

                // Данные клиента
                customer: {
                    name: 'Иванов Иван',
                    phone: '0123456789',
                    email: 'ivanov@example.com',
                    deliveryCount: 15,
                    registrationDate: '10.01.2023',
                },

                // Данные курьера
                courier: {
                    name: 'Петров Петр',
                    phone: '9876543210',
                },

                // Данные доставки
                delivery: {
                    expectedTime: '30 минут',
                    startTime: '13:15',
                    startDate: '25.03.2025',
                    endTime: '13:45',
                    endDate: '25.03.2025',
                    delay: '7 мин.',
                    type: 'Прямая'
                },

                // Состав заказа
                items: [
                    { id: 1, name: 'Пицца "Маргарита"', quantity: 1, price: 499 },
                    { id: 2, name: 'Кока-кола 0.5л', quantity: 2, price: 119 },
                    { id: 3, name: 'Салат "Цезарь"', quantity: 1, price: 349 }
                ],

                totalPrice: 1086,
                paymentMethod: 'Оплата картой онлайн'
            };

            setOrder(mockOrder);
            setLoading(false);
        }, 800);
    }, [orderId]);

    if (loading) {
        return (
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <div className="loading-container">
                        <div className="loading">Загрузка данных заказа...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <div className="error-container">
                        <div className="error-message">
                            <h2>Заказ не найден</h2>
                            <p>Заказ с ID {orderId} не существует.</p>
                            <Link to="/orders" className="back-link">
                                Вернуться к списку заказов
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <Sidebar />

            <div className="main-content">
                <div className="order-detail-header">
                    <Link to="/orders" className="back-link">
                        ← Вернуться к списку заказов
                    </Link>
                    <h1>Заказ #{order.orderNumber}</h1>
                    <div className="order-status">
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                            {order.status}
                        </span>
                    </div>
                </div>

                <div className="order-detail-content">
                    {/* Колонка с информацией о клиенте */}
                    <div className="customer-info-column">
                        <div className="info-card">
                            <h3>Клиент</h3>
                            <div className="info-row">
                                <span className="info-label">Имя:</span>
                                <span className="info-value">{order.customer.name}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Телефон:</span>
                                <span className="info-value">{order.customer.phone}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Email:</span>
                                <span className="info-value">{order.customer.email}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Заказов:</span>
                                <span className="info-value">{order.customer.deliveryCount}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Регистрация:</span>
                                <span className="info-value">{order.customer.registrationDate}</span>
                            </div>
                        </div>

                        <div className="info-card">
                            <h3>Краткая информация</h3>
                            <div className="info-row">
                                <span className="info-label">Сумма:</span>
                                <span className="info-value">{order.totalPrice} ₽</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Оплата:</span>
                                <span className="info-value">{order.paymentMethod}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Тип доставки:</span>
                                <span className="info-value">{order.delivery.type}</span>
                            </div>
                        </div>
                    </div>

                    {/* Основная информация о заказе */}
                    <div className="order-card-column">
                        <div className="order-card">
                            <div className="order-card-header">
                                <div className="tabs">
                                    <button
                                        className={`tab ${activeTab === 'information' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('information')}
                                    >
                                        Информация
                                    </button>
                                    <button
                                        className={`tab ${activeTab === 'composition' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('composition')}
                                    >
                                        Состав
                                    </button>
                                </div>
                            </div>

                            <div className="order-card-content">
                                {activeTab === 'information' && (
                                    <div className="information-tab">
                                        <div className="info-section">
                                            <h4>Данные</h4>
                                            <div className="section-content">
                                                <div className="info-item">
                                                    <span className="info-label">Номер заказа:</span>
                                                    <span className="info-value">{order.orderNumber}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Order ID:</span>
                                                    <span className="info-value">{order.id}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Адрес заказа:</span>
                                                    <span className="info-value">{order.deliveryAddress}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Дата/Время заказа:</span>
                                                    <span className="info-value">{order.createdDate} {order.createdTime}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="info-section">
                                            <h4>Исполнитель</h4>
                                            <div className="section-content">
                                                <div className="info-item">
                                                    <span className="info-label">Курьер:</span>
                                                    <span className="info-value">{order.courier.name}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Телефон курьера:</span>
                                                    <span className="info-value">{order.courier.phone}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="info-section">
                                            <h4>Доставка</h4>
                                            <div className="section-content">
                                                <div className="info-item">
                                                    <span className="info-label">Ожидаемое время доставки:</span>
                                                    <span className="info-value">{order.delivery.expectedTime}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Начало доставки:</span>
                                                    <span className="info-value">{order.delivery.startTime}, {order.delivery.startDate}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Окончание доставки:</span>
                                                    <span className="info-value">{order.delivery.endTime}, {order.delivery.endDate}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Опоздание:</span>
                                                    <span className="info-value">{order.delivery.delay}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'composition' && (
                                    <div className="composition-tab">
                                        <h4>Состав заказа</h4>
                                        <div className="order-items">
                                            <table className="items-table">
                                                <thead>
                                                <tr>
                                                    <th>Наименование</th>
                                                    <th>Количество</th>
                                                    <th>Цена</th>
                                                    <th>Сумма</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {order.items.map(item => (
                                                    <tr key={item.id}>
                                                        <td>{item.name}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.price} ₽</td>
                                                        <td>{item.price * item.quantity} ₽</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                                <tfoot>
                                                <tr>
                                                    <td colSpan="3">Итого:</td>
                                                    <td>{order.totalPrice} ₽</td>
                                                </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;