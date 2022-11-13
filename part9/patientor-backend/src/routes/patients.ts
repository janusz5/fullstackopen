/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";
import { parseId } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const id: string = parseId(req.params.id);
  const patient = patientService.getPatient(id);
  if (patient) return res.send(patient);
  else return res.status(404).send("patient not found");
});

router.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientService.addPatient(newPatient);
  return res.json(addedPatient);
});

export default router;
