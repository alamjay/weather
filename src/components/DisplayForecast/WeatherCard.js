import { useEffect, useState } from "react";

const WeatherCard = (props) => {    

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [day, setDay] = useState(null);

    useEffect(() => {

        printDay();

    }, [props.forecast])
   
    // output Today, Tomorrow and the rest of the days
    const printDay = () => {
        if (props.index === 0) {
            setDay('Today');
        } else if (props.index === 1) {
            setDay('Tomorrow');
        } else {
        const getDate = new Date(props.forecast.applicable_date);
        setDay(days[getDate.getDay()]);

        }
    }

    return (
        <div className="col-md-2 p-3">
                <div className="forecast-day p-3">
                {/* <i className="bi bi-cloud-fill" style={{fontSize: 50}}></i> */}
                <img className="weather-icon" src={`./icons/${props.forecast.weather_state_abbr}.svg`} />
                <h3>{ day }</h3>
                <p>min: {Math.round(props.forecast.min_temp)} &deg;C</p>
                <p>max: {Math.round(props.forecast.max_temp)} &deg;C</p>
                <p>humidity: {Math.round(props.forecast.humidity)}%</p>
                </div>
            </div>
        
    );
}

export default WeatherCard;