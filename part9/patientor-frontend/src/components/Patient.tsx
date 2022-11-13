import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue, updatePatient } from "../state";

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

  return (
    <div>
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
      <div>
        {patient.entries?.map((entry) => (
          <div key={entry.id}>
            <div>
              {entry.date} {entry.description}
            </div>
            <ul>
              {entry.diagnosisCodes?.map((diagnosis) => (
                <li key={diagnosis}>{diagnosis}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientView;
