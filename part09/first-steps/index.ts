import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (!req.query.height || !req.query.weight)
    return res.status(400).json({ error: "parameters missing" });
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight))
    return res.status(400).json({ error: "malformatted parameters" });
  return res.json({ weight, height, bmi: calculateBmi(height, weight) });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body.daily_exercises || !req.body.target)
    return res.status(400).json({ error: "parameters missing" });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = Number(req.body.target);

  const daily_exercises: Array<number> = Array.from(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    req.body.daily_exercises,
    (x) => Number(x)
  );

  if (daily_exercises.some(isNaN) || isNaN(target))
    return res.status(400).json({ error: "malformatted parameters" });

  return res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
