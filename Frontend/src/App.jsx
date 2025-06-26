import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [store, setStore] = useState(null);

  const findNearest = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/stores/nearest', {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      });
      setStore(res.data);
    } catch (error) {
      console.error('Error fetching store:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6 text-blue-700">
          LG Gas Store Locator
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Enter Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={findNearest}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Find Nearest Store
          </button>
        </div>

        {store && (
          <div className="mt-6 bg-blue-50 p-4 rounded border border-blue-200">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              Nearest Store Found:
            </h2>
            <p><strong>Name:</strong> {store.name}</p>
            <p><strong>Latitude:</strong> {store.latitude}</p>
            <p><strong>Longitude:</strong> {store.longitude}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
