var currentlink = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = 'Lviv';
var unit = '&units=metric';
var appiKey = '&appid=4d8dbbca55e5e1aabdf7893758d24109';

var fivelink = "https://api.openweathermap.org/data/2.5/forecast?q=";
var imgurl = "http://openweathermap.org/img/w/";



var forecast;
var weather;
function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;
	}

function setWether(){
	var currentWetherUrl = currentlink + city + unit + appiKey;
	weather = JSON.parse(Get(currentWetherUrl));


	var forecastUrl = fivelink + city + unit + appiKey;
	forecast = JSON.parse(Get(forecastUrl));
}

setWether();

document.getElementById("curWeatherTitle").textContent = "Weather in " + weather.name;
document.getElementById("curGrads").textContent = weather.main.temp + "˚C";
var curimg = imgurl + weather.weather[0].icon + ".png";
document.getElementById("curImg").setAttribute("src", curimg);
var curtime = new Date();
document.getElementById("curTime").textContent = curtime.getHours() + ":" + curtime.getMinutes();


document.getElementById("curWind").textContent = weather.wind.speed + "m/s";
var cloudstr = weather.weather[0].description;
document.getElementById("curClouds").textContent = cloudstr.charAt(0).toUpperCase() + cloudstr.substring(1);
document.getElementById("curHumidity").textContent = weather.main.humidity + "%";
var sunset = msToTime(weather.sys.sunset);
document.getElementById("curSunset").textContent = sunset;
var sunrise = msToTime(weather.sys.sunrise);
document.getElementById("curSunrise").textContent = sunrise;
document.getElementById("curCoords").textContent = "[" + weather.coord.lon + ";" + weather.coord.lat + "]";

//callback(currentWetherUrl);



function msToTime(ms) {
	var Time = new Date(ms*1000);
	var hour;

	var min;
	if(Time.getHours()<10)
		hour = "0" + Time.getHours();
	else
		hour = Time.getHours();
	if(Time.getMinutes()<10)
		min = "0" + Time.getMinutes();
	else
		min = Time.getMinutes();
	return hour + ":" + min;
}






function formatdate(ms) {
	var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
	var date  = new Date(ms*1000);
	return date.toLocaleDateString("en-US", options); // Saturday, September 17, 2016
}





var now = new Date();
count = Math.floor((now.getHours())/3);
for(var i=0; i<count; i++)
{
	document.getElementById("tableone").children[0].children[i+1].style.display = "none";
}




var num = 0;
for (var i = 0; i < 5; i++) {
	if(i===0)
	{
		document.getElementById("wetherdaylist").children[i].children[0].children[0].children[0].textContent = formatdate(forecast.list[num].dt);
		for (var j = count; j <8; j++) {
		document.getElementById("wetherdaylist").children[i].children[0].children[j+1].children[0].children[0].textContent = msToTime(forecast.list[num].dt);
		var img = imgurl + forecast.list[num].weather[0].icon + ".png";    
		imgurl + weather.weather[0].icon + ".png";
		document.getElementById("wetherdaylist").children[i].children[0].children[j+1].children[0].children[1].setAttribute("src", img);


		document.getElementById("wetherdaylist").children[i].children[0].children[j+1].children[1].children[0].textContent = forecast.list[num].main.temp;
		document.getElementById("wetherdaylist").children[i].children[0].children[j+1].children[1].children[1].textContent = forecast.list[num].weather[0].description;
		document.getElementById("wetherdaylist").children[i].children[0].children[j+1].children[1].children[3].textContent = forecast.list[num].wind.speed + " m/s";
		document.getElementById("wetherdaylist").children[i].children[0].children[j+1].children[1].children[4].textContent = forecast.list[num].clouds.all + "%";
		document.getElementById("wetherdaylist").children[i].children[0].children[j+1].children[1].children[5].textContent = forecast.list[num].main.humidity + "%";
		num++;
		}
	}
	else{
		document.getElementById("wetherdaylist").children[i].children[0].children[0].children[0].textContent = formatdate(forecast.list[num].dt);
		for (var j = 0; j <8; j++) {
		document.getElementById("wetherdaylist").children[i].children[0].children[j+1].children[0].children[0].textContent = msToTime(forecast.list[num].dt);
		var img = imgurl + forecast.list[num].weather[0].icon + ".png";    
		imgurl + weather.weather[0].icon + ".png";
		document.getElementById("wetherdaylist").children[i].children[0].children[j+1].children[0].children[1].setAttribute("src", img);		
		num++;
		}
	}
}


//alert(forecast.list[1].dt);
















