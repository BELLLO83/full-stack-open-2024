import { useState } from 'react'

const Header =()=>{
  return(
    <div>
      <h2> give feedback</h2> 

    </div>
  )
}

const Content =()=>{
  return(
    <div>
      <h2>statistics</h2>

    </div>
  )
}

const Button=(props)=>
{
  return (<button onClick={props.handleClick}>{props.text}</button>)
}
const StatisticLine =(props)=>{
  return(
    
      <tr>
      <td>
        {props.text}  
      </td>
      <td>
        {props.value}
      </td>
      </tr>
    
  )
}

const Statistics =(props)=>{
  if(!(props.good ||props.neutral||props.bad))
  {
   return  (<p> no feedback given  </p>)
  }

  return (
    <table>
    {/* <p> good  {props.good}</p>
    <p> neural {props.neutral} </p>
    <p> bad  {props.bad}</p>
    <p> all  {props.good+props.neutral+props.bad}</p>
    <p> average  {(props.good-props.bad)/(props.good+props.neutral+props.bad)}</p>
    <p> positive  {(props.good * 100)/(props.good+props.neutral+props.bad)} %</p> */}
    <StatisticLine  text="good" value={props.good}/>
    <StatisticLine  text="neutral" value={props.neutral}/>
    <StatisticLine  text="bad" value={props.bad}/>
    <StatisticLine  text="all" value={props.good+props.neutral+props.bad}/>
    <StatisticLine  text="average" value={(props.good-props.bad)/(props.good+props.neutral+props.bad)}/>
    <StatisticLine  text="positive" value={(props.good * 100)/(props.good+props.neutral+props.bad)+ "%"}/>

    </table>

  )

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)

  const goodClicks=() => {
    setGood(good + 1)
  }
  
  const neutralClicks=() => {
    setNeutral(neutral+1)
  }

  const badClicks=() => {
    setBad(bad+1)
  }
  const randomString=()=>{
    const randomIndex=Math.floor(Math.random()*anecdotes.length)
    setSelected(randomIndex)
  }
  const initialVotes= new Array(anecdotes.length).fill(0)
  
  const[votes,setVotes]=useState(initialVotes)

  const handleVote=()=>{
    const newVotes =[...votes]
   
    newVotes[selected]+=1
    
    setVotes(newVotes)
  }

const maxVoteIndex =votes.indexOf(Math.max(...votes))

  return (
    <div>
      <Header/>
      {/* <button onClick = {() => setGood(good +1)}> good </button> */}
      {/* 
      <button onClick = {() => setNeutral(neutral +1)}> neutral </button>
      <button onClick = {() => setBad(bad +1)}> bad </button> */}
      <Button handleClick={goodClicks} text="good" />
      <Button handleClick={neutralClicks} text="neutral" />
      <Button handleClick={badClicks} text="bad" />
      
      <Content/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
       <h2>Anecdote of the day</h2>
       <p>{anecdotes[selected]}</p>
       <p>has {votes[selected]} votes</p>
       <button onClick={handleVote}>Vote</button>
      <button onClick={randomString}>next anecdote</button>
      <h2>Anecdote with the most votes</h2>
      {votes[maxVoteIndex]===0 ?(
        <p>No votes yet</p>
      ):
      <>
      <p>{anecdotes[maxVoteIndex]}</p>
      <p>has {votes[maxVoteIndex]} votes</p>
      </>

      }
      
      
 


    </div>
  )


}

export default App