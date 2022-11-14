import { BaseEntry, Diagnosis, Entry, HealthCheckRating } from "../types";
import { parseString, parseDate, isNumber, isDate, isString } from "./utils";
import { v4 as uuidv4 } from "uuid";

export const isDiagnosisCode = (x: unknown): x is Diagnosis["code"] => {
  return typeof x === "string" || x instanceof String;
};

export const parseDiagnosisCode = (
  diagnosisCode: unknown
): Diagnosis["code"] => {
  if (!diagnosisCode || !isDiagnosisCode(diagnosisCode)) {
    throw new Error("Incorrect diagnosisCode");
  }
  return diagnosisCode;
};

const parseDiagnosisCodes = (
  diagnosisCodes: Array<unknown>
): Array<Diagnosis["code"]> => {
  return diagnosisCodes.map((diagnosisCode) =>
    parseDiagnosisCode(diagnosisCode)
  );
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    !isNumber(healthCheckRating) ||
    healthCheckRating < 0 ||
    healthCheckRating > 4
  ) {
    throw new Error("Incorrect or missing healthCheckRating");
  }
  return healthCheckRating as HealthCheckRating;
};

const parseDischarge = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  discharge: any
): {
  date: string;
  criteria: string;
} => {
  if (
    !discharge ||
    !discharge.date ||
    !isString(discharge.date) ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    !isDate(discharge.date) ||
    !discharge.criteria ||
    !isString(discharge.criteria)
  ) {
    throw new Error("Incorrect or missing discharge");
  }
  return discharge as {
    date: string;
    criteria: string;
  };
};

const parseSickLeave = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sickLeave: any
): { startDate: string; endDate: string } => {
  if (sickLeave.startDate && sickLeave.endDate) {
    return {
      startDate: parseDate(sickLeave.startDate, "startDate"),
      endDate: parseDate(sickLeave.endDate, "endDate"),
    };
  } else throw new Error("incorrect sickLeave");
};

type Fields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  type: unknown;
  diagnosisCodes?: unknown;
  healthCheckRating?: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
  discharge?: unknown;
};

const toNewEntry = ({
  description,
  date,
  specialist,
  type,
  diagnosisCodes,
  healthCheckRating,
  employerName,
  sickLeave,
  discharge,
}: Fields): Entry => {
  const parsedType = parseString(type, "type");
  const parsedDescription = parseString(description, "description");
  const parsedDate = parseDate(date, "date");
  const parsedSpecialist = parseString(specialist, "specialist");
  let entry: BaseEntry = {
    id: uuidv4(),
    description: parsedDescription,
    date: parsedDate,
    specialist: parsedSpecialist,
  };

  if (diagnosisCodes) {
    entry = {
      ...entry,
      diagnosisCodes: parseDiagnosisCodes(diagnosisCodes as Array<unknown>),
    };
  }
  switch (parsedType) {
    case "HealthCheck":
      return {
        ...entry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
    case "OccupationalHealthcare":
      const returnEntry: Entry = {
        ...entry,
        type: "OccupationalHealthcare",
        employerName: parseString(employerName, "employerName"),
      };
      if (sickLeave) {
        return { ...returnEntry, sickLeave: parseSickLeave(sickLeave) };
      } else {
        return returnEntry;
      }
    case "Hospital":
      return {
        ...entry,
        type: "Hospital",
        discharge: parseDischarge(discharge),
      };
    default:
      throw new Error("Incorrect Entry Type");
  }
};

export default toNewEntry;
