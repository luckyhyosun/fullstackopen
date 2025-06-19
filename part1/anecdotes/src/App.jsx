import { useState } from 'react'

const anecdotes = [
    '0: If it hurts, do it more often.',
    '1: Adding manpower to a late software project makes it later!',
    '2: The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    '3: Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    '4: Premature optimization is the root of all evil.',
    '5: Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    '6: Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    '7: The only way to go fast, is to go well.'
  ]

const MaxAnecdote = (props) => {
  if(props){
    return (
    <div>
      <p>
        The most famous anecdote is... <br/>
        <b>{anecdotes[props.maxAnecdote]}</b>
      </p>
      <p>has {props.maxVote} votes.</p>
    </div>
  )
  }
}

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(8).fill(0));
  const [mostAnecdote, setMostAnecdote] = useState({});

  const randomNum = Math.floor(Math.random()* (anecdotes.length));

  const voteFunction = () => {
    console.log("selected anecdote index is: ", selected);
    const newVoteArray = [...votes];
    newVoteArray[selected] += 1;
    setVotes(newVoteArray);

    const maxVote = Math.max(...newVoteArray);
    const maxAnecdote = newVoteArray.indexOf(maxVote);
    console.log("maxVote is: ", maxVote, "maxAnecdote index is: ", maxAnecdote);
    setMostAnecdote({maxVote, maxAnecdote});
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]} <br />
        <i>has {votes[selected]} vote yet</i>
      </p>
      <button onClick={voteFunction}>Vote</button>
      <button onClick={() => {setSelected(randomNum)}}>Next Anecdote</button>

      <h1>Anecdote with the most votes</h1>
      <MaxAnecdote maxAnecdote={mostAnecdote.maxAnecdote} maxVote = {mostAnecdote. maxVote}/>
    </div>
  )
}

export default App
