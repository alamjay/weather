import { useEffect } from "react";
import WeatherCard from "./WeatherCard";

const DisplayForecast = (props) => { 

  useEffect(() => {
    
  }, [props.weather])
  

    return (
        <div className="weather-forecast p-5" style={{display: props.display ? 'block' : 'none'}}>

        <div className="container" >
          <div className="row">

            {props.display &&

              // Loop through 5 day forecast
              props.weather.map((forecast, index) => {
                return <WeatherCard key={index} index={index} forecast={forecast} />
              })
            } 
          </div>
        </div>
      </div>
    );

}

export default DisplayForecast;