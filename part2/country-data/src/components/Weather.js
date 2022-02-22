import axios from 'axios'
import { useState, useEffect } from 'react'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState({})

    useEffect(() => {
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        axios.get(url)
            .then(response => {
                setWeather(response.data)
            })
    }, [country])

    if (Object.keys(weather).length !== 0) return (
        <>
            <h2>Weather in {country.capital[0]}</h2>
            <div>temperature {weather.main.temp} Celsius</div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather"></img>
            <div>wind {weather.wind.speed} m/s</div>
        </>
    )
    else return <></>
}

export default Weather