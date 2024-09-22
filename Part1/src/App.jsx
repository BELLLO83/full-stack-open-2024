

const Header = (props) => {
  // const course = 'Half Stack application development'
   return (   
      <h1> {props.course} </h1>    
   )
}

const Part = (props) => {
  // const course = 'Half Stack application development'
   return (   
      <p> {props.part}  {props.exercices} </p>    
   )
}

const Content =() => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  
 
  return (
    <div>
     <Part part={part1}  exercises={exercises1} />
     <Part part={part2}  exercises={exercises2} />
     <Part part={part3}  exercises={exercises3} />
     
      </div>
    )
  }

const Total =(props) =>{
   return  <p> Number of exercises {props.SumOfExercices}</p>

}


const App = () => {
 const course = 'Half Stack application development'
 
  
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

 const SumOfExercices=exercises1+exercises2+exercises3
  

  return (
    <div>
      <Header  course={course}/>
      <Content  />
      
      <Total SumOfExercices={SumOfExercices} />
      
    </div>
  )
}

export default App