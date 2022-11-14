import { Formik, Form, Field } from "formik";
import { Entry } from "../types";
import {
  DiagnosisSelection,
  SelectField,
  TextField,
  TypeOption,
} from "./FormField";
import { Grid, Button } from "@material-ui/core";
import { useStateValue } from "../state";

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type EntryFormValues = UnionOmit<Entry, "id">;

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "HealthCheck" },
  { value: "OccupationalHealthcare", label: "OccupationalHealthcare" },
  { value: "Hospital", label: "Hospital" },
];

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const getOccupationalHealthcareForm = () => (
  <>
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
  </>
);

const getHospitalForm = () => (
  <>
    <Field
      label="discharge date"
      placeholder="discharge date"
      name="discharge.date"
      component={TextField}
    />
    <Field
      label="discharge criteria"
      placeholder="discharge criteria"
      name="discharge.criteria"
      component={TextField}
    />
  </>
);

const getEntryForm = (type: string) => {
  switch (type) {
    case "OccupationalHealthcare":
      return getOccupationalHealthcareForm();
    case "Hospital":
      return getHospitalForm();
    default:
      return "";
  }
};

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
        sickLeave: { startDate: "", endDate: "" }
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
            if (!isDate(values.sickLeave?.startDate))
              errors.sickLeave.startDate = dateError;
            if (!values.sickLeave?.startDate)
              errors.sickLeave.startDate = requiredError;
            if (!isDate(values.sickLeave?.startDate))
              errors.sickLeave.endDate = dateError;
            if (!values.sickLeave?.startDate)
              errors.sickLeave.endDate = requiredError;
          }
        } else if (values.type === "Hospital") {
          errors.discharge = {};
          if (!isDate(values.discharge.date))
            errors.discharge.date = dateError;
          if (!values.discharge.date)
            errors.discharge.date = requiredError;
          if (!values.discharge.criteria)
            errors.discharge.criteria = requiredError;
      }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={typeOptions} />
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

            {getEntryForm(values.type)}

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
