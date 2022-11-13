import { HealthCheckEntry, HealthCheckRating } from "../types";
import { useStateValue } from "../state";
import { Box, List, ListItem, ListItemText } from "@material-ui/core";
import { Assignment, Favorite } from "@material-ui/icons";

const HealthCheckEntryView = ({ entry }: { entry: HealthCheckEntry }) => {
  const [{ diagnoses }] = useStateValue();
  if (Object.keys(diagnoses).length === 0) return <></>;
  const mapHealthStatus = (healthStatus: HealthCheckRating): string => {
    switch (healthStatus) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return "black";
    }
  };

  return (
    <Box>
      <Box>
        {entry.date} <Assignment />
      </Box>
      <Box>{entry.description}</Box>
      <Box>
        <Favorite htmlColor={mapHealthStatus(entry.healthCheckRating)} />
      </Box>
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
    </Box>
  );
};

export default HealthCheckEntryView;
