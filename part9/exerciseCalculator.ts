interface ExerciseInformation {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const mean = (a: Array<number>): number => {
  const sum: number = a.reduce((previous: number, current: number): number => previous + current, 0)
  return sum / a.length
}

const calculateExercises = (exerciseHours: Array<number>, targetHours: number): ExerciseInformation => {
  const periodLength: number = exerciseHours.length
  const trainingDays: number = exerciseHours.reduce(
    (previous: number, current: number): number => {
      if (current !== 0) return previous + 1
      else return previous
    }, 0)
  const average: number = mean(exerciseHours)
  const target: number = targetHours
  let success: boolean
  if (average < target) {
    success = false
  } else {
    success = true
  }
  let rating: number
  let ratingDescription: string
  if (average > target) {
    rating = 1
    ratingDescription = "good, the target was met"
  } else if (average > target * 0.8) {
    rating = 2
    ratingDescription = "not too bad but could be better"
  } else {
    rating = 3
    ratingDescription = "bad, far away from the target"
  }
  return { periodLength, trainingDays, success, rating, ratingDescription, target, average }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
