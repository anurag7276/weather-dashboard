// src/components/Search.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchCitiesQuery } from '../store/weatherApi';
import { addFavorite } from '../store/favoritesSlice';

function Search() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  // Use 'skip' to prevent firing the API query when the input is empty
  const { data, isFetching } = useSearchCitiesQuery(query, {
    skip: query.length < 3,
  });

  const handleAddFavorite = (city) => {
    dispatch(addFavorite({
      name: city.name,
      lat: city.coord.lat,
      lon: city.coord.lon,
    }));
    setQuery(''); // Clear search
  };

 return (
    <div className="search-container">
    
      {/* --- THIS SVG GOES HERE --- */}
      <svg 
        className="search-icon" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path 
          fillRule="evenodd" 
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
          clipRule="evenodd" 
        />
      </svg>
      {/* --- END OF ICON --- */}

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a city..."
      />
      
      {isFetching && <div>{/* Loading... */}</div>}
      
      {data && query.length >= 3 && (
        <ul className="search-results">
          {data.list.map((city) => (
            <li key={city.id} onClick={() => handleAddFavorite(city)}>
              {city.name}, {city.sys.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default Search;