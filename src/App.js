import React, { useState, useRef } from 'react';
import './App.css';
import countriesData from './countries.json';  

function App() {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [leftWidth, setLeftWidth] = useState(50); 
  const resizerRef = useRef(null);
  const isDragging = useRef(false);

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);

    const results = countriesData.filter((country) =>
      country.country.toLowerCase().includes(value.toLowerCase()) ||
      country.capital.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(results);
  };

  const handleCountryClick = (country) => {
    if (!selectedCountries.some((selected) => selected.country === country.country)) {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseMove = (event) => {
    if (isDragging.current) {
      const newLeftWidth = (event.clientX / window.innerWidth) * 100;
      if (newLeftWidth >= 20 && newLeftWidth <= 80) {  
        setLeftWidth(newLeftWidth);
      }
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      className="app-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="left-panel" style={{ width: `${leftWidth}%` }}>
        <div className="app">
          <h1>Country Search</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by country or capital..."
              value={query}
              onChange={handleSearch}
              className="search-input"
            />
            {filteredData.length > 0 && (
              <ul className="search-results">
                {filteredData.map((country, index) => (
                  <li key={index} onClick={() => handleCountryClick(country)}>
                    <div className="country-info">
                      <h4>{country.country}</h4>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div
        className="resizer"
        ref={resizerRef}
        onMouseDown={handleMouseDown}
      >
        <div className="resizer-tooltip">Drag to adjust size</div>
      </div>

      <div className="right-panel" style={{ width: `${100 - leftWidth}%` }}>
        {selectedCountries.length > 0 ? (
          <div>
            <h2>Selected Countries</h2>
            {selectedCountries.map((country, index) => (
              <div key={index} className="country-details">
                <h3><center>{country.country}</center></h3>
                <p><strong>Capital:</strong> {country.capital}</p>
                <p><strong>Population:</strong> {country.population ? country.population.toLocaleString() : 'N/A'}</p>
                <p><strong>Official Language:</strong> {Array.isArray(country.official_language) ? country.official_language.join(', ') : country.official_language}</p>
                <p><strong>Currency:</strong> {country.currency}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Please select a country to see the details.</p>
        )}
      </div>
    </div>
  );
}

export default App;
