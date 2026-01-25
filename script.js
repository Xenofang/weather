document.getElementById('weatherForm').addEventListener('submit', getWeather);

const apiKey = "3f75017f7c7e8a9ff68a7883942f8298";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric";

function clearWeather() {
  document.querySelector("#temp").textContent = "";
  document.querySelector("#location").textContent = "";
  document.querySelector("#humid").textContent = "";
  document.querySelector("#sky").textContent = "";
  document.querySelector("#wind").textContent = "";
}

async function getWeather(e) {
  e.preventDefault();
  
  try {
    const cityName = document.getElementById("city").value;
    
    const response = await fetch(
      `${apiURL}&q=${cityName}&appid=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error("Invalid city!");
    }
    
    document.getElementById("error").innerText = "";
    const data = await response.json();
    document.querySelector("#temp").textContent = `${data.main.temp}°C`;
    document.querySelector("#location").textContent = data.name;
    document.querySelector("#humid").textContent = `Humidity: ${data.main.humidity}%`;
    document.querySelector("#sky").textContent = `Sky: ${data.weather[0].main}`;
    document.querySelector("#wind").textContent = `Wind speed: ${data.wind.speed} KM/PH`;
    console.log(data);

  } catch (error) {
    console.error("Failed to fetch weather data");
    clearWeather();
    document.getElementById("error").innerText = "Invalid city!\nPlease Enter a valid city!" ;
  }
}


