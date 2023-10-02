import { useState, useEffect } from 'react';
import axios from 'axios';

//create a function component called WeatherApp
function WeatherApp() {
  //state variables
  const [weather, setWeather] = useState('');
  const [location, setLocation] = useState('Dallas, TX');
  const [query, setQuery] = useState('');

  const API_KEY = import.meta.env.VITE_API_KEY;

  //access to API URL
  const URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`

//to fetch data from the URL using axios
//useEffect hook runs the function inside of it when the query state variable changes --> this will fetch the data from the API and update the weather and location state variables

useEffect(() => {
    axios.get(URL + query)
      .then(response => {
        setWeather(response.data.current);
        setLocation(response.data.location);
      })
      //alert of an error
      .catch(error => {
        console.error(error);
      })
    },
    [query]);
  
  //if there is no weather or location data, return null
  if (!weather || !location) return null;

  return (
    <div className="app">
     <div className='main__container'>
      <div className="search">
        <p>Current Weather in United States</p>
        <input placeholder="Search for a city, state" type="search" value={query} onChange={event => setQuery(event.target.value)} />
      </div>
      <div className='top'>
        <div>
          <h2>{location.name}</h2>
        </div>
        <div>
          {/* shift + opt + 8 for degree */}
          <h1>{weather.temp_f}°</h1>
        </div>
        <div>
          <h3>{weather.condition.text}</h3>
          <img className='weather_icon' src={weather.condition.icon} alt="Weather Icon" />
        </div>
      <div className='bottom'>
        <div>
          <p>Humidity</p>
          <p>{weather.humidity}%</p>
        </div>
        <div>
          <p>Precipitation</p>
          <p>{weather.precip_in}"</p>
        </div>
        <div>
          <p>Wind Speed</p>
          <p>{weather.wind_mph} mph</p>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default WeatherApp;
