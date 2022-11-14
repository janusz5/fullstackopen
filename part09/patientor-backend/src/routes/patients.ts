/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../parsers/patientParser";
import { parseId } from "../parsers/utils";
import toNewEntry from "../parsers/entryParser";

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

router.post("/:id/entries", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  const entry = toNewEntry(req.body);
  const id: string = parseId(req.params.id);
  const addedPatient = patientService.addEntry(id, entry);
  return res.json({patientId: addedPatient.id, entry});
});

export default router;
