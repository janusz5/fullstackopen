import Country from "./Country"

const Countries = ({ countries, filter, handleButtonPress, showCountry}) => {
    const filteredCountries = countries.filter(country => {
        return country.name.common.toLowerCase().includes(filter.toLowerCase())
    })
    if (filteredCountries.length === 1) {
        return <Country country={filteredCountries[0]} />
    }
    else if (1 < filteredCountries.length && filteredCountries.length <= 10) {
        return (
            <ul>
                {filteredCountries.map(country => {
                    return (
                        <li key={country.name.official}>
                            {country.name.common}
                            <button onClick={() => handleButtonPress(country)}>show</button>
                            {showCountry.buttonPressed && country === showCountry.pressedCountry && 
                            <Country country={showCountry.pressedCountry} />}
                        </li>
                    )
                })}
            </ul>
        )
    }
    else {
        return <div>Too many countries, specify another filter</div>
    }
}

export default Countries