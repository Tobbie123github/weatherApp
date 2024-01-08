import {useState, useEffect} from 'react'; 

import './Weather.css';
import {ImSpinner9} from 'react-icons/im';
import {LiaTemperatureHighSolid} from "react-icons/lia";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { WiBarometer } from "react-icons/wi";
const api = {
 url: "https://api.openweathermap.org/data/2.5/",
 key:"bc624396c1c73d0a311f7369a9a45f7c",
  };
 
 const currentDate = new Date()
const day = currentDate.getDate()
const month = currentDate.getMonth() + 1
const year = currentDate.getFullYear()

 




const Weather = () =>{


const [input , setInput] = useState("");
const [defaultWeather, setdefaultWeather] = useState(true);
const [weather , setWeather] = useState({});
  
const[errorMsg, setErrorMsg] = useState("");



const [error, setError] = useState(true);
const [isLoading , setisLoading] = useState(false);


  const getInput =(e) =>{
    setInput(e.target.value);
 
  };
  
const getWeatherData = (e) =>{

  if(input === "" && e.key=== 'Enter'){
    setErrorMsg('CANNOT BE EMPTY');
setdefaultWeather(true);
    setError(true);
  }
  if(e.key ==='Enter' && input !== ''){
    setisLoading(true);

    setError(true);
    fetch(`${api.url}weather?q=${input}&units=metric&APPID=${api.key}`)
 .then((response) =>{
   if(!response.ok){
     throw Error('Failed to Fetch Data');
   }
   return (
     response.json()
     );
     
     
 }) 
.then((data) =>{
setError(false);
 setWeather(data);
   setInput('');
   setisLoading(false);
   setdefaultWeather(false);
   })
   .catch((err) =>{
     setError(true);
     setErrorMsg(err.message);
     setisLoading(false);
   });

}
};

useEffect(()=>{
  
  const api = {
 url: "https://api.openweathermap.org/data/2.5/",
 key:"bc624396c1c73d0a311f7369a9a45f7c",
 country: 'London',
  };
  
  
  const fetchData = async()=>{
    try {
      const res = await fetch(`${api.url}weather?q=${api.country}&units=metric&APPID=${api.key}`);
      const data = await res.json();
      setdefaultWeather(data);
    }catch(error){
console.error('Error fetching weather data:', error);
    }
  };
  fetchData();
}, []);



 return (
   
   
<div className="container">
  <div className="app-container">
    <div className="app-top-bar">
      <div className="button button-small">
       <span><p>{year}-{month}-{day}</p></span>
      </div>
      <h5 className="app-heading">Weather App</h5>
    </div>
    <div className="app-content">
      <div className="button button-block">
        <input type="text" placeholder="Enter country name" onChange={getInput} value={input} 
        onKeyPress={getWeatherData}/>
      </div>

    
    {
  defaultWeather ? (
    <div>
    <div className = "button button-block" >
    <h4>{defaultWeather.name}</h4>
    </div>
      <div className="button button-dial">
        
        <span className="button-dial-spoke"></span>
        <span className="button-dial-spoke"></span>
        <span className="button-dial-spoke"></span>
        <span className="button-dial-spoke"></span>
       <span className="button-dial-spoke"></span>
       <span className="button-dial-spoke"></span>
        
        <div className="button-dial-top"></div>
        <div className="button-dial-label">
<LiaTemperatureHighSolid className="svg"/>
         20&deg;C
        </div>
      </div>
      <div className="flex-button-container">
        <div className="button button-large">
          <FaWind className="svg"/>
          
          23 km/hr
        </div>
        <div className="button button-large">
       <WiHumidity className="svg"/>
         12%
        </div>
       <div className="button button-large">
        <WiBarometer className="svg"/>
       13 hPa
         </div>
      </div>
      <div className="button button-link">
        Long: 0 E-W
        <br/>
        Lat: 13 N-S
      </div>
    </div>

  ) : (
    error ? (
      <h5 className={errorMsg !== "" ? "error" : ""}>{errorMsg}</h5>
    ) : (
      
      <div>
     <div className = "button button-block" >
       <h3>{weather.name} , {weather.sys.country}</h3>
       </div>
      <div className="button button-dial">
    
        <span className="button-dial-spoke"></span>
        <span className="button-dial-spoke"></span>
        <span className="button-dial-spoke"></span>
        <span className="button-dial-spoke"></span>
       <span className="button-dial-spoke"></span>
       <span className="button-dial-spoke"></span>
        
        <div className="button-dial-top"></div>
        <div className="button-dial-label">
   <LiaTemperatureHighSolid className="svg"/>
         { Math.round(weather.main.temp)}&deg;C
        </div>
      </div>
      <div className="flex-button-container">
        <div className="button button-large">
          <FaWind className="svg"/>
          {Math.round(weather.wind.speed)} km/h
          
        </div>
        <div className="button button-large">
          <WiHumidity className="svg"/>
          {Math.round(weather.main.humidity)}%
        </div>
       <div className="button button-large">
        <WiBarometer  className="svg"/>
     {Math.round(weather.main.pressure)} hPa
         </div>
      </div>
      <div className="button button-link">
        Long: 
      {Math.round(weather.coord.lon)} E-W
        <br/>
        <br/>
        Lat: {Math.round(weather.coord.lat)} N-S
      </div>
      </div>

      
    )
  )
}
    
    
    
    
      {
   
       isLoading &&<h3 className="spinner"> <ImSpinner9 /> </h3>
      
     }
  
      
    </div>
  </div>
</div>

   
   
   )
   
}

export default Weather;