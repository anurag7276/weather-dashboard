// src/components/WeatherCard.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// Import the NEW hook
import { useGetCurrentWeatherQuery } from '../store/weatherApi'; 
import { removeFavorite } from '../store/favoritesSlice';
import WeatherCardSkeleton from './WeatherCardSkeleton';

const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

function WeatherCard({ city }) {
  const dispatch = useDispatch();
  const units = useSelector((state) => state.settings.units);

  // --- THIS IS THE MAIN CHANGE ---
  // Use the new hook instead of useGetOneCallWeatherQuery
  const { data, isFetching, isError } = useGetCurrentWeatherQuery({
    lat: city.lat,
    lon: city.lon,
    units: units,
  });

  const handleRemove = (e) => {
    e.preventDefault(); // Prevent navigation when clicking remove
    dispatch(removeFavorite(city.name));
  };

  if (isFetching) {
    return <WeatherCardSkeleton />;
  }

  // This error handler is what you are seeing! It's working.
  if (isError) {
    return (
      <div className="weather-card error">
        Error loading {city.name}.
        <button onClick={(e) => handleRemove(e)} className="remove-btn">Remove</button>
      </div>
    );
  }

  // The data structure is now DIFFERENT.
  // The data is the root object, not 'data.current'.
  const current = data; 
  const weather = current.weather[0];
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const speedUnit = units === 'metric' ? 'm/s' : 'mph';

  return (
    <Link to={`/city/${city.lat}/${city.lon}`} className="weather-card">
      <div className="card-header">
        <h3>{city.name}</h3>
        <button onClick={handleRemove} className="remove-btn">
          &times;
        </button>
      </div>
      
      <div className="card-body">
        <img src={getWeatherIconUrl(weather.icon)} alt={weather.description} />
        {/* 'current.temp' is now 'current.main.temp' */}
        <div className="temp">{Math.round(current.main.temp)}{tempUnit}</div> 
      </div>
      
      <div className="card-footer">
        <div>
          <strong>Wind</strong>
          {/* 'current.wind_speed' is now 'current.wind.speed' */}
          <p>{current.wind.speed} {speedUnit}</p> 
        </div>
        <div>
          <strong>Humidity</strong>
          {/* 'current.humidity' is now 'current.main.humidity' */}
          <p>{current.main.humidity}%</p> 
        </div>
      </div>
    </Link>
  );
}

export default WeatherCard;