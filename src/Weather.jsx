import {useState} from 'react'; 

import './Weather.css';
import {ImSpinner9} from 'react-icons/im'
const api = {
 url: "https://api.openweathermap.org/data/2.5/",
 key:"bc624396c1c73d0a311f7369a9a45f7c",
  } 
 const iconLink = "https://openweathermap.org/img/w/";
 
 
 const currentDate = new Date()
const day = currentDate.getDate()
const month = currentDate.getMonth() + 1
const year = currentDate.getFullYear()



const Weather = () =>{


const [input , setInput] = useState("");
const [weather , setWeather] = useState({});
  
const[errorMsg, setErrorMsg] = useState("");



const [error, setError] = useState(true);
const [isLoading , setisLoading] = useState(false);


  const getInput =(e) =>{
    setInput(e.target.value)
 
  };
  
const getWeatherData = (e) =>{

  if(input === "" && e.key=== 'Enter'){
    setErrorMsg('CANNOT BE EMPTY')
    setError(true)
  }
  if(e.key ==='Enter' && input !== ''){
    setisLoading(true);
    setError(true)
    fetch(`${api.url}weather?q=${input}&units=metric&APPID=${api.key}`)
 .then((response) =>{
   if(!response.ok){
     throw Error('Failed to Fetch Data')
   }
   return (
     response.json()
     )
 }) 
.then((data) =>{
setError(false)
 setWeather(data)
   setInput('')
   setisLoading(false);
   })
   .catch((err) =>{
     setError(true)
     setErrorMsg(err.message)
     setisLoading(false)
   })

}
}

 return (
   
    <section className='section'>
    
   <div className='container'>
   
     <div className='top-part'>
   
<input type='text' placeholder='Enter country name' className='input' onChange={getInput} value={input} 
onKeyPress={getWeatherData}/>
 <h1> WEATHER  </h1>
     </div>
       <div className='card'>
     {
       error ? (<h5 className={errorMsg !=="" ? "error" : ""}>{errorMsg}</h5>) : (
    <div className="content-row"> 
   <div className='first-content'>
 
   <div className="first-upper-col">
      <h3 >{weather.name} , {weather.sys.country}</h3>
   <div className="first-upper-row">
    <p className="weather-title">{year} - {month} - {day}</p>
    <div>
   <img src={iconLink + weather.weather[0].icon + ".png"} alt={weather.weather[0].main} className="display-img"/>
   </div>
  </div>
   <h1 className="weather">{weather.weather[0].main}</h1>
   </div>
  
 <div className="spacing"> 
  <p className="weather-title">
  Pressure
  </p>
  <h4 className="weather1">
 {Math.round(weather.main.pressure)} hPa
   </h4>
   </div>
   
   <div  className="spacing">
     <p className="weather-title">
  Humidity
  </p>
    <h4  className="weather1">{Math.round(weather.main.humidity)} %
   </h4>
   </div>
  
  
   <div className="spacing">
   <p className="weather-title">
  Wind
  </p>
   <h4 className="weather1">  
  {Math.round(weather.wind.speed)} km/h
   </h4>
   </div>

  
   </div>
   
   
   
   
 <div  className="second-content">
 
  <div className='second-content-p spacing2'>
  <p className="weather-title">
  Temp.
  </p>
  <h5>
      <h2 className="weather" >{Math.round(weather.main.temp)}°C</h2>
   </h5> 
</div>

<div className="spacing2">
 <p className="weather-title">
 Temp Range
 </p>
 <h4 className="weather">
  {Math.round(weather.main.temp_min)}°C / {Math.round(weather.main.temp_max)}°C 
   </h4>
   </div>
   </div>
  
  
  <div className="third-content">
   <div className="spacing2"> 
  <p className="weather-title">
  Longitude
  </p>
  <h4 className="weather">
 {Math.round(weather.coord.lon)}° E-W
   </h4>
   </div>
   
      <div className="spacing2"> 
  <p className="weather-title">
  Latitude
  </p>
  <h4 className="weather">
 {Math.round(weather.coord.lat)}° N-S
   </h4>
   </div>
   
  </div>
  

  </div>
  )}
    
     {
       isLoading &&<h3 className="spinner"> <ImSpinner9 /> </h3>
      
     }
  
  <p className='marsh'> c•Marshall Fan💙🖤</p>
   </div>
   </div>
   </section>
   
    )

 }


export default Weather;