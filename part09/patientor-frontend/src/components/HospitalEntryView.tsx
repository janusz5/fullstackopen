import { HospitalEntry } from "../types";
import { useStateValue } from "../state";
import { Box, List, ListItem, ListItemText } from "@material-ui/core";
import { LocalHospital } from "@material-ui/icons";

const HospitalEntryView = ({ entry }: { entry: HospitalEntry }) => {
  const [{ diagnoses }] = useStateValue();
  if (Object.keys(diagnoses).length === 0) return <></>;
  return (
    <Box>
      <Box>
        {entry.date} <LocalHospital />{" "}
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
      <Box>
        Discharged on {entry.discharge.date} because {entry.discharge.criteria}
      </Box>
    </Box>
  );
};

export default HospitalEntryView;
