import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const createPerson = (person) => axios.post(baseUrl, person).then(response => response.data)

const readAllPersons = () => axios.get(baseUrl).then(response => response.data)

const updatePerson = (person) => axios.put(`${baseUrl}/${person.id}`, person).then(response => response.data)

const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`)

const personService = {createPerson, readAllPersons, updatePerson, deletePerson}
export default personService