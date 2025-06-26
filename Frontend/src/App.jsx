import React, { useState } from 'react';
import './index.css';

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [store, setStore] = useState(null);

  const findNearest = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/stores/nearest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        }),
      });

      const data = await res.json();
      setStore(data);
    } catch (error) {
      console.error('Error fetching store:', error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        {/* Header */}
        <div className="header">
          <div className="icon-container">
            <span className="icon">📍</span>
          </div>
          <h1 className="title">
            LG Gas Store Locator
          </h1>
          <p className="subtitle">Find your nearest gas station</p>
        </div>

        {/* Form */}
        <div className="form">
          <div className="form-group">
            <label className="label">
              Latitude
            </label>
            <input
              type="text"
              placeholder="Enter latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="input"
            />
          </div>

          <div className="form-group">
            <label className="label">
              Longitude
            </label>
            <input
              type="text"
              placeholder="Enter longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="input"
            />
          </div>

          <button
            onClick={findNearest}
            className="button"
          >
            <span className="button-icon">🔍</span>
            Find Nearest Store
          </button>
        </div>

        {/* Results */}
        {store && (
          <div className="results">
            <div className="results-header">
              <div className="results-icon-container">
                <span className="results-icon">✓</span>
              </div>
              <h2 className="results-title">
                Store Found
              </h2>
            </div>

            <div className="results-content">
              <div className="results-item">
                <span className="results-label">Name: </span>
                <span className="results-value">{store.name}</span>
              </div>
              <div className="results-item">
                <span className="results-label">Latitude: </span>
                <span className="results-value">{store.latitude}</span>
              </div>
              <div className="results-item">
                <span className="results-label">Longitude: </span>
                <span className="results-value">{store.longitude}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;