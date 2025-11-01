// src/components/WeatherCardSkeleton.jsx
import React from 'react';

function WeatherCardSkeleton() {
  return (
    <div className="weather-card loading">
      <div className="card-header">
        <div className="skeleton skeleton-text" style={{ width: '60%', height: '1.5em' }}></div>
      </div>
      <div className="card-body">
        <div className="skeleton skeleton-img"></div>
        <div className="skeleton skeleton-text" style={{ width: '30%', height: '3rem' }}></div>
      </div>
      <div className="card-footer">
        <div style={{ width: '40%' }}>
          <div className="skeleton skeleton-text" style={{ width: '100%' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '80%', marginTop: '0.5rem' }}></div>
        </div>
        <div style={{ width: '40%' }}>
          <div className="skeleton skeleton-text" style={{ width: '100%' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '80%', marginTop: '0.5rem' }}></div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCardSkeleton;