const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / ((height / 100) ** 2)
  if (bmi < 17) return "underweight (unhealthy weight)"
  if (bmi < 18.5) return "underweight (healthy weight)"
  if (bmi < 25) return "Normal (healthy weight)"
  if (bmi < 30) return "Overweight (healthy weight)"
  return "Overweight (unhealthy weight)"
}

console.log(calculateBmi(180, 74))
