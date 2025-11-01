import React from 'react';
import { useSelector } from 'react-redux';
import WeatherCard from '../components/WeatherCard';

function Dashboard() {
  
  const favoriteCities = useSelector((state) => state.favorites.cities);

  return (
    <div className="dashboard-container">
      
      {favoriteCities.length === 0 ? (
        <div className="empty-dashboard-message">
          <h2>Welcome to your Weather Dashboard!</h2>
          <p>Use the search bar above to find a city and add it as a favorite.</p>
        </div>
      ) : (
        <div className="dashboard-grid">
          
          {favoriteCities.map((city) => (
            <WeatherCard key={city.name} city={city} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;