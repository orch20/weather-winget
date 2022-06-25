// fetch(
//   'http://api.openweathermap.org/geo/1.0/direct?q=Lviv&limit=5&appid=f0a93e06b3355654168e8285eaba51d3'
// )
//   .then(res => res.json())
//   .then(console.log);
// /
const weatherBlock = document.querySelector('#weather');

async function fetchWeather() {
  weatherBlock.innerHTML = `
		<div class="weather__loading">
			<img src="img/loading.gif" alt="Loading...">
		</div>`;
  return await fetch(
    'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Izmir&appid=f0a93e06b3355654168e8285eaba51d3'
  ).then(res => {
    return res.json();
  });
}

function getWeather() {
  fetchWeather().then(data => markupWeather(data));
}
getWeather();

function markupWeather(data) {
  console.log(data);
  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;
  const template = `
	<div class="weather__header">
		<div class="weather__main">
			<div class="weather__city">${location}</div>
			<div class="weather__status">${weatherStatus}</div>
		</div>
		<div class="weather__icon">
			<img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
		</div>
	</div>
	<div class="weather__temp">${temp}</div>
	<div class="weather__feels-like">Feels like: ${feelsLike}</div>`;

  weatherBlock.innerHTML = template;
}
