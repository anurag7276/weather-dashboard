// src/components/SettingsToggle.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleUnits } from '../store/settingsSlice';

function SettingsToggle() {
  const units = useSelector((state) => state.settings.units);
  const dispatch = useDispatch();

  const isCelsius = units === 'metric';

  return (
    <button onClick={() => dispatch(toggleUnits())}>
      Switch to {isCelsius ? '°F' : '°C'}
    </button>
  );
}
export default SettingsToggle;