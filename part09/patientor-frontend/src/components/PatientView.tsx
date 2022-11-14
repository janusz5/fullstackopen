import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from "@material-ui/core";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";
import { useStateValue, updatePatient, addPatientEntry } from "../state";
import HospitalEntryView from "./HospitalEntryView";
import HealthCheckEntryView from "./HealthCheckEntryView";
import OccupationalHealthcareEntryView from "./OccupationalHealthcareEntryView";
import { EntryFormValues } from "../AddPatientModal/AddEntryForm";
import { AddEntryModal } from "../AddPatientModal";
import React from "react";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const PatientView = () => {
  const patientId = useParams().patientId as string;
  const [{ patients, diagnoses }, dispatch] = useStateValue();

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

  if (Object.keys(diagnoses).length === 0) return <></>;

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const {
        data: { patientId, entry },
      } = await axios.post<{ patientId: string; entry: Entry }>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(addPatientEntry(patientId, entry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
      {patient.entries?.map((entry) => (
        <Box key={entry.id} border={1} borderRadius={16} p={1.5} my={1.25}>
          {getEntryView(entry)}
        </Box>
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </Box>
  );
};

export default PatientView;
