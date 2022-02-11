import axios from "axios";

export async function getLocation(value) {
        
    axios.get(`https://www.metaweather.com/api/location/search/?query=${value}`)
        .then((response) => {
            console.log(response.data[0]);
            return response.data[0];
        });
}