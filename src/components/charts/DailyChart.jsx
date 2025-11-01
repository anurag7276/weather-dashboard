// src/components/charts/DailyChart.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

// Helper to get day of the week
const formatDay = (dateString) => {
  const date = new Date(dateString);
  // Get day, but factor in timezone to prevent off-by-one days
  return date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
};

// --- NEW DATA PROCESSING FUNCTION ---
// This processes the 3-hour list into a 5-day min/max list
const processDailyData = (list) => {
  const dailyData = {};

  list.forEach(item => {
    const date = item.dt_txt.split(' ')[0]; // Get 'YYYY-MM-DD'
    if (!dailyData[date]) {
      // First time seeing this day
      dailyData[date] = {
        name: formatDay(date),
        Min: item.main.temp_min,
        Max: item.main.temp_max,
      };
    } else {
      // Update min and max for the day
      dailyData[date].Min = Math.min(dailyData[date].Min, item.main.temp_min);
      dailyData[date].Max = Math.max(dailyData[date].Max, item.main.temp_max);
    }
  });

  // Convert object back to array and round values
  return Object.values(dailyData).map(day => ({
    ...day,
    Min: Math.round(day.Min),
    Max: Math.round(day.Max),
  }));
};
// --- END OF FUNCTION ---

function DailyChart({ data }) {
  const units = useSelector((state) => state.settings.units);
  const tempUnit = units === 'metric' ? '°C' : '°F';

  // Process the data before passing it to the chart
  const chartData = processDailyData(data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 20,
          left: -10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis unit={tempUnit} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Min" fill="#8884d8" name={`Min Temp (${tempUnit})`} />
        <Bar dataKey="Max" fill="#82ca9d" name={`Max Temp (${tempUnit})`} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DailyChart;