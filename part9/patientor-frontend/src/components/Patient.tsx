import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Typography, List, ListItem, ListItemText, Box } from "@material-ui/core";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";
import { useStateValue, updatePatient } from "../state";
import HospitalEntryView from "./HospitalEntryView";
import HealthCheckEntryView from "./HealthCheckEntryView";
import OccupationalHealthcareEntryView from "./OccupationalHealthcareEntryView";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const PatientView = () => {
  const patientId = useParams().patientId as string;
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[patientId];
  if (!patient || !patient.ssn) {
    useEffect(() => {
      const fetchPatient = async (patientId: string) => {
        const response = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        dispatch(updatePatient(response.data));
      };
      void fetchPatient(patientId);
    }, []);
    return <></>;
  }

  const getEntryView = (entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryView key={entry.id} entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntryView key={entry.id} entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryView key={entry.id} entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <Box>
      <Typography variant="h4" style={{ margin: "0.7em 0em 0.2em 0em" }}>
        {patient.name}
      </Typography>
      <List disablePadding={true}>
        <ListItem>
          <ListItemText>ssn: {patient.ssn}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>occupation: {patient.occupation}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>date of birth: {patient.dateOfBirth}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>gender: {patient.gender}</ListItemText>
        </ListItem>
      </List>
      <Typography variant="h5" style={{ margin: "0.7em 0em 0.2em 0em" }}>
        Entries
      </Typography>
      {patient.entries?.map((entry) => <Box key={entry.id} border={1} borderRadius={16} p={1.5} my={1.25}>{getEntryView(entry)}</Box>)}
    </Box>
  );
};

export default PatientView;
