// src/components/charts/HourlyChart.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Helper to format the hour from a timestamp
const formatHour = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', { hour: 'numeric' });
};

function HourlyChart({ data }) {
  const units = useSelector((state) => state.settings.units);
  const tempUnit = units === 'metric' ? '°C' : '°F';

  // We want the next 8 data points (8 * 3 hours = 24 hours)
  const chartData = data.slice(0, 8).map(item => ({
    time: formatHour(item.dt),
    temp: Math.round(item.main.temp), // <-- Data structure changed
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          right: 20,
          left: -10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis unit={tempUnit} />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="temp" 
          stroke="#8884d8" 
          strokeWidth={2} 
          activeDot={{ r: 8 }} 
          name="Temp" 
          unit={tempUnit}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default HourlyChart;