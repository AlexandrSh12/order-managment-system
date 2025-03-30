import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OrdersPage from './pages/OrdersPage';
import CustomersPage from './pages/CustomersPage';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/orders" replace />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/packages" element={<div>Страница посылок (в разработке)</div>} />
                <Route path="/darkstores" element={<div>Страница даркcторов (в разработке)</div>} />
            </Routes>
        </Router>
    );
}

export default App;