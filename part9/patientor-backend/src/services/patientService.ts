import { v4 as uuidv4 } from "uuid";
import { Patient, NonSensitivePatient } from "../types";
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

const addPatient = (
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
): Patient => {
  const newPatient = {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    id: uuidv4(),
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getNonSensitivePatients, addPatient };
