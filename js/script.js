$(document).ready(function() {
});

new Vue({
    el: '#GhibliOutput',
    data: {
        sTitle: "",
        sID: "",
    }
})

// function setHeader(xhr) {
//     var token = '';
//     xhr.setRequestHeader('Authorization', token);
//   }

var seen = false;

$("input").click(function(e) {
    e.preventDefault();
    goBack();
    // var results = "";
    // var myUrl= 'https://ghibliapi.herokuapp.com/films';
    // $.ajax({
    //     url: myUrl,
    //     dataType: 'JSONP',
    //     jsonpCallback: 'callback',
    //     type: 'GET',
    //     success: function (data) {
    //         console.log(data);
    //         seen = true;
    //         results += "<h1>Pick a movie to know more about!</h1><div class =\"FilmList\"> "
    //         for (var i = 0; i < data.length; i ++) {
    //             results += "<input class=\"filmTitle\" type=\"submit\" ghibliCode=\"" + data[i].id + "\" value=\"" + data[i].title + "\"></input>"
    //         }
    //         results += "</div><script>$(\".filmTitle\").click(function(e) {e.preventDefault();console.log(findGhibliCode(e.target.value));});</script>"
    //         $("#GhibliOutput").html(results);
    //     }
    // });
});

function findGhibliCode (sTitle) {
    var results = "<h1>"+ sTitle +"</h1>";
    results += "<input class=\"back mainInput\" type=\"submit\" value=\"Go Back\""
    var myUrl= 'https://ghibliapi.herokuapp.com/films';
    $.ajax({
        url: myUrl,
        dataType: 'JSONP',
        jsonpCallback: 'callback',
        type: 'GET',
        success: function (data) {
            var index = 0;
            for (var i = 0; i < data.length; i ++) {
                console.log(i);
                if(data[i].title == sTitle) {
                    index = i;
                    i = data.length;
                };
            }
            results += "<div class=\"Film\">"
            results += "<div class=\"Intro\"><p>Release Date: " + data[index].release_date + "</p>";
            results += "<p>Directed by: " + data[index].director + "</p></div>";
            results += "<p>" + data[index].description + "</p>";
            results += "</div>"
            results += "<script>$(\".back\").click(function(e) {e.preventDefault();goBack();});</script>"
            $("#GhibliOutput").html(results);
        }
    });
}

function goBack () {
    var results = "";
    var myUrl= 'https://ghibliapi.herokuapp.com/films';
    $.ajax({
        url: myUrl,
        dataType: 'JSONP',
        jsonpCallback: 'callback',
        type: 'GET',
        success: function (data) {
            console.log(data);
            seen = true;
            results += "<h1>Pick a movie to know more about!</h1><div class =\"FilmList\"> "
            for (var i = 0; i < data.length; i ++) {
                results += "<input class=\"filmTitle\" type=\"submit\" ghibliCode=\"" + data[i].id + "\" value=\"" + data[i].title + "\"></input>"
            }
            results += "</div><script>$(\".filmTitle\").click(function(e) {e.preventDefault();console.log(findGhibliCode(e.target.value));});</script>"
            $("#GhibliOutput").html(results);
        }
    });
};

$(".filmTitle").click(function(e) {
    e.preventDefault();
    console.log("It worked");
});