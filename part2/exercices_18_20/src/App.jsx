import { useState,useEffect } from 'react'
import axios from "axios"

const App=()=>{

const [countries, setCountries]=useState([]);
const [searchItem, setSearchItem]=useState("");
const [selectedCountry,setSelectedCountry]=useState(null);
const [weather,setWeather]=useState(null);
const [apiError,setApiError]=useState(null);

useEffect(()=>{
  if(searchItem.trim()==="")
  {
    setCountries([])
    return
  }
const fetchCountry=async()=>{
  try{

    const url=`https://restcountries.com/v3.1/name/${searchItem}`
    const response=await axios.get(url);
    console.log(response.data);
    setCountries(response.data);
    setSelectedCountry(null);
    setWeather(null);

if(response.data.length===1)
{
  const capital=response.data[0].capital && response.data[0].capital[0];
  fetchWeathetDate(capital);
}
  }catch(error){
    console.error("error fetching data:",error.data)
  }
}
fetchCountry()
},[searchItem])

const fetchWeathetDate=async (capital)=>{
  try{
    const apiKey= import.meta.env.VITE_SOME_KEY
    // `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
    const v2_5=`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
    const weatherResponse=await axios.get(v2_5);
    setWeather(weatherResponse.data);
    setApiError(null);

  }catch(error)
  {
    console.error('error fetching data');
    setWeather(null);
    setApiError('error to fetch weather data');
  }
}

const renderLanguage =(languages)=>{
  if (Array.isArray(languages))
  {
  return languages.join(", ")
  }else if (typeof languages==="object")
  {
    return Object.values(languages).join(", ")
  }
  else
  {
  return "Unknown"
  }
}

const handleCountryButton=(country)=>{
  setSelectedCountry(country)
  const capital=country.capital;  
  fetchWeathetDate(capital);

}
return(
<div>
  <h1>Country Information App </h1>

  <label>
    Search for a country:
    <input type="text" value={searchItem} onChange={(e)=>setSearchItem(e.target.value)}></input>
  </label>
  {countries.length>10 && (<p>Too many countries,please make your entry specific</p>)}

  {countries.length <=10 && countries.length>1 && (
    <div>
      <h3>
        Matching Countries:
      </h3>
      <ul>
        {countries.map((country)=>(
          <li key= {country.name.common}>
          {country.name.common}
          {<button onClick={()=>handleCountryButton(country)}>Show country Data</button>}
          </li>
        ))}
      </ul>
      </div>
  )}
   {selectedCountry &&(
    <div>
      <h3>{selectedCountry.name.common}</h3>
      <p>Capital:  {selectedCountry.capital}</p>
      <p>Area: {selectedCountry.area}</p>
      <p>Language(s): {selectedCountry.languages && renderLanguage(selectedCountry.languages)}</p>
      <p>
        Flag:</p>
        {
          <img 
          src={selectedCountry.flags.png} 
          alt={`${selectedCountry.name.common}'s flag`}>
              
          </img>
        }

<p>
        Coat of arms:</p>
        {
          <img 
          src={selectedCountry.coatOfArms.svg} 
          alt={`${selectedCountry.name.common}'s coat Of Arms`}
          width="300px"
          height="250px"
          >
              
          </img>
        }
        <p>Weather Map Data</p>
        {
          weather && (
            <div>
              <h3>
                Weather in {selectedCountry.capital[0]}
              </h3>
              <p>
                Temperature : {weather.main.temp}
              </p>
              <p>
                Humidity : {weather.main.humidity}
              </p>
              <p>
                Wind Speed : {weather.main.speed}
              </p>
              <p>
                Weather Description : {weather.weather[0].description}
              </p>
              <p>
                Weather Icon : {weather.weather[0].icon && (
                  <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}  
                  alt="Weater Icon"></img>
                )}
              </p>
              </div>
          )
        }
      
      </div>

   )
  }
</div>

)

}

export default App;
