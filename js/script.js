$(document).ready(function() {
});

// new Vue({

// })

$(".nextPage").click(function(e) {
	e.preventDefault();
	var value = "classes";
    var myUrl= "http://dnd5eapi.co/api/" + value;
    $.ajax({
        url : myUrl,
        dataType : "json",
        success : function(json) {
            console.log(json.count);
        }
    });
});

$("#weatherSubmit").click(function(e) {
	e.preventDefault();
	var value = $("#weatherInput").val();
    var myKey = "7522407228e1e3f008c7227998e8e738";
    var myurl= "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=" + myKey + "";
    $.ajax({
        url : myurl,
        dataType : "json",
        success : function(json) {
            console.log(json.main);
            var results = "";
            results += "<h3>Weather in " + json.name + "</h3>";
            for (var i=0; i<json.weather.length; i++) {
                results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
            }
            results += "<div class=\"asideBox\"><h2>" + json.main.temp + " &deg;F</h2>"
            results += "<p>"
            for (var i=0; i<json.weather.length; i++) {
                results += json.weather[i].description
                if (i !== json.weather.length - 1)
                results += ", "
            }
            results += "</p></div>"
            results += "<div class=\"asideBox\"><p> High " + json.main.temp_max + "</p>"
            results+= "<p>Low " + json.main.temp_min + "</div>"
            results += "<p class=\"quickQuip\">"
            if(json.main.temp > 100) {results += "Wow! That's really hot!"}
            else if(json.main.temp > 70) {results += "Looks like beach weather to me!"}
            else if(json.main.temp > 50) {results += "Not too hot, not too cold. Must be a nice day."}
            else if(json.main.temp > 30) {results += "Its pretty chilly outside. Take a jacket."}
            else if(json.main.temp > 0) {results += "It\'s a cold one out there. Make some hot cocoa!"}
            else if(json.main.temp <= 0) {results += "Do you really need to go outside? It's way too cold..."}
            results += "</p>";
            if (results == "") {results = "<p>Sorry, it looks like that city wasn't found. Please check the spelling and try again.</p>"}
            $("#weatherResults").html(results);
        }
        
    });
});

$("#stackSubmit").click(function(e) {
	e.preventDefault();
	var value = $("#stackInput").val();
    var myurl= "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow&intitle=" + value;
    $.ajax({
        url : myurl,
        dataType : "json",
        success : function(json) {
            var results = "";
            results += "<h2>Searching for \"" + value + "\"</h2>"
            for(var i = 0; i < 10; i ++) {
                results += "<a href=\"" + json.items[i].link + "\" target=\"_blank\">" + json.items[i].title + "</a><br><br>"
            }
            
            $("#stackResults").html(results);
        }
        
    });
});