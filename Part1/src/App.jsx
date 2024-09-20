

const Header = () => {
   const course = 'Half Stack application development'
   return (   
      <h1> {course} </h1>    
   )
}

const Content =() => {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return (
    <div>
      <p>
        {part1} {exercises1}
      </p>
      <p>
      {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
     
      </div>
    )
  }

const Total =() =>{
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return  <p> Number of exercises {exercises1 + exercises2 + exercises3}</p>

}


const App = () => {
 
  

  return (
    <div>
      <Header />
      <Content />
      <Total />
      
    </div>
  )
}

export default App