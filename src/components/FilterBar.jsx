import React from 'react';
import './FilterBar.css';

const FilterBar = ({ rowCount }) => {
    return (
        <div className="filter-bar">
            <div className="filter-section">
                <span>Фильтры:</span>
                <button className="add-filter-btn">
                    <span>+</span> Добавить
                </button>
            </div>

            <div className="row-count">
                {rowCount} строк
            </div>

            <div className="table-settings">
                <button className="settings-btn">Настроить таблицу</button>
            </div>
        </div>
    );
};

export default FilterBar;