

//http request, gets api url , returns json object
function GetJsonObj(yourUrl) {
    var httpRequest = new XMLHttpRequest(); // a new request
    httpRequest.open("GET",yourUrl,false);
    httpRequest.send(null);
    return httpRequest.responseText;
	}

//get from miliseconds hour and minutes
function msToTime(ms) {
	var Time = new Date(ms*1000);
	var hour;
	var min;
	if(Time.getHours()<10)
		hour = "0" + Time.getHours();
	else
		hour = Time.getHours();
	if(Time.getMinutes()<10)
		min = '0' + Time.getMinutes();
	else
		min = Time.getMinutes();
	return hour + ":" + min;
}


//convert miliseconds to string objest
function formatDate(ms) {
	var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
	var date  = new Date(ms*1000);
	return date.toLocaleDateString("en-US", options); // Example: Sat, September 17, 2016
}


function weatherCurrent(city) {
	var linkCurrentWeather = 'http://api.openweathermap.org/data/2.5/weather?q=';
	var unit = '&units=metric';
	var apiKey = '&appid=4d8dbbca55e5e1aabdf7893758d24109';
	var currentWetherUrl = linkCurrentWeather + city + unit + apiKey;
	this.weatherData = JSON.parse(GetJsonObj(currentWetherUrl));
	this.linkImg = "http://openweathermap.org/img/w/";
}

//initialises table with the data about current weather
function initCurrentWeather(weather){
	document.getElementById("curWeatherTitle").textContent = "Weather in " + weather.weatherData.name;
	document.getElementById("curGrads").textContent = weather.weatherData.main.temp + "˚C";

	var curimg = weather.linkImg + weather.weatherData.weather[0].icon + ".png";
	document.getElementById("curImg").setAttribute("src", curimg);

	var curtime = new Date();
	document.getElementById("curTime").textContent = msToTime(curtime/1000);
	document.getElementById("curWind").textContent = weather.weatherData.wind.speed + "m/s";

	var cloudsState = weather.weatherData.weather[0].description;
	document.getElementById("curClouds").textContent = cloudsState.charAt(0).toUpperCase() + cloudsState.substring(1);
	document.getElementById("curHumidity").textContent =weather.weatherData.main.humidity + "%";

	var sunsetTime = msToTime(weather.weatherData.sys.sunset);
	document.getElementById("curSunset").textContent = sunsetTime;

	var sunriseTime = msToTime(weather.weatherData.sys.sunrise);
	document.getElementById("curSunrise").textContent = sunriseTime;
	document.getElementById("curCoords").textContent = "[" + weather.weatherData.coord.lon + "," + weather.weatherData.coord.lat + "]";
}

function weatherFiveDays(city) {
	var linkFiveDayWeather = "https://api.openweathermap.org/data/2.5/forecast?q=";	var unit = '&units=metric';
	var apiKey = '&appid=4d8dbbca55e5e1aabdf7893758d24109';
	var forecastUrl = linkFiveDayWeather + city + unit + apiKey;

	this.forecastData = JSON.parse(GetJsonObj(forecastUrl));
	this.linkImg = "http://openweathermap.org/img/w/";
}

//initialises table with the data about forecast for five days
function initFiveDayWeather(forecast){
//hide not initialised forecast for today
	var now = new Date();
	count = Math.floor((now.getHours())/3);
	for(var i=0; i<count; i++){
		var elem = document.getElementById("forecastList");
		elem.children[0].children[0].children[i+1].style.display = "none";
	}
//

	var num = 0;
	for (var i = 0; i < 5; i++) {
//initialise forecast for today
		if(i===0){
			document.getElementById("forecastList").children[i].children[0].children[0].children[0].textContent = formatDate(forecast.forecastData.list[num].dt);
			for (var j = count; j <8; j++){
				var domEelement = document.getElementById("forecastList").children[i].children[0].children[j+1];

				domEelement.children[0].children[0].textContent = msToTime(forecast.forecastData.list[num].dt);

				var img = forecast.linkImg + forecast.forecastData.list[num].weather[0].icon + ".png";    
				domEelement.children[0].children[1].setAttribute("src", img);

				domEelement.children[1].children[0].textContent = forecast.forecastData.list[num].main.temp + "˚C";
				domEelement.children[1].children[1].textContent = forecast.forecastData.list[num].weather[0].description;
				domEelement.children[1].children[3].textContent = "wind: " + forecast.forecastData.list[num].wind.speed + " m/s";
				domEelement.children[1].children[5].textContent = "clouds: " + forecast.forecastData.list[num].clouds.all + "%";
				domEelement.children[1].children[7].textContent = "humidity: " + forecast.forecastData.list[num].main.humidity + "%";
				num++;
			}
		}
//

//initialise forecast for next days from today
		else{
			document.getElementById("forecastList").children[i].children[0].children[0].children[0].textContent = formatDate(forecast.forecastData.list[num].dt);
			for (var j = 0; j <8; j++) {
				var domElement = document.getElementById("forecastList").children[i].children[0].children[j+1];

				domElement.children[0].children[0].textContent = msToTime(forecast.forecastData.list[num].dt);

				var img = forecast.linkImg + forecast.forecastData.list[num].weather[0].icon + ".png";    
				domElement.children[0].children[1].setAttribute("src", img);		

				domElement.children[1].children[0].textContent = forecast.forecastData.list[num].main.temp + "˚C";
				domElement.children[1].children[1].textContent = forecast.forecastData.list[num].weather[0].description;
				domElement.children[1].children[3].textContent = "wind: " + forecast.forecastData.list[num].wind.speed + " m/s";
				domElement.children[1].children[5].textContent = "clouds: " + forecast.forecastData.list[num].clouds.all + "%";
				domElement.children[1].children[7].textContent = "humidity: " + forecast.forecastData.list[num].main.humidity + "%";
				num++;
			}
		}
//
	}
}


var button = document.getElementById("submit");
button.onclick = loadCity;


function loadCity(){
	try {
		var newWeatherObj = new weatherCurrent(document.getElementById("city").value);
		var newForecastObj = new weatherFiveDays(document.getElementById("city").value);
		initCurrentWeather(newWeatherObj);
		initFiveDayWeather(newForecastObj);
	
	} catch(e) { 
		newWeatherObj = new weatherCurrent("Lviv");
		newForecastObj = new weatherFiveDays("Lviv");
		initCurrentWeather(newWeatherObj);
		initFiveDayWeather(newForecastObj);
  		alert("This city doesn`t exist!\nInstead got city: Lviv.");
	}
}


function loadStart(){
	var weatherObject = new weatherCurrent(document.getElementById("city").value);
	initCurrentWeather(weatherObject);

	var forecastObject = new weatherFiveDays(document.getElementById("city").value);
	initFiveDayWeather(forecastObject);
}


loadStart();








