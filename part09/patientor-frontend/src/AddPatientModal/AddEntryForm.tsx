import { Formik, Form, Field } from "formik";
import { Entry } from "../types";
import { DiagnosisSelection, TextField } from "./FormField";
import { Grid, Button } from "@material-ui/core";
import { useStateValue } from "../state";

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryFormValues = UnionOmit<Entry, "id">;

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "OccupationalHealthcare",
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const dateError = "Field has to be a date in format YYYY-MM-DD";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors: { [field: string]: any } = {};
        if (!values.description) errors.description = requiredError;
        if (!isDate(values.date)) errors.date = dateError;
        if (!values.date) errors.date = requiredError;
        if (!values.specialist) errors.specialist = requiredError;
        if (values.type === "OccupationalHealthcare") {
          if (!values.employerName) errors.employerName = requiredError;
          if (values.sickLeave?.startDate || values.sickLeave?.endDate) {
            errors.sickLeave = {};
            if (!isDate(values.sickLeave?.startDate)) errors.sickLeave.startDate = dateError;
            if (!values.sickLeave?.startDate) errors.sickLeave.startDate = requiredError;
            if (!isDate(values.sickLeave?.startDate)) errors.sickLeave.endDate = dateError;
            if (!values.sickLeave?.startDate) errors.sickLeave.endDate = requiredError;
            console.log(errors);
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="date"
              placeholder="date"
              name="date"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="employerName"
              placeholder="employerName"
              name="employerName"
              component={TextField}
            />
            <Field
              label="startDate"
              placeholder="startDate"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="endDate"
              placeholder="endDate"
              name="sickLeave.endDate"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
