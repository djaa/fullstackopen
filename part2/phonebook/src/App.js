import React, { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import './index.css'

const Persons = ({ persons, filter, handlePersonDel }) => (
  <>
    {persons
      .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      .map(person => <Person key={person.name} person={person} handleDelete={() => handlePersonDel(person.id)} />)}
  </>
)

const Person = ({ person, handleDelete }) => 
(
  <div>{person.name} {person.number}<button onClick={handleDelete}>delete</button></div>
)

const PersonForm = ({ newName, handleUpdate, newNumber, handleNumberUpdate, addName }) => (
  <>
    <form onSubmit={addName}>
      <div>
        name: <input
          value={newName}
          onChange={handleUpdate}
        />
      </div>
      <div>number: <input
        value={newNumber}
        onChange={handleNumberUpdate}
      />
      </div>
      <div>
        <button type="submit">add person</button>
      </div>
    </form>
  </>
)

const Filter = ({ value, stateUpd }) =>
(
  <div>filter shown with <input
    value={value}
    onChange={stateUpd}
  />
  </div>
)

const Notification = ({ message, showError }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={showError ? 'error' : 'notification'}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilter] = useState('')
  const [userActionInfo, setUserActionInfo] = useState(null)
  const [showError, setShowError] = useState(false)

  const hook = () => {
    phonebookService
      .getPhonebook()
      .then(response => {
        setPersons(response)
      })
  }
  useEffect(hook, [])

  const addName = (event) => {
    const newPerson = {name: newName, number: newNumber}
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        let perId = 0
        persons.forEach(person => {
          if(person.name === newPerson.name) {
            perId = person.id
          }
        })
        phonebookService
          .updatePerson(newPerson, perId)
          .then(newEntry => {
            setPersons(persons.map(person => person.name !== newPerson.name ? person : newEntry))
            setUserActionInfo(`Updated phonebook entry of ${newEntry.name}`)
            setTimeout(() => {
              setUserActionInfo(null)
            }, 5000)
          })
          .catch(error => {
            setShowError(true)
            setUserActionInfo(`Information of ${newPerson.name} has already been removed from server`)
            setTimeout(() => {
              setUserActionInfo(null)
              setShowError(!showError)
            }, 5000)
          }
        )
      }
    } else {
      phonebookService
        .createPerson(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
          setUserActionInfo(`Added ${createdPerson.name}`)
          setTimeout(() => {
            setUserActionInfo(null)
          }, 5000)
        })
    }
  }

  const personDelete = id => {
    persons.forEach(person => {
      if(person.id === id) {
        if(window.confirm(`Delete user ${person.name} ?`)) {
          phonebookService
          .deletePerson(id)
          .then(
            setPersons(persons.filter(persona => persona.id !== id))
          )
        }
      }
    })
  }

  const handleUpdate = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberUpdate = (event) => {
    setNewNumber(event.target.value)
  }
  const updateFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={userActionInfo} showError = {showError} />
      <Filter value={filterWord} stateUpd={updateFilter} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        handleUpdate={handleUpdate}
        newNumber={newNumber}
        handleNumberUpdate={handleNumberUpdate}
        addName={addName}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filterWord} handlePersonDel={personDelete} />
    </div>
  )
}

export default App