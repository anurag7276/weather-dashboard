
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
  

  endpoints: (builder) => ({
    
   
    getCurrentWeather: builder.query({
      query: ({ lat, lon, units = 'metric' }) =>
        `weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`,
      keepUnusedDataFor: 60, 
    }),

  
    getForecast: builder.query({
      query: ({ lat, lon, units = 'metric' }) =>
        `forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`,
      keepUnusedDataFor: 60,
    }),

    
    searchCities: builder.query({
      query: (query) => `find?q=${query}&type=like&sort=population&cnt=5&appid=${API_KEY}`,
    }),
  }),
});


export const { 
  useGetCurrentWeatherQuery, 
  useGetForecastQuery,     
  useSearchCitiesQuery 
} = weatherApi;