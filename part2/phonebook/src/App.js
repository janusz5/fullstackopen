import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')

  useEffect(() => {
    personService.readAllPersons()
      .then(personsGet => {
        console.log("set initial persons with axios")
        setPersons(personsGet)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePersonFilterChange = (event) => {
    setPersonFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(element => element.name === newName)) {
      const confirmed = window.confirm(`${newName} is already added to the phonebook. Do you want to replace it?`)
      if (confirmed) {
        const personObject = {
          name: newName,
          number: newNumber,
          id: persons.find(person => person.name === newName).id
        }
        personService.updatePerson(personObject)
          .then(responsePerson =>
            setPersons(persons.map(mapPerson => mapPerson.name === newName ? responsePerson : mapPerson)))
      }
      else return
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService.createPerson(personObject)
        .then(person => {
          setPersons(persons.concat(person))
          console.log(person, "added")
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDeletion = (person) => {
    const confirmed = window.confirm(`Delete ${person.name}?`)
    if (confirmed) {
      personService.deletePerson(person.id)
      setPersons(persons.filter(arrPerson => arrPerson.id !== person.id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter personFilter={personFilter} handlePersonFilterChange={handlePersonFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} personFilter={personFilter} handleDeletion={handleDeletion} />
    </div>
  )
}

export default App