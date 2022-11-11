interface BMIValues {
  height: number;
  weight: number;
}

const parseBMIArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2;
  if (bmi < 17) return "underweight (unhealthy weight)";
  if (bmi < 18.5) return "underweight (healthy weight)";
  if (bmi < 25) return "Normal (healthy weight)";
  if (bmi < 30) return "Overweight (healthy weight)";
  return "Overweight (unhealthy weight)";
};

try {
  const { height, weight } = parseBMIArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

//console.log(calculateBmi(180, 74))
