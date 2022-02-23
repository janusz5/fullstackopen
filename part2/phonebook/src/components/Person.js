const Person = ({ person, handleDeletion }) => {
    return <li>{person.name} {person.number} <button onClick={() => handleDeletion(person)}>delete</button></li>
}

export default Person
