// Read and set any environment variables with the dotenv package
require("dotenv").config();

// Node Modules
var Twitter = require('twitter'),
    Spotify = require('node-spotify-api'),
    request = require('request'),
    fs = require('fs');
    moment = require('moment');

// Key variables
var keys = require('./keys.js'),
    spotify = new Spotify(keys.spotify),
    client = new Twitter(keys.twitter);

// Input variables
var input = process.argv,
    cmd = input[2],
    query = `"${input.slice(3).join(' ')}"`;

// LIRI declaration
var liri = function () {
    // Twitter - Show 20 most recent tweets
    if (cmd == 'my-tweets') {
        var params = {screen_name: 'horsefather'};
        // Get request
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                log('');
                for (i=0;i<20;i++) {

                    // Time and date tweeted
                    var tweetTime = `${i+1}. Tweeted on ${moment(tweets[i].created_at, 'ddd MMMM DD HH:mm:ss +HHmm YYYY').format("MMM Do, YYYY")}, at ${moment(tweets[i].created_at, 'ddd MMMM DD HH:mm:ss Z YYYY').format("hh:mm")}`
                    console.log(tweetTime);

                    // Tweet text
                    var tweetText = "\t"+tweets[i].text;
                    console.log(tweetText);

                    fs.appendFile('log.txt', `${tweetTime}\n${tweetText}\n`, function(err) {
                        if (err) {
                            return console.log(err);
                        }
                    });                
                }
            }
            else {
                console.log(error);
            }
        });
    }

    // Spotify search
    if (cmd == 'spotify-this-song') {
        // If no query
        if (query == '""') {
            query = "the sign ace of base";
        }
        spotify.search({ type: 'track', query: query }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
            else {
                var url = data.tracks.items[0].external_urls.spotify,
                    artist = data.tracks.items[0].artists[0].name,
                    song = data.tracks.items[0].name,
                    album = data.tracks.items[0].album.name,
                    year = moment(data.tracks.items[0].album.release_date, 'YYYY-MM-DD').format('YYYY'),
                    songInfo = `Artist: ${artist}\nSong title: ${song}\nAlbum: ${album} (${year})\nPreview URL: ${url}`;
                console.log(songInfo);
                log(songInfo);
            }
        });
    }

    // OMDb search
    if (cmd == 'movie-this') {
        // If no query
        if (query == '""') {
            query = "mr nobody";
        }
        var queryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function(error, response, body) {
            if (error) {
                return console.log('Error occurred: ' + error);
            }
            else {
                var movInfo = `\nTitle: ${JSON.parse(body).Title}` + // Title
                `\nYear Released: ${JSON.parse(body).Year}` + // Year
                `\nIMDB Rating: ${Object.values(JSON.parse(body).Ratings[0]).slice(1)}` + // IMDB
                `\nRotten Tomatoes Rating: ${Object.values(JSON.parse(body).Ratings[1]).slice(1)}` + // RT
                `\nCountry: ${JSON.parse(body).Country}` + // Country
                `\nLanguage: ${JSON.parse(body).Language}` + // Language
                `\nPlot: ${JSON.parse(body).Plot}` + // Plot
                `\nActors: ${JSON.parse(body).Actors}`; // Actors

                console.log(movInfo);
                log(movInfo);
            }    
        });           
    }

    // Do what it says
    if (cmd == 'do-what-it-says') {
        // Retrieve command from random.txt
        fs.readFile('random.txt', 'utf8', function(err, data){
            if (err) {
                return console.log(err);
            }
            // Save data to variables
            cmd = data.split(',')[0];
            query = data.split(',')[1];
            // Run LIRI again with new data
            liri();
        });
    }
};

var log = function (data) {
    fs.appendFile('log.txt',`${cmd}, ${query}\n${data}`, function(err) {
        if (err) {
            return console.log(err);
        }
    });
};

liri();

