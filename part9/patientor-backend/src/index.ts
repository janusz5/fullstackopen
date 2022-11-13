import express from "express";
import diagnoseRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";
import { errorHandler } from "./middleware";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/diagnoses", diagnoseRouter);

app.use("/api/patients", patientRouter);

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
