// Establish global variables and dependencies for core functionality:
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var arguments = process.argv;
var inputWords = [];
var input = "";

// Set user argument inputs to be pushed to array for capture and relay through switch command:
for (var i = 3; i < arguments.length; i++) {
    inputWords.push(arguments[i]);
}
input = inputWords.join(" ");

// Set switch inputs for determing which information source to call upon:
switch (command) {
    case "concert-this":
        concertThis(input);
        break;
    case "spotify-this-song":
        spotifyThisSong(input);
        break;
    case "movie-this":
        movieThis(input);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("No valid request made.");
        break;
}

// Core function to retrieve concert information:
function concertThis(artist) {
    fs.appendFile("log.txt", " " + "\r\n\n" + process.argv.slice(2).join(" ") + ", " + '\r\n\n', function (err) {
        if (err) {
            console.log("Hmm, something went wrong with the log.");
        }
    });
    console.log("Searching for: " + artist);
    // Bands In Town API call:
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function (response) {
        var events = response.data;
        events.forEach(function (event) {
            var convertedDate = moment(event.datetime, "YYYY-MM-DDTHH:mm:ss")
            console.log(" ");
            console.log("Artist: " + artist);
            console.log("Venue: " + event.venue.name);
            console.log("Venue Location: " + event.venue.city);
            console.log("Date: " + convertedDate.format("MMM do hh:mm a"));
            console.log(" ");
            fs.appendFile("log.txt", "Artist: " + artist + '\r\n\n' + "Venue: " + event.venue.name + '\r\n\n' + "Venue Location: " + event.venue.city + '\r\n\n' + "Date: " + convertedDate.format("MMM do hh:mm a") + '\r\n\n' + " " + '\r\n\n', function (err) {
                if (err) {
                    console.log("Hmm, something went wrong with the log.");
                }
            });
        });
    });
}

// Core function to retrieve movie information:
function movieThis(movie) {
    fs.appendFile("log.txt", " " + '\r\n\n' + process.argv.slice(2).join(" ") + ", " + '\r\n\n', function (err) {
        if (err) {
            console.log("Hmm, something went wrong with the log.");
        }
    });
    if (!movie) {
        movie = "American Beauty";
        console.log("Hmm, something went wrong with the movie search. Searching default. Hope you like Kevin Spacey. Feel free to search again.");
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(function (response) {
        console.log(" ");
        console.log("Searching for movie: " + movie);
        console.log("\r\n");
        console.log("Title: " + response.data.Title);
        console.log("\r\n");
        console.log("Release Year: " + response.data.Year);
        console.log("\r\n");
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("\r\n");
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("\r\n");
        console.log("Country where produced: " + response.data.Country);
        console.log("\r\n");
        console.log("Language: " + response.data.Language);
        console.log("\r\n");
        console.log("Plot: " + response.data.Plot);
        console.log("\r\n");
        console.log("Actors: " + response.data.Actors);
        console.log(" ");
        fs.appendFile("log.txt", "You searched for movie: " + movie + "\r\n" + "Title: " + response.data.Title + "\r\n" + "Release Year: " + response.data.Year + "\r\n\n" + "IMDB Rating: " + response.data.imdbRating + "\r\n\n" + "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\r\n\n" + "Country where produced: " + response.data.Country + "\r\n\n" + "Language: " + response.data.Language + "\r\n\n" + "Plot: " + response.data.Plot + "\r\n\n" + "Actors: " + response.data.Actors + "\r\n\n", function (err) {
            if (err) {
                console.log("Hmm, something went wrong with the log.");
            }
        });
    }).catch(function (err) {
        console.log("Hmm, something went wrong. Here's the error info: " + err);
    });
}

// Core function to retrieve song information:
function spotifyThisSong(song) {
    fs.appendFile("log.txt", " " + '\r\n\n' + process.argv.slice(2).join(" ") + ", " + '\r\n\n', function (err) {
        if (err) {
            console.log("Hmm, something went wrong with the log.");
        }
    });
    if(!song){
        song = "I Want It That Way";
        console.log("Hmm, something went wrong with the song search. Searching default. Hope you like the Backstreet Boys. Feel free to search again.");
    }
    spotify.search({ type: 'track', query: song, limit: 2 }, function (err, data) {
        if (err) {
            return console.log('Something went wrong, an error occurred. Here\'s the error info: ' + err);
        }
        var results = data.tracks.items;
        results.forEach(function (track, i) {
            console.log("Track " + (i + 1));
            var artists = track.artists;
            console.log("\r\n");
            var temp = [];
            console.log("Artist(s):");
            artists.forEach(function (artist) {
                console.log("--" + artist.name);
                temp.push(artist.name);
            });
            temp.join(", ");
            console.log("\r\n");
            var trackName = track.name
            console.log("Track name: " + trackName);
            console.log("\r\n");
            var trackAlbum = track.album.name;
            console.log("Album: " + trackAlbum);
            console.log(" ");
            var previewURL = track.preview_url;
            if (previewURL == null) {
                previewURL = "No preview available";
            }
            console.log("Preview URL: " + previewURL);
            console.log(" ");
            fs.appendFile("log.txt", "Track " + (i + 1) + "\r\n\n" + "Artist(s): " + temp + "\r\n\n" + "Track name: " + trackName + "\r\n\n" + "Album: " + trackAlbum + "\r\n\n" + "Preview URL: " + previewURL + "\r\n\n" + "_______________________________________________________" + "\r\n\n", function (err) {
                if (err) {
                    console.log("Hmm, something went wrong with the log.");
                }
            });

        });
    });
}

// Core function to read information from file and initiate switch command:
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log('Something went wrong, an error occurred. Here\'s the error info: ' + error);
            return 0;
        }
        var inputs = data.split(",")
        command = inputs[0];
        input = inputs[1];
        switch (command) {
            case "concert-this":
                concertThis(input);
                break;
            case "spotify-this-song":
                spotifyThisSong(input);
                break;
            case "movie-this":
                movieThis(input);
                break;
            case "do-what-it-says":
                doWhatItSays();
                break;
            default:
                console.log("No valid request made.");
                break;
        }
    });
}