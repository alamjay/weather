import { Autocomplete, TextField, createFilterOptions } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { usePapaParse } from 'react-papaparse';

function Search(props) {
    
    const [cities, setCities] = useState([]);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [displayValidation, setDisplayValidation] = useState(false);
    const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
    const [locationSearch, setLocationSearch] = useState(false);

    const { readRemoteFile } = usePapaParse();    

    useEffect(() => {
        readRemoteFile('https://raw.githubusercontent.com/datasets/world-cities/master/data/world-cities.csv', {
            complete: (results) => {                
                const uniqueResults = [...new Set(results.data.map(city => city.name))];
                setCities(uniqueResults);
            },
            header: true,
        });

        const fetchLoc = async () => {
            
            await axios.get(`https://www.metaweather.com/api/location/search/?query=${value}`)
            .then((response) => {
                    props.onGetWeather(response.data[0]);  
                    setLocationSearch(false);
            })
            .catch(err => {
                setDisplayErrorMessage(true);
                console.log(err);
            })
        }

        if(locationSearch === true) {
            console.log(displayErrorMessage);
            fetchLoc();
        }
        
    }, [locationSearch, displayErrorMessage]);

    // limit number of options to display
    const filterOptions = createFilterOptions({
        limit: 10,
      
    });

    // input validation
    const handleInputChange = (event, newValue) => {
        setInputValue(newValue);
        newValue.length === 0 ? setDisplayValidation(true) : setDisplayValidation(false);
    } 

    return (
        <div className="search">
        
        <Autocomplete
        id="search-input"
        className="search-field"
        options={cities}
        filterOptions={filterOptions}
        value={value}
        onChange={(event, newValue) => {
            
            if(newValue !== null) {
                if(displayErrorMessage){ 
                    setDisplayErrorMessage(false);
                }
                setValue(newValue);
                setLocationSearch(true);
            }
        }}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField {...params} label="Search" variant="standard" />
        )}
      />

        {displayValidation &&

            <p className='error-validation'>Please enter city</p>
        }


        {displayErrorMessage && 

            <div>
                <h2 className="mt-5">Sorry, couldn't retrieve the city from MetaWeather</h2>
                <img src="./sad-face.gif" />        
            </div>
            
        }
      </div>
    );
}



export default Search;