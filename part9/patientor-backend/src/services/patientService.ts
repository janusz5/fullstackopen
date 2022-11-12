import { v4 as uuidv4 } from "uuid";
import { Patient, NonSensitivePatient, NewPatient } from "../types";
import patients from "../../data/patients";

const getPatients = (): Array<Patient> => {
  return patients;
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

export default { getPatients, getNonSensitivePatients, addPatient };