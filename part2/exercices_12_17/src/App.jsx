import { useState,useEffect } from 'react'
import axios from "axios"

import { Names } from '../components/Names'
import nameService from './service/name'
import './index.css'

// const Notification=({successMessage})=>{
//   return<div className='success-message'>{successMessage}</div>
// }

const Filter=({searchPerson,handleSearchPerson})=>{
  return(

    <div>
          filter shown with{""} <input value={searchPerson} onChange={handleSearchPerson}/>
        </div>
  )
}

const PersonalForm=({addName,newName,handleNameChange,newNumber,handleNumbereChange,successMessage})=>{
  return(
    <div>
       {/* {successMessage &&  <Notification  successMessage={successMessage}/>} */}
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

const Persons=({filteredPerson,deleteName})=>{
  return(
    <div>
       {filteredPerson.map((person)=> {
        return <Names key={person.id}  person={person} deleteName={deleteName}/>
        // return <Names person={person} />;
      })}

    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchPerson, setSearchPerson] = useState("")
  const [filteredPerson, setFilteredPerson] = useState([])
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const Notification=({message,isError})=>
  {
    if(!message){
      return null;
    }

    const className=isError ? "error-message"   : "success-message";
     return <div className={className}>{message}</div>
     

  }

  useEffect(()=> {
    nameService
    .getAll()
    .then((initialPerson)=>{
        console.log("promise fulfilled!")
        setPersons(initialPerson)
        setFilteredPerson(initialPerson)

    }).catch((error)=>{
      console.error("error fetching data",error)
    }
    )
  },[])

  const addName=(event)=>{
    event.preventDefault()
    console.log(event.target)

    const nameExist=persons.find((person)=> person.name.toLowerCase() === newName.toLowerCase())

    
    const nameObject={
      // id: persons.length +1,
      name:newName,
      number:newNumber,
    }
    
    if (nameExist)
    {
      const confirmed=window.confirm(`${nameExist.name} is already added to phonebook`)
      if(!confirmed)
      {
      return
      }
      nameService
      .update(nameExist.id,nameObject).then(updatePerson=>{
        setPersons(prevPerson=>{
          prevPerson.id=== nameExist.id? updatePerson: persons;
        }) 
        setFilteredPerson(prevFilteredPerson=>{
          prevFilteredPerson.id=== nameExist.id? updatePerson: persons;
        }) 
        setSuccessMessage(`${updatePerson.name}  has been updated successfully `)
        setTimeout(() => {          
          setSuccessMessage("")
        }, 4000);
      }).catch(error =>{
        console.error("error updating the number",error.message)
        setErrorMessage(`information : ${nameExist.name} has already removred from this list`)
        // alert("error updating the number")
        setTimeout(() => {          
          setErrorMessage("")
        }, 4000);

      })
    }else{

      
      nameService
      .create(nameObject)
      .then((returnedPerson)=>{
        setPersons(persons.concat(returnedPerson))
        setFilteredPerson(filteredPerson.concat(returnedPerson))
        setSuccessMessage(`${returnedPerson.name}  is successfully added`)
        setTimeout(() => {          
          setSuccessMessage("")
        }, 4000);

      }).catch(error =>{
        console.error("error updating the number",error.message)
        alert("error updating the number")

      })   
      
    }
    setNewName("")
    setNewNumber("")

  }

  const deleteName=(id,name)=>{
    const confirmDelete = window.confirm(`delete ${name} ?`)
    if(!confirmDelete)
    {return; }
    nameService
      .remove(id)
      .then(()=>{
        setPersons(persons.filter((person)=> person.id !== id))
        setFilteredPerson(filteredPerson.filter((person)=> person.id !== id))


      })
      .catch((error)=>
      {
        console.log("error deleting person:",error.message)
        alert("error deleting person")
      }
      )
     
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
      
      {/* <Notification  successMessage={successMessage}/> */}
      <Notification message={successMessage} isError={false}/>
      <Notification message={errorMessage} isError={false}/>

      <Filter searchPerson={searchPerson} handleSearchPerson={handleSearchPerson}  />
      <PersonalForm  
      addName={addName} 
      newName={newName}  
      handleNameChange={handleNameChange} 
      newNumber={newNumber}
       handleNumbereChange={handleNumbereChange}
      //  successMessage={successMessage}
      />
      
      <h3>Numbers</h3>
      <Persons  filteredPerson={filteredPerson} deleteName={deleteName}/>
      
    </div>
  )
}

export default App