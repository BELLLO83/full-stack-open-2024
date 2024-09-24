

const Header = (props) => {
  // const course = 'Half Stack application development'
   return (   
      <h1> {props.course.name} </h1>    
   )
}

// const Part = (props) => {
//   // const course = 'Half Stack application development'
//    return (   
//       <p> {props.part}  {props.exercices} </p>    
//    )
// }

const Content =(props) => {
  // const course = 'Half Stack application development'
  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14
  
 
  return (
    <div>
     {/* <Part part={part1}  exercises={exercises1} />
     <Part part={part2}  exercises={exercises2} />
     <Part part={part3}  exercises={exercises3} /> */}
     <p>
      {props.course.parts[0].name} {props.course.parts[0].exercises}
     </p>
     <p>
      {props.course.parts[1].name} {props.course.parts[1].exercises}
     </p>
     <p>
      {props.course.parts[2].name} {props.course.parts[2].exercises}
     </p>
      </div>
    )
  }

const Total =(props) => {
   return  ( <p> Number of exercises {" "}
             {props.course.parts[0].exercises+props.course.parts[1].exercises+props.course.parts[2].exercises}
            </p>
   )


}


const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

//  const SumOfExercices=part1.exercises+part1.exercises+part1.exercises
  return (
    <div>
      <Header  course={course}/>
      <Content  course={course} />   
      <Total course={course} />

    </div>
  )
}

export default App   