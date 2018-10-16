function GetJsonObj(yourUrl) {
    var httpRequest = new XMLHttpRequest(); // a new request
    httpRequest.open("GET",yourUrl,false);
    httpRequest.send(null);
    return httpRequest.responseText;
	}

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


function formatDate(ms) {
	var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
	var date  = new Date(ms*1000);
	return date.toLocaleDateString("en-US", options); // Sat, September 17, 2016
}


function weatherCurrent(city) {
	var linkCurrentWeather = 'http://api.openweathermap.org/data/2.5/weather?q=';
	var unit = '&units=metric';
	var apiKey = '&appid=4d8dbbca55e5e1aabdf7893758d24109';
	var currentWetherUrl = linkCurrentWeather + city + unit + apiKey;
	this.weatherData = JSON.parse(GetJsonObj(currentWetherUrl));
	this.linkImg = "http://openweathermap.org/img/w/";
}


var weatherObject = new weatherCurrent(document.getElementById("city").value);
initCurrentWeather(weatherObject);

function initCurrentWeather(weatherObject){
	document.getElementById("curWeatherTitle").textContent = "Weather in " + weatherObject.weatherData.name;
	document.getElementById("curGrads").textContent = weatherObject.weatherData.main.temp + "˚C";

	var curimg = weatherObject.linkImg + weatherObject.weatherData.weather[0].icon + ".png";
	document.getElementById("curImg").setAttribute("src", curimg);

	var curtime = new Date();
	document.getElementsByClassName("curTime").textContent = msToTime(curtime/1000);
	document.getElementById("curWind").textContent = weatherObject.weatherData.wind.speed + "m/s";

	var cloudsState = weatherObject.weatherData.weather[0].description;
	document.getElementById("curClouds").textContent = cloudsState.charAt(0).toUpperCase() + cloudsState.substring(1);
	document.getElementById("curHumidity").textContent =weatherObject.weatherData.main.humidity + "%";

	var sunsetTime = msToTime(weatherObject.weatherData.sys.sunset);
	document.getElementById("curSunset").textContent = sunsetTime;

	var sunriseTime = msToTime(weatherObject.weatherData.sys.sunrise);
	document.getElementById("curSunrise").textContent = sunriseTime;
	document.getElementById("curCoords").textContent = "[" + weatherObject.weatherData.coord.lon + "," + weatherObject.weatherData.coord.lat + "]";
}

function weatherFiveDays(city) {
	var linkFiveDayWeather = "https://api.openweathermap.org/data/2.5/forecast?q=";	var unit = '&units=metric';
	var apiKey = '&appid=4d8dbbca55e5e1aabdf7893758d24109';
	var forecastUrl = linkFiveDayWeather + city + unit + apiKey;

	this.forecastData = JSON.parse(GetJsonObj(forecastUrl));
	this.linkImg = "http://openweathermap.org/img/w/";
}


var forecastObject = new weatherFiveDays(document.getElementById("city").value);
initFiveDayWeather(forecastObject);


function initFiveDayWeather(forecastObject){
	var now = new Date();
	count = Math.floor((now.getHours())/3);

	for(var i=0; i<count; i++){
		document.getElementById("tableone").children[0].children[i+1].style.display = "none";
	}

	var num = 0;
	for (var i = 0; i < 5; i++) {
		if(i===0){
			document.getElementById("wetherdaylist").children[i].children[0].children[0].children[0].textContent = formatDate(forecastObject.forecastData.list[num].dt);
			for (var j = count; j <8; j++){
				var domEelement = document.getElementById("wetherdaylist").children[i].children[0].children[j+1];

				domEelement.children[0].children[0].textContent = msToTime(forecastObject.forecastData.list[num].dt);

				var img = forecastObject.linkImg + forecastObject.forecastData.list[num].weather[0].icon + ".png";    
				domEelement.children[0].children[1].setAttribute("src", img);

				domEelement.children[1].children[0].textContent = forecastObject.forecastData.list[num].main.temp + "˚C";
				domEelement.children[1].children[1].textContent = forecastObject.forecastData.list[num].weather[0].description;
				domEelement.children[1].children[3].textContent = forecastObject.forecastData.list[num].wind.speed + " m/s";
				domEelement.children[1].children[4].textContent = forecastObject.forecastData.list[num].clouds.all + "%";
				domEelement.children[1].children[5].textContent = forecastObject.forecastData.list[num].main.humidity + "%";
				num++;
			}
		}

		else{
			document.getElementById("wetherdaylist").children[i].children[0].children[0].children[0].textContent = formatDate(forecastObject.forecastData.list[num].dt);
			for (var j = 0; j <8; j++) {
				var domElement = document.getElementById("wetherdaylist").children[i].children[0].children[j+1];

				domElement.children[0].children[0].textContent = msToTime(forecastObject.forecastData.list[num].dt);

				var img = forecastObject.linkImg + forecastObject.forecastData.list[num].weather[0].icon + ".png";    
				domElement.children[0].children[1].setAttribute("src", img);		

				domElement.children[1].children[0].textContent = forecastObject.forecastData.list[num].main.temp + "˚C";
				domElement.children[1].children[1].textContent = forecastObject.forecastData.list[num].weather[0].description;
				domElement.children[1].children[3].textContent = forecastObject.forecastData.list[num].wind.speed + " m/s";
				domElement.children[1].children[4].textContent = forecastObject.forecastData.list[num].clouds.all + "%";
				domElement.children[1].children[5].textContent = forecastObject.forecastData.list[num].main.humidity + "%";
				num++;
			}
		}
	}
}







