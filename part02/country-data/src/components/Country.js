import Weather from "./Weather"

const Country = ({ country, weather, setWeather }) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>
            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt="Flag"></img>
            <Weather country={country} weather={weather} setWeather={setWeather} />
        </>
    )
}

export default Country