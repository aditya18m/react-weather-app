import './App.css';
import React, {useState} from 'react';
//the useState hook allows functional components to manage state
import axios from 'axios'
//axios is used for making HTTP requests, it simpliefies the process of making asynchronous requests in JavaScript

function App(){//declare functional component named App 
//functional components are JavaScript functions that return JSX(JavaScript XML), which represents the UI of the component
    
    const [city, setCity] = useState('');//city is initialised to empty string, setCity is used to update it
    
    const [weather, setWeather] = useState(null);//weather is declared, setWeather is used to update it

    const apiKey = 'YOUR_API_KEY';

    const fetchWeather = async () => {//fetchWeather is responsible for fetching weather data from WeatherAPI.com
        try{
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key={apiKey}&q=${city}&aqi=no`); //sends an HTTP 'get' request to the API using axios. 
            //Awaits the response and stores it in the 'response' variable. apiKey and city are interpolated into the URL to request specific data.
            
            setWeather(response.data);//updates weather state variable with the retrieved data (contained in response.data)
        }
        catch(error){
            console.error('Error fetching weather data: ', error); //logs message to console if there is any errors 
            setWeather(null);
        }
    };
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        fetchWeather();
      }
    };

    //this block of JSX represents the UI of the 'App' component. 
    //It consists of a input field to enter city name, button to fetch weather data and a section to display weather info 
    return (
        <div className="weather-container">
        <h1 className="heading">Weather App</h1>
        <div className="input-container">
        <input 
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter city name"
        />
        </div>
        <button className="search-button" onClick={fetchWeather}>Get Weather Info</button>
        
        {weather && ( //if weather = true then the below block is displayed (weather && checks this condition)
            <div className="weather-data-container">
            <div className="weather-location">{weather.location.name}, {weather.location.country}</div>
            <div className="weather-temperature">Temperature (in Celsius): {weather.current.temp_c}°C</div>
            <div className="weather-temperature">Temperature (in Fahrenheit): {weather.current.temp_f}°F</div>
            <div className="weather-condition">Condition: {weather.current.condition.text}</div>
            </div>

        )}
        </div>
    );
}

export default App;
