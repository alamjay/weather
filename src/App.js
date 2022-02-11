import axios from 'axios';
import { useState } from 'react';
import './App.css';
import DisplayForecast from './components/DisplayForecast/DisplayForecast';
import Search from './components/Search/Search';

function App() {

  const [weather, setWeather] = useState();
  const [display, setDisplay] = useState(false);


  // Fetch weather from the location id given by search
  const getWeather = (location) => {
    axios.get(`https://www.metaweather.com/api/location/${location.woeid}`)
        .then((response) => {

            // if result is ok 
            if(response.status === 200) {
              setWeather(response.data.consolidated_weather);
              setDisplay(true);
            }
        })
  }
  

  return (
    <div className="App">
        <h1 className='mt-5'>Weather App</h1>
        <Search onGetWeather={getWeather}  />
        <DisplayForecast display={display} weather={weather} />
    </div>
  );
}

export default App;
