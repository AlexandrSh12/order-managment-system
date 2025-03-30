import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = ({ currentPage }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const [searchType, setSearchType] = useState(queryParams.get('searchType') || 'customerPhone');
    const [searchValue, setSearchValue] = useState(queryParams.get('searchValue') || '');

    const searchOptions = {
        orders: [
            { value: 'customerPhone', label: 'Телефон клиента' },
            { value: 'orderId', label: 'ID заказа' },
            { value: 'orderNumber', label: 'Номер заказа' }
        ],
        customers: [
            { value: 'customerPhone', label: 'Телефон клиента' },
            { value: 'customerName', label: 'Имя клиента' }
        ],
        // Можно добавить опции для других страниц
    };

    const getPlaceholder = () => {
        const option = searchOptions[currentPage]?.find(opt => opt.value === searchType);
        return option ? option.label : 'Поиск...';
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (currentPage === 'orders') {
            navigate(`/orders?search[searchType]=${searchType}&search[searchValue]=${searchValue}`);
        } else {
            navigate(`/${currentPage}?searchType=${searchType}&searchValue=${searchValue}`);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearch}>
                <div className="search-bar">
                    <div className="search-type">
                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                        >
                            {searchOptions[currentPage]?.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="search-input">
                        <input
                            type="text"
                            placeholder={getPlaceholder()}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="search-button">
                        Найти
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;