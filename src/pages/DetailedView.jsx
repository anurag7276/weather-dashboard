import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetCurrentWeatherQuery, useGetForecastQuery } from '../store/weatherApi';

import HourlyChart from '../components/charts/HourlyChart';
import DailyChart from '../components/charts/DailyChart';

const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

function DetailedView() {
  const { lat, lon } = useParams();
  const units = useSelector((state) => state.settings.units);


  const { 
    data: currentData, 
    isFetching: isFetchingCurrent, 
    isError: isErrorCurrent 
  } = useGetCurrentWeatherQuery({ lat, lon, units });

  const { 
    data: forecastData, 
    isFetching: isFetchingForecast, 
    isError: isErrorForecast 
  } = useGetForecastQuery({ lat, lon, units });

  // Handle loading and error states for BOTH calls
  if (isFetchingCurrent || isFetchingForecast) {
    return <div className="loading-fullscreen">Loading detailed view...</div>;
  }
  if (isErrorCurrent || isErrorForecast) {
    return <div className="error-fullscreen">Error loading data. <Link to="/">Go Back</Link></div>;
  }


  const current = currentData;
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const speedUnit = units === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="detailed-view-container">
      <Link to="/" className="back-link">&larr; Back to Dashboard</Link>
      
      <div className="current-details-header">
        <div className="header-left">
          {/* Use city name from forecast data */}
          <h2>Current Weather in {forecastData.city.name}</h2> 
          <div className="current-temp">
            <img src={getWeatherIconUrl(current.weather[0].icon)} alt={current.weather[0].description} />
            <p>{Math.round(current.main.temp)}<span>{tempUnit}</span></p>
          </div>
          <h3>
            Feels like {Math.round(current.main.feels_like)}{tempUnit}. {current.weather[0].description}.
          </h3>
        </div>
        
        <div className="stats-grid">
        
          <div><strong>Pressure:</strong> {current.main.pressure} hPa</div>
          <div><strong>Humidity:</strong> {current.main.humidity}%</div>
          <div><strong>Wind:</strong> {current.wind.speed} {speedUnit}</div>
          <div><strong>Visibility:</strong> {current.visibility / 1000} km</div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h3>Hourly Temperature (Next 24h)</h3>
          
          <HourlyChart data={forecastData.list} /> 
        </div>
        <div className="chart-container">
          <h3>5-Day Forecast (Min/Max Temp)</h3>
      
          <DailyChart data={forecastData.list} /> 
        </div>
      </div>
    </div>
  );
}

export default DetailedView;