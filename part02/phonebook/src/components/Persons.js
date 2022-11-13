import React from 'react'

import Person from './Person'

const Persons = ({ persons, personFilter, handleDeletion }) => {
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(personFilter.toLowerCase()))
  return (
    <ul>
      {personsToShow.map(person =>
        <Person key={person.id} person={person} handleDeletion={handleDeletion} />
      )}
    </ul>
  )
}

export default Persons