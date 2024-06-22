const inputbox = document.querySelector(".input-box")
const searchbtn = document.getElementById("searchbtn")
const weather_img = document.querySelector(".weather-img")
const temprature = document.querySelector(".temprature")
const description = document.querySelector(".description")
const humidity = document.getElementById("humidity")
const wind_speed =document.getElementById("wind-speed")
const weather_body = document.querySelector(".weather-body")

const location_not_found = document.querySelector(".location-not-found")
const forecastElement = document.getElementById("forcast"); // Add this line

let lat;
let long;
const apiKey = `e669dd3cb285375346a90b725a4a14ac`;
let matric = []

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// e669dd3cb285375346a90b725a4a14ac

async function forcastData(lat,long)
{
    // const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&appid=${apiKey}`;
    // const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`

    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=f56f24967aaf51182d1d4df628297c6d`

    const forcast_data = await fetch(`${URL}`).then((res)=>res.json())

    // console.log(forcast_data.daily.slice(1,5))
    // matric.push(forcast_data.daily.slice(1,5))

    return forcast_data
}


function displayForcast(data)
{
    forecastElement.innerHTML = "";

    data.map((el,i)=>{

        // console.log(el.dt)
        const date = new Date(el.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });

        

        forecastElement.innerHTML += `
            <div class="forecast-day">
                
                <p>${day}</p>
                <img src="http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png" alt="${el.weather[0].main}" class="icon-img"/>
                <p>${el.weather[0].main}</p>
                <p>${Math.round(el.temp.max)}°C</p>
            </div>
        `;
    })
}



async function checkweather (city)
{
    const api_key=`e669dd3cb285375346a90b725a4a14ac`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

    const weather_data = await fetch(`${url}`).then((res)=>res.json())

    // console.log(weather_data)

    if(weather_data.cod==="404")
    {
        location_not_found.style.display="flex"
        weather_body.style.display="none"
        return
    }
    location_not_found.style.display="none"
    weather_body.style.display="flex"
    temprature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`

    description.innerHTML = `${weather_data.weather[0].description}`

   humidity.innerHTML = `${weather_data.main.humidity}%`

   wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`

   lat=weather_data.coord.lat
   long=weather_data.coord.lon

    let newarray = forcastData(lat,long)
    newarray.then((data)=>{
        // console.log("newarray",data.daily.slice(1,5))
        // matric.push(data.daily.slice(1,5))
        matric.push(data.daily.slice(1,5))

        displayForcast(matric[0])
        
    })

   switch(weather_data.weather[0].main)
   {
    case "Clouds":
        weather_img.src="./images/cloud.png";
        break
    case "Clear":
        weather_img.src="./images/clear.png";
        break
    case "Rain":
        weather_img.src="./images/rain.png"
        break
    case "Mist":
        weather_img.src="./images/mist.png"
        break
    case "Snow":
        weather_img.src="./images/snow.png"
        break
    default:
            weather_img.src = "";
   }

//    console.log(matric[0])

}


searchbtn.addEventListener("click",()=>{
    // console.log("click")
    checkweather(inputbox.value)
    inputbox.value=""
})
forcastData()
// getCurrentLocationWeather();