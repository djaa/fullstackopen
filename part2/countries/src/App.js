import React, {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data.map(country => (
          {
            "name": country.name.common,
            "capital": country.capital,
            "population": country.population,
            "languages": country.languages,
            "flag": country.flags.svg
        }
        )));
      })
  },[])

  const updateFilter = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>
      <div>find countries <input
        value={filter}
        onChange={updateFilter}
        />      
      </div>
      <Countries allCountries={countries.filter(country => 
        country.name.toLowerCase().includes(filter.toLowerCase()))} /> 
    </div>
  );
}

const Countries = ({allCountries}) => {
  if(allCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (allCountries.length > 1) {
    const sorted = allCountries.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0 )
    return (
      <>
        {sorted.map(country => <CountryList key={country.name} country={country} />)}
      </>
    )
  } else if (allCountries.length > 0) {
    return (
      <>
        {<Country country={allCountries[0]} />}
      </>
    )
  } else {
    return <></>
  } 
}

const Country = ({country}) => {
  return (
      <div>
        <h1>{country.name}</h1>
        <div>capital {country.capital[0]}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        <Languages language={country.languages} />
        <img 
          src={country.flag}
          alt="flag"
          style={{
            width: 150,
            height: 150 }}
        />
      </div>
  )
} 

const CountryList = ({country}) => {
  const [showDetails, setShowDetails] = useState(false)
  const handleShowDetails = (event) => {
    event.preventDefault()
    setShowDetails(!showDetails)
  }
  if(showDetails) {
    return (
      <>
        <form onSubmit={handleShowDetails}>
          <div>{country.name}
          <button type="submit">show</button></div>
        </form>
        <Country country={country} />
      </>
    )
  } else {
    return (
      <>
        <form onSubmit={handleShowDetails}>
          <div>{country.name}
          <button type="submit">show</button></div>
        </form>
      </>
    )
  }
}
const Languages = ({language}) => {
  let lang = new Array([])
  for (let [key, value] of Object.entries(language)) {
    lang.push(<Language key={key} name={value} />)
  }
  return (
    <ul>{lang}</ul>
  )
}
const Language = (props) => <li>{props.name}</li>

export default App;
