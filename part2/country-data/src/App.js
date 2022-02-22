import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter"
import Countries from "./components/Countries"

function App() {
    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([])
    const [showCountry, setShowCountry] = useState({buttonPressed: false, pressedCountry: ""})

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleFilterChange = (event) => {
        setShowCountry({buttonPressed: false, pressedCountry: ""})
        setFilter(event.target.value)
    }

    const handleButtonPress = (country) => {
        if (country === showCountry.pressedCountry) setShowCountry({buttonPressed: !showCountry.buttonPressed, pressedCountry: country})
        else setShowCountry({buttonPressed: true, pressedCountry: country})    
    }

    return (
        <div>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <Countries countries={countries} 
                filter={filter} 
                handleButtonPress={handleButtonPress} 
                showCountry={showCountry}
            />
        </div>
    )
}

export default App;
