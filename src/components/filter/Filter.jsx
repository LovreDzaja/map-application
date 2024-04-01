import React, { useState } from 'react';

import './Filter.scss';

import MenuIcon from '../../arrange.png';

const Filter = ({ onFilterChange, onToggleSidebar }) => {
  const [filters, setFilters] = useState({
    parks: false,
    historicalSites: false,
    natureParks: false,
    parking: false,
    restaurants: false,
    cafes: false,
    supermarkets: false,
    hospitals: false,
  });

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setFilters({
      ...filters,
      [name]: checked,
    });

    onFilterChange({
      ...filters,
      [name]: checked,
    });
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <>
    <div className='menuIcon' onClick={toggleFilterVisibility}>
        <img src={MenuIcon} alt='MenuIcon'/>
    </div>
    {isFilterVisible && (
    <div className="filter-container">
        <label>
          <input
            type="checkbox"
            name="parks"
            checked={filters.parks}
            onChange={handleCheckboxChange}
          />
          Parks
        </label>
        <label>
          <input
            type="checkbox"
            name="historicalSites"
            checked={filters.historicalSites}
            onChange={handleCheckboxChange}
          />
          Historical Sites
        </label>
        <label>
          <input
            type="checkbox"
            name="natureParks"
            checked={filters.natureParks}
            onChange={handleCheckboxChange}
          />
          Nature Parks
        </label>
        <label>
          <input
            type="checkbox"
            name="parking"
            checked={filters.parking}
            onChange={handleCheckboxChange}
          />
          Parking
        </label>
        <label>
          <input
            type="checkbox"
            name="restaurants"
            checked={filters.restaurants}
            onChange={handleCheckboxChange}
          />
          Restaurants
        </label>
        <label>
          <input
            type="checkbox"
            name="cafes"
            checked={filters.cafes}
            onChange={handleCheckboxChange}
          />
          Cafes
        </label>
        <label>
          <input
            type="checkbox"
            name="supermarkets"
            checked={filters.supermarkets}
            onChange={handleCheckboxChange}
          />
          Supermarkets
        </label>
        <label>
          <input
            type="checkbox"
            name="hospitals"
            checked={filters.hospitals}
            onChange={handleCheckboxChange}
          />
          Hospitals
        </label>
      </div>
    )}
    </>
  );
};

export default Filter;
