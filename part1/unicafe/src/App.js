import React, { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const calcAve = (good, neutral, bad) => (good - bad) / (good + bad + neutral)
const calcPos = (good, neutral, bad) => good / (good + neutral + bad) * 100

const Statistics = ({ good, neutral, bad }) => {
  if (good !== 0 || neutral !== 0 || bad !== 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text={'good'} value={good} />
          <StatisticLine text={'neutral'} value={neutral} />
          <StatisticLine text={'bad'} value={bad} />
          <StatisticLine text={'all'} value={good + neutral + bad} />
          <StatisticLine text={'average'} value={calcAve(good, neutral, bad)} />
          <StatisticLine text={'positive'} value={calcPos(good, neutral, bad)} />
        </tbody>
      </table>
    )
  }
  return (
    <>No feedback given</>
  )
}

const StatisticLine = ({ text, value }) => {
  if (text === 'positive') {
    return <tr><td>{text}</td><td>{value}%</td></tr>
  }
  return <tr><td>{text}</td><td>{value}</td></tr>
}

const App = () => {
  const [good, setGoods] = useState(0)
  const [neutral, setNeutrals] = useState(0)
  const [bad, setBads] = useState(0)

  const handleGoodClick = () => setGoods(good + 1)
  const handleBadClick = () => setBads(bad + 1)
  const handleNeutralClick = () => setNeutrals(neutral + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
