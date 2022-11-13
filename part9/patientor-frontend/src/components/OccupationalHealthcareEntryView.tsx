import { OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";
import { Box, List, ListItem, ListItemText } from "@material-ui/core";
import { Work } from "@material-ui/icons";

const OccupationalHealthcareEntryView = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  const [{ diagnoses }] = useStateValue();
  if (Object.keys(diagnoses).length === 0) return <></>;
  return (
    <Box>
      <Box>
        {entry.date} <Work /> <i>{entry.employerName}</i>
      </Box>
      <Box>{entry.description}</Box>
      <Box>Diagnose by {entry.specialist}</Box>
      {entry.diagnosisCodes ? (
        <List>
        {entry.diagnosisCodes?.map((diagnosisCode) => (
          <ListItem key={diagnosisCode}>
            <ListItemText>
              {diagnosisCode} {diagnoses[diagnosisCode].name}
            </ListItemText>
          </ListItem>
        ))}
      </List>
      ) : (
        ""
      )}
      {entry.sickLeave
        ? `Sick Leave from ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}.`
        : ""}
    </Box>
  );
};

export default OccupationalHealthcareEntryView;
