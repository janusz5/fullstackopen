import React, { useState } from 'react'

const Header = ({ header }) => <h1>{header}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ states }) => {
  if (states.good + states.neutral + states.bad === 0) return <div>No feedback given</div>
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={states.good} />
        <StatisticLine text={"neutral"} value={states.neutral} />
        <StatisticLine text={"bad"} value={states.bad} />
        <StatisticLine text={"all"} value={states.all} />
        <StatisticLine text={"average"} value={states.average} />
        <StatisticLine text={"positive"} value={states.positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const states = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: good + neutral + bad,
    average: ((good - bad) / (good + neutral + bad)).toFixed(2),
    positive: ((100 * good) / (good + neutral + bad)).toFixed(2) + " %"
  }

  return (
    <div>
      <Header header={"give feedback"} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header header="statistics" />
      <Statistics states={states} />
    </div>
  )
}

export default App