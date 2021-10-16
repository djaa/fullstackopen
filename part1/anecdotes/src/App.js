import React, { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const MostVotes = ({ votes, anecdotes }) => {
  const indxMostVotes = findMaxIndex(votes)
  return (
    <>
      <div><b>{anecdotes[indxMostVotes]}</b></div>
      <div>has {votes[indxMostVotes] } votes</div>
    </>
  )
}

const findMaxIndex = (votes) => {
  let max = votes[0];
  let maxIndex = 0;

  for (let i = 1; i < votes.length; i++) {
    if (votes[i] > max) {
      maxIndex = i;
      max = votes[i];
    }
  }
  return maxIndex
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [votes, setVotes] = useState(Array(7).fill(0))
  const [selected, setSelected] = useState(0)

  const handleNextClick = () => {
    const randNum = Math.floor(Math.random() * (anecdotes.length - 1))
    console.log(randNum)
    setSelected(randNum)
  }
  const addVote = () => {
    const cpVotes = [...votes]
    cpVotes[selected]++
    setVotes(cpVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div><b>{anecdotes[selected]}</b></div>
      <div><b>has {votes[selected]} votes</b></div>
      <Button handleClick={addVote} text='vote' />
      <Button handleClick={handleNextClick} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <MostVotes votes={votes} anecdotes = {anecdotes} />
    </div>
  )
}

export default App
