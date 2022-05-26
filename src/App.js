import './App.css';
import {Header, Dropdown} from './components/header/header';
import {useEffect, useState} from 'react';

function App() {

    const [coordinates, setCoordinates] = useState({lat: 31, long: 61});

    const [weather, setWeather] = useState();

    const [error, setError] = useState(false);

    const api = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.long}&units=metric&appid=5dd9a1d9e53e58a109d3b54088156c0a`

    function fetchCoordinates() {

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoordinates({lat: position.coords.latitude, long: position.coords.longitude});
            },
            (error) => {
                console.log(error)
            }, options)

    }

    useEffect(() => {
        fetchCoordinates();
    }, [])

    function fetchWeather(){
        fetch(api)
            .then((res) => {
                if (res.status <= 300 && res.status >= 200)
                    return res.json()
                setError(true);
            })
            .then((data) => {
                setWeather(data)
            })
    }

    useEffect(() => {
        fetchWeather();
    }, [coordinates])

    return (
        <div className="App">
            <Header>
                <Dropdown/>
            </Header>
            {weather ? (
                <div className='weather__container'>
                    <h1 className='timezone'>{weather.timezone}</h1>
                    <h2 className='temp'>{weather.current.temp}°C</h2>
                    <h3 className='weather'>{weather.current.weather[0].main}</h3>
                    <p className='description'>{weather.current.weather[0].description}</p>
                </div>
            ) : (error ? <p>Error cargando la temperatura</p> : <p className='center'>Cargando....</p>)
            }
        </div>
    );
}

export default App;
