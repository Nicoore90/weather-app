import './App.css';
import { Header,Dropdown } from './components/header/header';
import { useEffect, useState } from 'react';

function App() {
  let lat = -31
  let long = -64

  function getGeolocation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    
    navigator.geolocation.getCurrentPosition((position) => {
      let coords = position.coords
      console.log(coords)
      lat = coords.latitude
      long = coords.longitude
      console.log(lat)
      console.log(long)
    }, (error) => {
      console.log(error)
    }, options)
  }

  getGeolocation()

  console.log(lat)
  console.log(long)

  const api = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&units=metric&appid=94d76cede76928778bd75e39b3d98944`
  const [weather, setWeather] = useState()


 
  useEffect(() => {
    fetch(api)
    .then((res) => res.json())
    .then((data) => {
      setWeather(data)
    })
  }, [])

  return (
    <div className="App">
      <Header>
        <Dropdown />
      </Header>
      {weather ? (
        <div className='weather__container'>
          <h1 className='timezone'>{weather.timezone}</h1>
          <h2 className='temp'>{weather.current.temp}°C</h2>
          <h3 className='weather'>{weather.current.weather[0].main}</h3>
          <p className='description'>{weather.current.weather[0].description}</p>
        </div>
      ) : null}
    </div>
  );
}

export default App;
