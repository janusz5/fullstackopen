/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";
import { parseId } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  try {
    const id: string = parseId(req.params.id);
    const patient = patientService.getPatient(id);
    if (patient) return res.send(patient);
    else return res.status(404).send("patient not found");
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    return res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

export default router;
