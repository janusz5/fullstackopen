import { v4 as uuidv4 } from "uuid";
import { Patient, NonSensitivePatient, NewPatient, Entry } from "../types";
import patients from "../../data/patients";

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): Patient => {
  return patients.filter((patient) => patient.id === id)[0];
};

const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (newPatient: NewPatient): Patient => {
  const addedPatient = { ...newPatient, id: uuidv4() };
  patients.push(addedPatient);
  return addedPatient;
};

const addEntry = (id: string, entry: Entry): Patient => {
  const patient = patients.filter((p) => p.id === id)[0];
  patient.entries.push(entry);
  patients.forEach((p) => (p.id !== id ? p : patient));
  return patient;
};

export default {
  getPatients,
  getPatient,
  getNonSensitivePatients,
  addPatient,
  addEntry,
};
