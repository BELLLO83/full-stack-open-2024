import { useState } from 'react'
import { Names } from '../components/Names'

const Filter=({searchPerson,handleSearchPerson})=>{
  return(

    <div>
          filter shown with{""} <input value={searchPerson} onChange={handleSearchPerson}/>
        </div>
  )
}

const PersonalForm=({addName,newName,handleNameChange,newNumber,handleNumbereChange})=>{
  return(
    <div>
      <form onSubmit={addName} >
        <h3> Add a new</h3>
        <div>
          name: <input value={newName}  onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumbereChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons=({filteredPerson})=>{
  return(
    <div>
       {filteredPerson.map((person)=> {
        return <Names key={person.id}  person={person} />
        // return <Names person={person} />;
      })}

    </div>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState(props.persons) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchPerson, setSearchPerson] = useState("")
  const [filteredPerson, setFilteredPerson] = useState(props.persons)

  const addName=(event)=>{
    event.preventDefault()
    console.log(event.target)

    const nameExist=persons.some((person)=> person.name === newName)

    if (nameExist)
    {
      alert(`${newName} is already added to phonebook`)
      setNewName("")
      return
    }

    const nameObject={
      id: persons.length +1,
      name:newName,
      number:newNumber,
    }

    setPersons(persons.concat(nameObject))
    setFilteredPerson(filteredPerson.concat(nameObject))
    setNewName("")
    setNewNumber("")

  }
  
  const handleNameChange=(event)=>
  {
    setNewName(event.target.value)
    console.log(event.target.value)
  }

  const handleNumbereChange=(event)=>
    {
      setNewNumber(event.target.value)
      console.log(event.target.value)
    }

    const handleSearchPerson=(event)=>
      {
        console.log(event.target.value)
        setSearchPerson(event.target.value)    

        const filteredItems=persons.filter((person)=> person.name.toLowerCase().includes(event.target.value.toLowerCase()))
        setFilteredPerson(filteredItems)
      }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPerson={searchPerson} handleSearchPerson={handleSearchPerson}  />
      <PersonalForm  addName={addName} newName={newName}  handleNameChange={handleNameChange} newNumber={newNumber} handleNumbereChange={handleNumbereChange}/>
      
      <h3>Numbers</h3>
      <Persons  filteredPerson={filteredPerson}/>
      
    </div>
  )
}

export default App