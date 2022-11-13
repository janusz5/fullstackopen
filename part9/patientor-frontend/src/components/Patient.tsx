import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue } from "../state";

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
        dispatch({ type: "UPDATE_PATIENT", payload: response.data });
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
    </div>
  );
};

export default PatientView;
