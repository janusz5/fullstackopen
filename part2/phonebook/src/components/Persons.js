import Person from "./Person";

const Persons = ({persons, personFilter}) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(personFilter.toLowerCase()))
    return (
        <ul>
            {personsToShow.map(person =>
                <Person key={person.id} person={person} />
            )}
        </ul>
    )
}

export default Persons